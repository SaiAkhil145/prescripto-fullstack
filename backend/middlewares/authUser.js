import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Authentication Failed" });
  }
};

export default authUser;
