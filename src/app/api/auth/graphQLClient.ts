import { GraphQLClient } from "graphql-request";
import { NextRequest } from "next/server";

export const graphQLClient = (req?: NextRequest) => {
  const token = req?.headers.get("authorization");
  return new GraphQLClient(
    process.env.HASURA_URL || "http://localhost:8080/v1/graphql",
    {
      headers: token
        ? {
            "x-hasura-role": "user",
            authorization: token,
          }
        : {
            "x-hasura-role": "user",
            "x-hasura-admin-secret":
              process.env.HASURA_ADMIN_SECRET_KEY || "myadminsecretkey",
          },
    }
  );
};
