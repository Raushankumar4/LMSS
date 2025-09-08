const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    
    if (!req.user || req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
          requestAccess: {
          info: "You do not have admin privileges.",
          action: "Please contact the system administrator or submit a request for admin access.",
          contact: "raushankumarguptag@gmail.com", 
        },
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = isAdmin;
