import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import { Prisma } from "@prisma/client";

// GET /api/form/:formID/open - Open a form
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let { formID }: { [key: string]: any } = req.query;
  const resp = await prisma.form
    .update({
      where: {
        formID: formID,
      },
      data: {
        closed: 0,
      },
    })
    .then((res) => Object({ message: "Form opened successfully", code: 200 }))
    .catch((error: Prisma.PrismaClientKnownRequestError | any) =>
      Object({
        message: `Internal Server error => ${error.message}`,
        code: 500,
      })
    );
  return res.status(resp.code).json(resp);
}
