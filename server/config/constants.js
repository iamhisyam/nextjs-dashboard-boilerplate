import { z } from "zod";

export const ValidateSchema = {
    user: {
        password: z.string().min(8),
        email: z.string().email(),
        name: z.string().min(1)
    }

};