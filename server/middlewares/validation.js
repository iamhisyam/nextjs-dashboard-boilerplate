import { z } from "zod";
import { ValidateSchema } from "../config/constants";

export default function validation(schema) {
  //const validate = z.object(schema);
  return (req, res, next) => {

    const response = schema.safeParse(req.body)
    if (!response.success) {
      const issues = response.error.issues.map(({ path, message }) => ({
        fields: path,
        message
      }))
      return res.status(400).json({
        status: "fail",
        data: issues
      });
    }
    return next();

  }
}