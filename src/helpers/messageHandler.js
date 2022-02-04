export const successMessage = (res, status, message, datas) => {
    res.status(status).json({
      success: true,
      message,
      data: datas,
    });
  };
  
  export const errorMessage = (res, status, message) => {
    res.status(status).json({
      success: false,
      message,
    });
  };