import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import AdminModel from "@/model/AdminModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password, role } = await req.json();
    const existingEmail = await AdminModel.findOne({
      email,
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin with the email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully!!!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Admin is not registered",
      },
      {
        status: 500,
      }
    );
  }
}
