import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import connectDB from '@/app/lib/mongodb';
import Url from '@/app/models/Url';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // URL'yi kontrol et
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }

    // Benzersiz kısa ID oluştur
    const shortId = nanoid(8);

    const newUrl = await Url.create({
      originalUrl: url,
      shortId,
    });

    return NextResponse.json({
      shortId: newUrl.shortId,
      originalUrl: newUrl.originalUrl,
    });

  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 