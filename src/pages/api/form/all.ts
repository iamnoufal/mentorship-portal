import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/form/all - Get all the forms
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | any>
) {
  if (req.method == "GET") {
    try {
      let data = await prisma.form.findMany({
        include: {
          responses: {
            select: {
              regno: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: "Form not found", code: 404 });
    }
  } else
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
}
