import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/form/:formID/assign - Assign a form to a user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | any>
) {
  let { formID }: { [key: string]: any } = req.query;
  if (req.method == "POST") {
    const data = req.body;
    let resp = await prisma.assigned
      .create({
        data: {
          form: {
            connect: {
              formID: formID,
            },
          },
          user: {
            connect: {
              regno: data.regno,
            },
          },
        },
      })
      .then(() => {
        return {
          message: "Associate assigned to feedback successfully",
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
