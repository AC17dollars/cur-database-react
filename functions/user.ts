import pool from "./db";
import { Handler } from "@netlify/functions";

interface UserPostData {
  userdata: UserData;
  postdata: PostData[];
}

interface PostData {
  post_id: number;
  title: string;
  date: string;
  upvotes: number;
  downvotes: number;
}
interface UserData {
  name: string;
  email: string;
  dob: string;
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
    const query = event.queryStringParameters;
    if (query == null) {
      throw Error("No email provided");
    }

    const [rows] = await pool.query(
      `Select name, dob, email from userlogin inner join userdata on id=user_id where id=${query.id};`
    );
    const data = rows as any[];
    if (data.length == 0) {
      throw Error("No user found");
    }
    let user: UserData = rows[0] as UserData;

    const [rows2] = await pool.query(
      `SELECT post_id, title, upvotes, downvotes, date from posts inner join userlogin on author=email where id = '${query.id}';`
    );
    let posts: PostData[] = rows2 as PostData[];
    posts.forEach((post) => {
      post.title = post.title.replace(/&apos;/g, "'");
    });

    const userpostdata: UserPostData = {
      userdata: user,
      postdata: posts,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(userpostdata),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unknown Error Occured while processing your request",
      }),
    };
  }
};
