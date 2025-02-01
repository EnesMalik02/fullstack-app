'use client';

import { useState, FormEvent } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const { data: posts, error } = useSWR<Post[]>('/api/posts', fetcher);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.error || 'Post eklenirken hata oluştu.');
      } else {
        setTitle('');
        setContent('');
        setMessage('Post başarıyla eklendi!');
        mutate('/api/posts');
      }
    } catch (err) {
      setMessage('Post eklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Postlar yüklenirken bir hata oluştu.
      </div>
    );
  if (!posts)
    return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Postlar</h1>

      {/* Yeni Post Ekleme Formu */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Yeni Post Ekle</h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes('başarıyla') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Başlık:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              İçerik:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Gönderiliyor...' : 'Post Ekle'}
          </button>
        </form>
      </div>

      {/* Mevcut Postları Listeleme */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
