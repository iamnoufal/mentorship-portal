import prisma from "@/utils/prisma";
import type { UserType } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/mentor/available - Get available mentors. Availability is defined as a mentor who has less than 3 mentees.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<UserType> | unknown>
) {
  let data =
    await prisma.$queryRaw`select regno, name, email, department, image, year from User where email not in (select mentorID from User where mentorID not null group by mentorID having count(mentorID)>=3) and (type=='admin' or type=='mentor')`;
  return res.status(200).json(data);
}
