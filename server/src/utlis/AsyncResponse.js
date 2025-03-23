const AsyncResponse = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({
      success: false,
      message: "Error has occured",
      error,
    });
  }
};

export default AsyncResponse;

