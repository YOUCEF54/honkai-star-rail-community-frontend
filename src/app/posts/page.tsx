'use client'

import Image from 'next/image';
import Link from 'next/link';

// NOTE: This is a standalone component.
// In a real application, this data would be fetched from a server-side API.
const mockCommunityPosts = [
  {
    id: 1,
    title: "تركيبات الفريق المفضلة لدي لوضع endgame الجديد",
    author: "Trailblazer42",
    date: "31 يوليو، 2025",
    tags: ["Team Building", "Endgame"],
    images: [
      "/guides.avif",
    ],
  },
  {
    id: 2,
    title: "سؤال حول break effect لـ Ruan Mei",
    author: "AstaFan",
    date: "30 يوليو، 2025",
    tags: ["Ruan Mei", "Team Building"],
    images: [
      "/team.avif",
    ],
  },
  {
    id: 3,
    title: "دليل جديد لـ Kafka و DoT للاعبين F2P",
    author: "KafkaEnjoyer",
    date: "29 يوليو، 2025",
    tags: ["Kafka", "DoT", "Guide"],
    images: [], // This post has no images
  },
  {
    id: 4,
    title: "بناء Clara قوية مع دعم من Bronya",
    author: "ClaraMain",
    date: "28 يوليو، 2025",
    tags: ["Clara", "Bronya", "Guide"],
    images: [
      "/hsr_ch.avif",
    ],
  },
  {
    id: 5,
    title: "ما هي أفضل طريقة للحصول على Stellar Jades؟",
    author: "Newbie",
    date: "27 يوليو، 2025",
    tags: ["Question", "Stellar Jade"],
    images: [], // This post also has no images
  },
  {
    id: 6,
    title: "رأيي في banners الإصدار 2.4 الجديدة",
    author: "Pioneer",
    date: "26 يوليو، 2025",
    tags: ["Banners", "News"],
    images: [
      "/team.avif",
    ],
  },
];

export default function PostsPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-black/0 text-amber-200 p-4 sm:p-8" dir="rtl">
      <div className='relative'>
        <Image
            width={500}
            height={500}
            alt='خلفية'
            src={"/bg3_v2.png"}
            className='fixed inset-0 z-10 opacity-10 w-full h-full object-cover'
        />
      </div>

      {/* Main Content */}
      <div className="relative backdrop-blur-mdl z-10 max-w-[44rem] container mx-auto py-12 px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-200 mb-4 sm:mb-0">
            منشورات المجتمع
          </h1>
          <Link href="/">
            <button className="px-6 py-3 text-amber-200 rounded-xll border border-amber-200 font-medium hover:bg-amber-200/20 transition-colors duration-300">
              العودة للصفحة الرئيسية
            </button>
          </Link>
        </header>

        {/* Posts List */}
        <section className="rounded-3xll borderl">
          <h2 className="text-2xl font-bold mb-6 text-amber-200/80">جميع المنشورات</h2>
          <div className="space-y-6">
            {mockCommunityPosts.map(post => (
              <div key={post.id} className="p-6 rounded-xll bg-black/50 border border-amber-200/50 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-amber-200/55 dark:text-amber-200/40 mb-4">بواسطة {post.author} في {post.date}</p>
                
                {/* Image Gallery */}
                {post.images.length > 0 && (
                  <div className={`grid grid-cols-1 gap-4 mb-4`}>
                    {post.images.map((image, index) => (
                        <div className='h-full' key={index}>
                            <Image
                                width={500}
                                height={500}
                                src={image}
                                alt={`صورة للمنشور: ${post.title}`}
                                className={`rounded-lgl border border-amber-200/40 w-full h-full object-cover`}
                            />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-700/30 text-amber-200/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}