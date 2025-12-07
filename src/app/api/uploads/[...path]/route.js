import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const filePath = path.join(process.cwd(), 'public', 'uploads', ...params.path);
  if (!fs.existsSync(filePath)) return new NextResponse('Not found', { status: 404 });

  const file = fs.readFileSync(filePath);
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}