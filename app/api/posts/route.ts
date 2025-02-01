import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// data dosyasının yolunu, artık app/api/data/data.json olacak şekilde ayarlıyoruz.
const filePath = path.join(process.cwd(), 'app', 'api', 'data', 'data.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    // JSON dosyamız direkt bir dizi içeriyorsa:
    const posts = JSON.parse(data);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Postlar okunurken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Başlık ve içerik gereklidir.' },
        { status: 400 }
      );
    }

    // Dosyadaki mevcut veriyi oku
    const data = await fs.readFile(filePath, 'utf8');
    const posts = JSON.parse(data);

    // Yeni post için ID belirleme (varsa en yüksek ID'den +1, yoksa 1)
    const newId = posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1;
    const newPost = { id: newId, title, content };

    posts.push(newPost);

    // Güncellenmiş post listesini dosyaya yaz
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Post eklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}
