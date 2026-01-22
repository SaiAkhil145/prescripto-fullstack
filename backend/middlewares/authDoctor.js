import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dToken = req.headers.dtoken;   // must be lowercase

    if (!dToken) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

    req.docId = token_decode.id;   // attach doctor id safely
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
