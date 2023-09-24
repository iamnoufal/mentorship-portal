import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { UserType, Response } from "@/utils/types";

// GET /api/user/all - Get all users
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<UserType> | Response>
) {
  if (req.method == "GET") {
    let allData = await prisma.user.findMany({
      orderBy: [
        {
          year: "asc",
        },
        {
          name: "asc",
        }
      ]
    });
    let data = allData.map(
      (d) =>
        Object({
          ...d,
          skills: d.skills?.split(", "),
          hobbies: d.hobbies?.split(", "),
        }) as UserType
    );
    res.status(200).json(data);
  } else res.status(405).json({ message: "Method not allowed", code: 405 });
}
