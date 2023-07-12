import pool from "./db";
import { Handler } from "@netlify/functions";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
  downvotes: number;
}

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid http method",
      }),
    };
  }

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const [rows] = await pool.query(
      `SELECT post_id, title, content, name as author, date, upvotes, downvotes FROM posts inner join userlogin on userlogin.email=posts.author inner join userdata on userdata.user_id = userlogin.id ORDER BY date DESC LIMIT 100;`
    );
    let data: PostData[] = rows as PostData[];
    data.forEach((post) => {
      post.content = post.content.replace(/&apos;/g, "'");
      post.title = post.title.replace(/&apos;/g, "'");
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
