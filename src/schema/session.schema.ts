import {object, string} from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }).email("Not a valid email address"),
        password: string({
            required_error: "password is required"
        })
    })
});