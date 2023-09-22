import prisma from "@/utils/prisma";
import type { UserType } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/mentees/:regno - Get all the mentees of a mentor
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<UserType> | unknown>
) {
  let { regno }: { [key: string]: any } = req.query;
  let data = await prisma.user.findMany({
    where: {
      mentorID: regno.toUpperCase(),
    },
    select: {
      name: true,
      regno: true,
      email: true,
      department: true,
    },
  });
  return res.status(200).json(data);
}
