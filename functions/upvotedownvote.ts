import pool from "./db";
import { Handler } from "@netlify/functions";

interface UpvoteDownvoteData {
  post_id: number;
  upvote: boolean;
  downvote: boolean;
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

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    let data: UpvoteDownvoteData = JSON.parse(event.body as string);
    if (data.upvote) {
      await pool.query(
        `update posts set upvotes = upvotes + 1 where post_id = ${data.post_id};`
      );
    } else if (data.downvote) {
      await pool.query(
        `update posts set downvotes = downvotes + 1 where post_id = ${data.post_id};`
      );
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
