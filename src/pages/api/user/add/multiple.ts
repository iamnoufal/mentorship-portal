import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { Response, UserType } from "@/utils/types";
import { UserDefaultData } from "@/utils/context";
import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";

// POST /api/user/add/multiple - Add multiple users
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Response | GetResult<UserType, any | null>>
) {
  if (req.method == "POST") {
    var addingData;
    const payload = req.body;
    for (let data of payload) {
      data.skills = data.skills?.join(", ") || "";
      data.hobbies = data.hobbies?.join(", ") || "";
      data = { ...UserDefaultData, ...data };
      addingData = await prisma.user
        .create({
          data: data,
        })
        .then(() => true)
        .catch((error: Prisma.PrismaClientKnownRequestError | any) => {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return true;
          }
          return `Internal Server Error => ${error.message}`;
        });
      if (addingData != true) break;
    }
    if (addingData == true)
      return res
        .status(200)
        .json({ message: "Associate added successfully", code: 200 });
    else
      return res.status(500).json({ message: addingData as string, code: 500 });
  } else {
    return res.status(405).json({ message: `Method not allowed`, code: 405 });
  }
}
