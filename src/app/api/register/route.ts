import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User } from '@/lib/model/user';
import {connect } from '@/lib/dbConfig'

import { NextRequest, NextResponse } from 'next/server';


// Registration API to create a new user
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email is already in use' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}
