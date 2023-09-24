import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/form/:formID/unassign - Unassign a form from a user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | any>
) {
  let { formID }: { [key: string]: any } = req.query;
  if (req.method == "POST") {
    const data = req.body;
    let resp = await prisma.assigned
      .delete({
        where: {
          formID_email: {
            formID,
            email: data.email,
          },
        },
      })
      .then(() => {
        return {
          message: "Student unassigned to feedback successfully",
          code: 200,
        };
      })
      .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
        return `Internal Server Error => ${error.message}`;
      });
    return res.status(200).json(resp);
  } else
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
}
