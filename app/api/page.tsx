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
  // Silinmek istenen post bilgisini tutan state
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Silme işlemi onaylandığında çağrılır.
  const confirmDelete = async () => {
    if (!postToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/posts?id=${postToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Post silinirken hata oluştu.');
      } else {
        mutate('/api/posts');
      }
    } catch (error) {
      alert('Post silinirken hata oluştu.');
    } finally {
      setDeleteLoading(false);
      setPostToDelete(null);
    }
  };

  // Modal kapatma işlemi
  const cancelDelete = () => {
    setPostToDelete(null);
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
    <>
      {/* Ana içerik */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Postlar</h1>

        {/* Responsive iki sütun düzeni */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol: Yeni Post Ekleme Formu */}
          <div className="md:w-1/3 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Yeni Post Ekle</h2>
            {message && (
              <p
                className={`mb-4 text-center ${
                  message.includes('başarıyla')
                    ? 'text-green-600'
                    : 'text-red-600'
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

          {/* Sağ: Postları Listeleme */}
          <div className="md:w-2/3 flex flex-col gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-100 flex justify-between items-start"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700">{post.content}</p>
                </div>
                <button
                  onClick={() => setPostToDelete(post)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Silme Onay Modalı - Modal, ana içerikten bağımsız olarak tüm sayfayı kaplar */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-[90%] border border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Emin misiniz?</h3>
              <p className="text-gray-600 mb-4">
                "<span className="font-medium">{postToDelete.title}</span>" başlıklı postu silmek üzeresiniz.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                disabled={deleteLoading}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors relative"
              >
                {deleteLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Siliniyor...
                  </span>
                ) : (
                  'Evet, Sil'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
