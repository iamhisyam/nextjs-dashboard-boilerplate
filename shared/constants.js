import { z } from "zod";

export const ValidateSchema = {
    user: {
        password: z.string().min(8,{ message: "Minimum  8 characters"}),
        email: z.string().email({ message: "Invalid email"}),
        name: z.string().min(1,{message:"name required"})
    }

};