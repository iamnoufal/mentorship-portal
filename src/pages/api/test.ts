import { UserDefaultData } from "../../utils/context";
import prisma from "../../utils/prisma";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // prisma.user.create({
  //   data: {
  //     name: 'Balaji',
  //     regno: "HEL1COB",
  //     email: 'test@in.bosch.com',
  //     type: 'mentor',
  //     year: 'test',
  //     department: "EMT-test",
  //     mentor: {
  //       connect: {
  //         regno: "JBF1COB"
  //       }
  //     }
      
  //   }
  // }).then(r => console.log(r)).catch(e => console.log(e))
  let data = await prisma.$queryRaw`select * from User where regno not in (select mentorID from User where mentorID not null group by mentorID having count(mentorID)>=3)`;

  console.log(data)
  res.status(200).json({ name: 'John Doe' })
}
