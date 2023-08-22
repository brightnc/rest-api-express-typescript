import {TypeOf, object, string} from 'zod';

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: "username is required"
        }),
        password: string({
            required_error: "password is required"
        }).min(6, "Password must be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required"
        }),
        email: string({
            required_error: "email is required"
        }).email("Not a valid email address"),

    }).refine((data) => data.password === data.passwordConfirmation,{
        message: "Password do not match",
        path:["passwordConfirmation"],
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;