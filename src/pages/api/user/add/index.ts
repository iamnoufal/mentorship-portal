import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { Response as Response, UserType } from "@/utils/types";
import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";

// POST /api/user/add - Add a single user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Response | GetResult<UserType, any | null>>
) {
  if (req.method == "POST") {
    let data = req.body;
    data.skills = data.skills?.join(", ") || "";
    data.hobbies = data.hobbies?.join(", ") || "";
    let resp = await prisma.user
      .create({
        data: data,
      })
      .then(() => {
        return { message: "Student added successfully", code: 200 };
      })
      .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return {
            message: `Student information with Reg No ${data.regno} already exists.`,
            code: 403,
          };
        }
        return {
          message: `Internal Server Error => ${error.message}`,
          code: 500,
        };
      });
    return res.status(resp.code).json(resp);
  } else
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
}
