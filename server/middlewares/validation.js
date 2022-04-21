

export default function validation(schema) {
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