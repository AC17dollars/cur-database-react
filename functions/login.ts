import pool from "./db";
import { Handler } from "@netlify/functions";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface LoginData {
  email: string;
  password: string;
}
interface DatabaseData extends LoginData {
  salt: string;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid http method",
      }),
    };
  }

  try {
    let authToken: string | undefined = event.headers["x-auth-token"];
    let decode: LoginData | undefined = undefined;
    if (
      (event.body == "{}" || event.body == "" || event.body == undefined) &&
      authToken !== "undefined" &&
      authToken !== undefined
    ) {
      jwt.verify(authToken, JWT_SECRET as string, (err, decoded) => {
        if (err) {
          throw new Error("Invalid token");
        }
        decode = decoded as LoginData;
      });
    }
    const data: LoginData = decode || JSON.parse(event.body as string);
    const hash = crypto.createHash("sha256");

    let result = await pool.query(
      `select email, password, salt from userlogin where email='${data.email}';`
    );
    if (result.rows.length === 0) {
      throw new Error("No user found");
    }
    const user: DatabaseData = result.rows[0];
    const pass_and_salt = data.password + user.salt;
    hash.update(pass_and_salt);
    const hashedPasswordWSalt = hash.digest("hex");

    if (hashedPasswordWSalt !== user.password) {
      throw new Error("Password is incorrect.");
    }
    let result2 = await pool.query(
      `select name from userdata inner join userlogin on id=user_id where email='${data.email}';`
    );

    const token = jwt.sign(
      { email: data.email, password: data.password },
      JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: token,
        email: data.email,
        name: result2.rows[0].name,
      }),
    };
  } catch (err) {
    console.log(err);
    if (err.message === "Invalid token") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid token",
          token: "",
        }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unknown Error Occured while processing your request",
        token: "",
      }),
    };
  }
};
