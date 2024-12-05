import UserModel from "@/model/UserSchema";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existsingEmail = await UserModel.findOne({
      email,
    });

    if (existsingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User with given email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully!!!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "User is not registered",
      },
      {
        status: 500,
      }
    );
  }
}
