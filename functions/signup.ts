import pool from "./db";
import { Handler } from "@netlify/functions";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface SignUpData {
  name: string;
  email: string;
  password: string;
  dob: string;
  passwordConfirm: string;
}

const genRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

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
    const data: SignUpData = JSON.parse(event.body as string);

    const salt = genRandomString(30);
    const pw_and_salt = data.password + salt;

    const hash = crypto.createHash("sha256");
    hash.update(pw_and_salt);
    const hashedPasswordWSalt = hash.digest("hex");

    let result = await pool.query(
      `insert into userlogin(email, password, salt) values ('${data.email}', '${hashedPasswordWSalt}', '${salt}') returning id;`
    );
    let result2 = await pool.query(
      `insert into userdata(name, dob, user_id) values('${data.name}', '${data.dob}', '${result.rows[0].id}');`
    );

    const token = jwt.sign(
      { email: data.email, password: data.password },
      JWT_SECRET as string,
      { expiresIn: 60 }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: token,
        email: data.email,
        name: result.rows[0].name,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unknown Error Occured while processing your request",
      }),
    };
  }
};
