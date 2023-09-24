import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { Response as Response, UserType } from "@/utils/types";
import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";

// POST /api/user/add - Add a single user
// POST /api/mentor/assign - Assign a mentor to a user
// POST /api/mentor/unassign - Unassign a mentor from a user
// 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Response | GetResult<UserType, any | null>>
) {
  if (req.method == "POST") {
    const data = req.body;
    const email = data["email"];
    const mentorID = data.mentorID;
    const resp = await prisma.user
      .update({
        where: {
          email: data["email"],
        },
        data: {
          mentorID: data["mentorID"],
        },
      })
      .then(async () => {
        const mentor = await prisma.user.findUnique({
          where: { regno: mentorID },
          select: { name: true },
        });
        return {
          message: `Mentor ${mentor?.name} assigned successfully`,
          code: 200,
        };
      })
      .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return {
            message: `Mentor/User with email ${mentorID}/${email} doesn't exist`,
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
