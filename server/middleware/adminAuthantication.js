const jwt = require("jsonwebtoken");
const Admin = require("../moduls/adminSchema");

//authenticaticating admin by jwt token.
const adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.KEY);

    const rootAdmin = await Admin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootAdmin) {
      throw new Error("Admin not found");
    }

    req.token = token;
    req.rootAdmin = rootAdmin;
    req.AdminID = rootAdmin._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized:No token provided");
    console.log(err);
  }
};

module.exports = adminAuthenticate;
