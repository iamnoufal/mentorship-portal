import prisma from "@/utils/prisma";
import { CronJob } from "cron";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import type { Response } from "@/utils/types";

// POST /api/trigger/sendbirthdayemails - Trigger cron job to send birthday emails
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const bdays = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      birthday: true,
      notifications: true,
    },
  });
  bdays.forEach((bday) => {
    if (bday.notifications == 1 && bday.birthday) {
      const date = new Date(bday.birthday);
      const job = new CronJob(
        `0 0 ${date.getDate()} ${date.getMonth()} *`,
        () => {
          console.log(bday.email);
          const message = {
            to: bday.email,
            subject: `Happy Birthday ${bday.name}`,
            html: `
            <div>
              <h4>Hi ${bday.name}</h4>
              <h4>We wish you the happiest birthday. Some birthday text</h4>
              <img src="cid:bdayimg" />
            </div>
          `,
            attachments: [
              {
                filename: "test.png",
                path: `${process.env.NEXT_PUBLIC_BASE_URI}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbosch_logo.e405c164.webp&w=750&q=75`,
                cid: "bdayimg",
              },
            ],
          };
          transporter
            .sendMail(message)
            .then(() =>
              console.log(`Wishes sent to ${bday.email} - ${bday.name}`)
            )
            .catch((e) => console.log(e));
        }
      );
      job.start();
      console.log(
        `Created birthday mail trigger for ${bday.name} - ${
          bday.email
        } on ${date.getDate()}/${date.getMonth() + 1} every year`
      );
    }
  });
  res
    .status(200)
    .json({ message: "Cron jobs triggered successfully", code: 200 });
}
