const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    //take session cookie off of trquet
    const cookie = req.cookies[process.env.COOKIE_NAME];

    // Check the httpOnly session cookie for the current user
    if (!cookie) throw new Error('You must be signed in to continue');

    // Verify the JWT token stored in the cookie
    const user = jwt.verify(cookie, process.env.JWT_SECRET);

    //attach user to request
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};