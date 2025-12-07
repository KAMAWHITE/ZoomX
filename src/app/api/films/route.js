import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let films = [];
let nextId = 1;

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function GET() {
  return NextResponse.json(films);
}

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get('title')?.toString();
  const year = formData.get('year')?.toString();
  const genre = formData.get('genre')?.toString();
  const image = formData.get('image');
  const video = formData.get('video');

  if (!title || !year || !genre) {
    return NextResponse.json({ error: 'Maʼlumot yetishmayapti' }, { status: 400 });
  }

  let imageUrl = null;
  let videoUrl = null;

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + '-img-' + image.name.replace(/\s+/g, '_');
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  if (video && video.size > 0) {
    const buffer = Buffer.from(await video.arrayBuffer());
    const filename = Date.now() + '-vid-' + video.name.replace(/\s+/g, '_');
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    videoUrl = `/uploads/${filename}`;
  }

  const newFilm = {
    id: nextId++,
    title,
    year: parseInt(year),
    genre,
    image: imageUrl,
    video: videoUrl,
  };

  films.push(newFilm);
  return NextResponse.json(newFilm, { status: 201 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));

  const index = films.findIndex(f => f.id === id);
  if (index === -1) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

  const film = films[index];

  [film.image, film.video].forEach(file => {
    if (file) {
      const filePath = path.join(process.cwd(), 'public', file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  });

  films.splice(index, 1);
  return NextResponse.json({ message: 'Muvaffaqiyatli o‘chirildi' });
}