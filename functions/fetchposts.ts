import pool from "./db";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid http method",
      }),
    };
  }

  try {
    let query = await pool.query(
      `SELECT post_id, title, content, name as author, date, upvotes, downvotes FROM posts inner join userlogin on userlogin.email=posts.author inner join userdata on userdata.user_id = userlogin.id ORDER BY date DESC;`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(query.rows),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
