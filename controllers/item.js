import { nanoid } from "nanoid";

import prisma from "../prisma/client.js";
import s3 from "../config/s3.js";

export const addItem = async (req, res) => {
  try {
    const { name, description, image, levelId } = req.body;
    const user = req.user;

    // Store the item in the database
    const item = await prisma.item.create({
      data: {
        level_id: parseInt(levelId),
        name,
        description,
      },
    });

    // Upload image to S3
    var image_key = "";
    const fileName = nanoid();
    const data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    console.log(data);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Body: data,
      Key: "items/" + fileName,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "image/png",
    };
    image_key = fileName;
    await s3.upload(params).promise();

    // Store image key to database
    await prisma.item.update({
      where: { id: item.id },
      data: {
        image: image_key,
      },
    });

    res.status(200).json({ success: true, message: "Item successfully created!" });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ success: false, message: "Unable to create the new item! Please check your input." });
  }
};

export const findItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = req.user;

    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(itemId),
      },
      include: {
        level: {
          include: {
            items: true,
          },
        },
      },
    });

    const userLevel = await prisma.user_level.findUnique({
      where: {
        user_id_level_id_unique: {
          user_id: user.id,
          level_id: item.level.id,
        },
      },
      include: {
        level: true,
      },
    });

    await prisma.level_item.create({
      data: {
        user_level_id: userLevel.id,
        item_id: item.id,
      },
    });

    const foundItems = await prisma.level_item.count({
      where: {
        user_level_id: userLevel.id,
      },
    });

    var result = {};
    if (foundItems == item.level.items.length) {
      await completeLevel(user.id, userLevel);
      result.status = 201;
      result.message = "Level has been completed!";
    } else {
      result.status = 200;
      result.message = "Item has been found!";
    }

    res.status(result.status).json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const completeLevel = async (userId, userLevel) => {
  await prisma.user_level.update({
    where: {
      user_id_level_id_unique: {
        user_id: userId,
        level_id: userLevel.id,
      },
    },
    data: {
      completed: true,
    },
  });

  const newOrder = userLevel.level.order + 1;
  const nextLevel = await prisma.level.findUnique({
    where: { order: newOrder },
  });

  if (nextLevel) {
    await prisma.user_level.create({
      data: {
        level_id: nextLevel.id,
        user_id: userId,
      },
    });
  }
};
