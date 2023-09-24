import prisma from "@/utils/prisma";
import type { ResponseType, FormType, Response } from "@/utils/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/form/:formID - Get a form
// POST /api/form/:formID - Submit a form
// DELETE /api/form/:formID - Delete a form
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | any>
) {
  let { formID }: { [key: string]: any } = req.query;
  if (req.method == "GET") {
    try {
      let data = (await prisma.form.findUnique({
        where: {
          formID: formID,
        },
        include: {
          fields: true,
          responses: {
            include: {
              user: {
                select: {
                  name: true,
                  department: true,
                  email: true,
                  regno: true,
                },
              },
              values: true,
            },
          },
          assignedTo: {
            select: {
              email: true,
            },
          },
        },
      })) as unknown as FormType;
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: "Form not found", code: 404 });
    }
  } else if (req.method == "POST") {
    const data = req.body;
    let resp = await prisma.response
      .create({
        data: {
          formID: formID,
          email: data.email,
          values: {
            create: data.values.map((v: { value: string | number }) =>
              Object({ ...v, value: v.value.toString() })
            ),
          },
        },
      })
      .then(() => {
        return prisma.assigned
          .update({
            where: {
              formID_email: {
                formID,
                email: data.email,
              },
            },
            data: {
              submitted: 1,
            },
          })
          .then(() =>
            Object({ message: "Feedback submitted successfully", code: 200 })
          );
      })
      .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
        return {
          message: `Internal Server Error => ${error.message}`,
          code: 500,
        };
      });
    return res.status(resp.code).json(resp);
  } else if (req.method == "DELETE") {
    let responses = await prisma.response.findMany({
      where: {
        formID
      }
    })
    for (let i of responses) {
      await prisma.value.deleteMany({
        where: {
          responseID: i.id
        }
      })
    }
    let deletingothers = await prisma.form.update({
      where: {
        formID,
      },
      data: {
        fields: {
          deleteMany: {},
        },
        assignedTo: {
          deleteMany: {},
        },
        responses: {
          deleteMany: {},
        },
      },
    });
    let resp = await prisma.form
      .delete({
        where: {
          formID: formID,
        },
      })
      .then(() => {
        return { message: "Form deleted successfully", code: 200 };
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
