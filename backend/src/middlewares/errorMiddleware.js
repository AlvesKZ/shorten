const errorMiddleware = (error, req, res, next) => {
  console.error(`[ERROR] ${error.message}`);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    error: {
      message: error.message || "Erro interno do servidor.",
      ...(error.details && { details: error.details }),
    },
  });
};

export default errorMiddleware;