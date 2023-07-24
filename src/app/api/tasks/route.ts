import { NextRequest, NextResponse } from "next/server";
import { gql } from "graphql-request";
import { graphQLClient } from "@/app/api/auth/graphQLClient";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");
  if (!token)
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  try {
    const { task } = await graphQLClient(token).request<any>(
      gql`
        query getTask {
          task {
            id
            type
            name
            description
            isDone: is_done
          }
        }
      `
    );

    const response = new NextResponse(JSON.stringify(task), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Auth failed" }, { status: 401 });
  }
}
