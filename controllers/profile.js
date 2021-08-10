import { nanoid } from "nanoid";

import prisma from "../prisma/client.js";
import s3 from "../config/s3.js";

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      id,
      fullname,
      username,
      email,
      profile_photo,
      about,
    } = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { ...req.body },
    });

    const data = {
      id,
      fullname,
      email,
      username,
      profile_photo,
      about,
    };

    res.status(200).json({ success: true, message: "Your information has been updated!", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { photo } = req.body;

    // Upload profile photo to S3
    const fileName = nanoid();
    const data = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Body: data,
      Key: "profile-photos/" + fileName,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "image/png",
    };

    await s3.upload(params).promise();

    // Store the profile photo file name to the database
    await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        profile_photo: fileName,
      },
    });

    res.status(200).json({ success: true, data: { message: "Your new profile photo has been set!", photo_key: fileName } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        profile_photo: true,
        about: true,
      },
    });

    if (!user) return res.status(404).json({ success: false, message: "User with the given ID does not exist!" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};