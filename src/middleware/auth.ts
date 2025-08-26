// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   id: string;
//   email: string;
//   role: string;
// }

// export const protect = (req: Request, res: Response, next: NextFunction) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };


// const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

// // 👇 custom payload type
// interface CustomJwtPayload extends JwtPayload {
//   userId: string;
//   //  id: string;
//   email: string;
//   role: string;
// }

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token: any = authHeader.split(" ")[1];

//     // ✅ Properly cast with JwtPayload
//     const decoded = jwt.verify(token, JWT_SECRET) as unknown as CustomJwtPayload;

//     (req as any).user = {
//       userId: decoded.userId,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token: any = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey") as any;

    (req as any).user = decoded; // 👈 userId, role save in request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
