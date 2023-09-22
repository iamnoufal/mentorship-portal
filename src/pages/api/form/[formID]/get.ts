import prisma from "@/utils/prisma";
import type { Response } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/form/:formID/get - Get a form to fill by the user. Include only form fields
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | any>
) {
  let { formID }: { [key: string]: any } = req.query;
  if (req.method == "GET") {
    try {
      let data = await prisma.form.findUnique({
        where: {
          formID: formID,
        },
        include: {
          fields: {
            select: {
              id: true,
              label: true,
              type: true,
            },
          },
        },
      });
      if (data?.closed) {
        return res.status(403).json({ message: "Form is closed", code: 403 });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: "Form not found", code: 404 });
    }
  } else
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
}
