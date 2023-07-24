import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { graphQLClient } from "@/app/api/auth/graphQLClient";
import { generateJWT } from "../jwt";

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as User;

  let { user } = await graphQLClient().request<any>(
    gql`
      query getUserByUsername($username: String!) {
        user(where: { username: { _eq: $username } }) {
          id
          password
        }
      }
    `,
    {
      username,
    }
  );

  // Since we filtered on a non-primary key we got an array back
  user = user[0];
  const failResponse = NextResponse.json(
    { message: "Auth failed" },
    { status: 401 }
  );
  if (!user) {
    return failResponse;
  }

  // Check if password matches the hashed version
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const response = new NextResponse(
      JSON.stringify({
        token: generateJWT({
          sub: user.id,
          defaultRole: "user",
          allowedRoles: ["user"],
          otherClaims: {
            "x-hasura-user-id": user.id,
          },
        }),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  } else {
    return failResponse;
  }
}
