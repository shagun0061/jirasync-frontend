import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/lib/model/user';
import { connect } from '@/lib/dbConfig';
import { NextRequest, NextResponse } from 'next/server';


// Login API to authenticate a user
export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse request body
    const body = await req.json();
    const { email, password } = body;
  
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}