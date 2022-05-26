import { z } from "zod";

export const ValidateSchema = {
    user: {
        password: z.string().min(8,{ message: "Minimum  8 characters"}),
        confirmPassword: z.string().min(8,{ message: "Minimum  8 characters"}),
        token: z.string().min(1),
        email: z.string().email({ message: "Invalid email"}),
        name: z.string().nonempty(1,{message:"name required"}),
        id: z.string().nonempty(1,{message:"Missing Id"}),
        userRoleCode: z.string().nonempty(1,{message:"Missing userRoleCode"}),
        ids: z.string().array().nonempty(1,{message:"Missing Id"}),
        bio: z.string()
    },
    menu: {
       
        slug: z.string().nonempty(1,{message:"slug required"}),
        name: z.string().nonempty(1,{message:"name required"}),
        id: z.number().int(),
        parentMenuId: z.number().nullable(),
        iconName: z.string().nullable(),
        ids: z.number().array().nonempty(1,{message:"Missing Id"}),
        userRoleCode: z.string().array()

    },


};