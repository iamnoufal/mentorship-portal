import prisma from "@/utils/prisma";
import type { UserType } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/mentor/available - Get available mentors. Availability is defined as a mentor who has less than 3 mentees.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<UserType> | unknown>
) {
  let data: any =
    await prisma.$queryRaw`select regno, name, email, department, image, year, skills, hobbies from "User" where email not in (select "mentorID" from "User" where "mentorID" is not null group by "mentorID" having count("mentorID")>=3) and (type like 'admin' or type like 'mentor')`;
  for (let i of data) {
    i!.skills = i?.skills
      ? (i?.skills?.split(", ") as unknown as string)
      : ([] as unknown as string);
    i!.hobbies = i!.hobbies
      ? (i!.hobbies!.split(", ") as unknown as string)
      : ([] as unknown as string);
  }
  return res.status(200).json(data);
}
