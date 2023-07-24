import { NextRequest, NextResponse } from "next/server";
import { gql } from "graphql-request";
import { graphQLClient } from "@/app/api/auth/graphQLClient";
import { Task, TaskType } from "@/models/Task";

export async function POST(req: NextRequest) {
  try {
    const { type, name, description, isDone } = (await req.json()) as Task;
    const { insert_task_one } = await graphQLClient(req).request<any>(
      gql`
        mutation createTask($task: task_insert_input!) {
          insert_task_one(object: $task) {
            id
            type
            name
            description
            isDone: is_done
          }
        }
      `,
      {
        task: {
          type: TaskType[type],
          name,
          description,
          is_done: isDone,
        },
      }
    );

    const response = new NextResponse(JSON.stringify(insert_task_one), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Auth failed" }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { task } = await graphQLClient(req).request<any>(
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

export async function PUT(req: NextRequest) {
  try {
    const { id, type, name, description, isDone } = (await req.json()) as Task;
    const { update_task_by_pk } = await graphQLClient(req).request<any>(
      gql`
        mutation update($id: Int!, $task: task_set_input!) {
          update_task_by_pk(pk_columns: { id: $id }, _set: $task) {
            description
            id
            is_done
            name
            type
            user_id
          }
        }
      `,
      {
        id,
        task: {
          type: TaskType[type],
          name,
          description,
          is_done: isDone,
        },
      }
    );

    const response = new NextResponse(JSON.stringify(update_task_by_pk), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Auth failed" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as Task;
    const { delete_task_by_pk } = await graphQLClient(req).request<any>(
      gql`
        mutation deleteTaskBy($id: Int!) {
          delete_task_by_pk(id: $id) {
            id
            description
            is_done
            name
            type
            user_id
          }
        }
      `,
      {
        id,
      }
    );

    const response = new NextResponse(JSON.stringify(delete_task_by_pk), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Auth failed" }, { status: 401 });
  }
}
