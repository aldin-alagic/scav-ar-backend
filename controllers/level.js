import { nanoid } from "nanoid";

import prisma from "../prisma/client.js";
import s3 from "../config/s3.js";

export const getUserLevel = async (req, res) => {
  try {
    const { id } = req.user;

    const userLevel = await prisma.user_level.findFirst({
      where: {
        user_id: id,
        completed: false,
      },
      include: {
        level: {
          include: {
            items: true,
          },
        },
      },
    });

    console.log(userLevel);

    res.status(200).json({ success: true, message: "", data: { ...userLevel } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
