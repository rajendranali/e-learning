const authorizeSuperadmin = (req, res, next) => {
  // Check if req.user exists and has the role of 'superadmin'
  console.log("Authorizing super admin",req.body);
  if (req.body && req.body.user.role === "superadmin") {
    // User is a superadmin, allow access
    next();
  } else {
    // User is not authorized, send a 403 Forbidden error
    // console.log(err)
    return res.status(403).json({ message: "Forbidden" });
  }
};
module.exports = authorizeSuperadmin;
