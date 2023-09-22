import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";
import type { UserType } from "@/utils/types";

// GET /api/user/:regno - Get user  by regno
// PUT /api/user/:regno - Update user by regno
// DELETE /api/user/:regno - Delete user by regno
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | any>
) {
  let { email }: { [key: string]: any } = req.query;
  if (req.method == "GET") {
    let data = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        mentor: {
          select: {
            regno: true,
            name: true,
            email: true,
            department: true,
            year: true,
            image: true
          },
        },
        assignedFeedbacks: {
          include: {
            form: true,
          },
        },
        mentees: {
          select: {
            regno: true,
            name: true,
            email: true,
            department: true,
            year: true,
            image: true
          },
        },
      },
    });
    if (data == null) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    data!.skills = data?.skills
      ? (data?.skills?.split(", ") as unknown as string)
      : ([] as unknown as string);
    data!.hobbies = data!.hobbies
      ? (data!.hobbies!.split(", ") as unknown as string)
      : ([] as unknown as string);
    return res.status(200).json(data);
  } else if (req.method == "PUT") {
    let data = req.body;
    if ("skills" in data) {
      data.skills = data.skills.join(", ");
    }
    if ("hobbies" in data) {
      data.hobbies = data.hobbies.join(", ");
    }
    const resp = await prisma.user
      .update({
        where: {
          email
        },
        data: data,
      })
      .then(() => Object({ message: "User updated successfully", code: 200 }))
      .catch((e) => Object({ message: e.message, code: 500 }));
    return res.status(resp.code).json(resp);
  } else if (req.method == "DELETE") {
    let user = await prisma.user
      .delete({
        where: {
          email,
        },
      })
      .then(() => Object({ message: "User deleted successfully", code: 200 }))
      .catch((e) => Object({ message: e.message, code: 500 }));
    return res.status(user.code).json(user);
  }
}
