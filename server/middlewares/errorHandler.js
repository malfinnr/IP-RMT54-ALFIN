function errorHandler(error, req, res, next) {
  console.log(error);
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const errors = error.errors.map((value) => value.message);
      const message = errors.join(",");
      res.status(400).json({ message: message });
      return;
    case "BadRequest":
      res.status(400).json({ message: error.message });
      return;
    case "Unauthorized":
      res.status(401).json({ message: error.message });
      return;
    case "Forbidden":
      res.status(403).json({ message: error.message });
      return;
    case "NotFound":
      res.status(404).json({ message: error.message });
      return;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token" });
      return;
    default:
      res.status(500).json({ message: "Invalid Server Error" });
  }
}

module.exports = { errorHandler };
