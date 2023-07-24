import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { graphQLClient } from "@/app/api/auth/graphQLClient";
import { generateJWT } from "../jwt";

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as User;
  const { insert_user_one } = await graphQLClient().request<any>(
    gql`
      mutation registerUser($user: user_insert_input!) {
        insert_user_one(object: $user) {
          id
        }
      }
    `,
    {
      user: {
        username,
        password: await bcrypt.hash(password, 10),
      },
    }
  );

  const { id: userId } = insert_user_one;

  const response = new NextResponse(
    JSON.stringify({
      token: generateJWT({
        sub: userId,
        defaultRole: "user",
        allowedRoles: ["user"],
        otherClaims: {
          "x-hasura-user-id": userId,
        },
      }),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}
