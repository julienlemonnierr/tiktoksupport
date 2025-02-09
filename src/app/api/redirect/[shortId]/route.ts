import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Url from '@/app/models/Url';

type Context = {
  params: {
    shortId: string;
  };
};

export async function GET(
  _request: NextRequest,
  context: Context
) {
  try {
    await connectDB();

    // shortId'yi kontrol et
    const shortId = context.params.shortId;
    console.log('Searching for shortId:', shortId);

    const urlDoc = await Url.findOne({ shortId });
    console.log('Found URL document:', urlDoc);

    if (!urlDoc) {
      console.log('URL not found');
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }

    // Tıklama sayısını artır
    await Url.findByIdAndUpdate(urlDoc._id, {
      $inc: { clicks: 1 }
    });

    // Tam URL'yi oluştur
    let originalUrl = urlDoc.originalUrl;
    if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
      originalUrl = 'https://' + originalUrl;
    }

    console.log('Redirecting to:', originalUrl);
    return NextResponse.json({ originalUrl });

  } catch (error) {
    console.error('Error in redirect API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 