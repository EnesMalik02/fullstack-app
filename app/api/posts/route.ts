import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// app/api/data/data.json dosyasının yolunu belirleyelim.
const filePath = path.join(process.cwd(), 'app', 'api', 'data', 'data.json');

// JSON verisini diziye dönüştüren yardımcı fonksiyon.
const parsePostsData = (data: string): any[] => {
  const parsed = JSON.parse(data);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  if (parsed && Array.isArray(parsed.posts)) {
    return parsed.posts;
  }
  return [];
};

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const posts = parsePostsData(data);
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

    const data = await fs.readFile(filePath, 'utf8');
    const posts = parsePostsData(data);

    // Yeni post için ID belirleme
    const newId =
      posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1;
    const newPost = { id: newId, title, content };

    posts.push(newPost);

    const updatedData = (() => {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? posts : { posts };
    })();

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Post eklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ error: 'Id parametresi gereklidir.' }, { status: 400 });
    }
    const postId = Number(idParam);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Geçersiz id değeri.' }, { status: 400 });
    }

    // Dosyadan mevcut veriyi oku
    const data = await fs.readFile(filePath, 'utf8');
    const posts = parsePostsData(data);

    // İlgili postu listeden çıkar
    const newPosts = posts.filter((post: any) => post.id !== postId);

    const updatedData = (() => {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? newPosts : { posts: newPosts };
    })();

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Post silinirken hata oluştu.' },
      { status: 500 }
    );
  }
}
