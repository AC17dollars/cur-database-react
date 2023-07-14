import pool from "./db";
import { Handler } from "@netlify/functions";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface UpdatePostData {
  post_id: number;
  //   title: string;
  content: string;
  author: string;
  //   date: string;
}
interface LoginData {
  email: string;
  password: string;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "PATCH") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid http method",
      }),
    };
  }

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    let data: UpdatePostData = JSON.parse(event.body as string);
    let authToken: string | undefined = event.headers["x-auth-token"];
    if (authToken === undefined || authToken === "undefined") {
      throw new Error("Invalid token");
    }
    let decode: LoginData = jwt.verify(
      authToken,
      JWT_SECRET as string
    ) as LoginData;
    console.log(decode);
    if (decode.email == data.author) {
      await pool.query(
        `update posts set content = '${data.content}' where post_id = ${data.post_id} and author = '${decode.email}';`
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Success",
        }),
      };
    } else {
      throw new Error("Invalid author");
    }
  } catch (err) {
    console.log(err);
    if (err.message === "Invalid token") {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Invalid token",
        }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
