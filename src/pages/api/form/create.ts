import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import { Prisma } from "@prisma/client";

// POST /api/form/create - Create a new form
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method == "POST") {
    let data = req.body;
    let resp = await prisma.form
      .create({
        data: {
          title: data.title,
          description: data.description,
          createdBy: data.createdBy,
          fields: {
            create: data.fields,
          },
        },
      })
      .then((res) => {
        return {
          message: "Form created and published successfully",
          code: 200,
          link: `${process.env.NEXT_PUBLIC_BASE_URI}/feedback/${res.formID}`,
        };
      })
      .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
        return {
          message: `Internal Server Error => ${error.message}`,
          code: 500,
        };
      });
    return res.status(resp.code).json(resp);
  } else
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
}
