import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: Express){
    app.get('/api/v1/healtcheck', (req:Request, res:Response) => {
        res.sendStatus(200)
    })

    app.post('/api/v1/register', validateResource(createUserSchema),createUserHandler);
    app.post('/api/v1/session', validateResource(createSessionSchema),createUserSessionHandler);
    app.get('/api/v1/session',requireUser,getUserSessionHandler);
    app.delete('/api/v1/session',requireUser,deleteSessionHandler);
}

export default routes;