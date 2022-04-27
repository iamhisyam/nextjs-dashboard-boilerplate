

export default function validation(schema) {
  return (req, res, next) => {
    //const {ids} = req.query
    const variables = {
      //parse ids params
      //...(ids && { ids : JSON.parse(ids)}),
      ...req.body, 
      ...req.query
    }

    const response = schema.safeParse(variables)
    if (!response.success) {
      const issues = response.error.issues.map(({ path, message }) => ({
        fields: path,
        message
      }))
      return res.status(400).json({
        success: false,
        error: issues
      });
    }
    return next();

  }
}