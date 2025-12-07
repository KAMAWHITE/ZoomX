import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

let films = [];
let nextId = 1;

export async function GET() {
  return NextResponse.json(films);
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get('title');
  const year = formData.get('year');
  const genre = formData.get('genre');
  const image = formData.get('image');
  const video = formData.get('video');

  let imagePath = null;
  let videoPath = null;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + '-' + image.name;
    const filepath = path.join(process.cwd(), 'uploads', filename);
    const publicPath = path.join(process.cwd(), 'public', 'uploads', filename);
    fs.writeFileSync(filepath, buffer);
    fs.writeFileSync(publicPath, buffer);
    imagePath = `/uploads/${filename}`;
  }

  const newFilm = {
    id: nextId++,
    title, year, genre,
    image: imagePath,
    video: videoPath
  };
  films.push(newFilm);

  return NextResponse.json(newFilm, { status: 201 });
}