'use client'; // This directive marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Heart, MessageSquare, PlusCircle, Send, X, Image as ImageIcon } from 'lucide-react'; // Added Image icon
import Image from 'next/image'; // Import Next.js Image component

// Define interfaces for our simulated data
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorProfilePicUrl: string; // New: User's profile picture
  likes: number;
  comments: number;
  createdAt: string;
  imageUrl?: string; // New: Optional image attached to the post (Data URL for simulation)
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Helper function to format date
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [postImageFile, setPostImageFile] = useState<File | null>(null); // State for image file
  const [postImagePreviewUrl, setPostImagePreviewUrl] = useState<string | null>(null); // State for image preview
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postStatus, setPostStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  // Simulate fetching posts on component mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts([
        {
          id: generateId(),
          title: "My first Simulated Universe run!",
          content: "Just finished World 3! Gepard carried hard. Any tips for World 4? This mode is harder than I thought!",
          author: "Trailblazer_765",
          authorProfilePicUrl: "/pic.webp", // Dummy profile pic
          likes: 15,
          comments: 7,
          createdAt: formatDateTime(new Date(Date.now() - 3600000 * 5)), // 5 hours ago
        },
        {
          id: generateId(),
          title: "Best Relic Sets for Kafka?",
          content: "I'm building my Kafka and wondering about her optimal relic sets. Is Band of Sizzling Thunder still good, or should I go for something else? Also, what main stats should I prioritize on each piece?",
          author: "StellaronHunter_Fan",
          authorProfilePicUrl: "/pic.webp", // Dummy profile pic
          likes: 32,
          comments: 12,
          createdAt: formatDateTime(new Date(Date.now() - 3600000 * 12)), // 12 hours ago
          imageUrl: "/hsr_ch.avif", // Dummy post image
        },
        {
          id: generateId(),
          title: "Lore Theory: What are Aeons truly?",
          content: "Been diving deep into the lore. The Aeons are fascinating. Are they truly gods, or just beings of immense power following a Path? Discuss your theories below!",
          author: "LoreSeeker_Dan",
          authorProfilePicUrl: "/pic.webp", // Dummy profile pic
          likes: 58,
          comments: 25,
          createdAt: formatDateTime(new Date(Date.now() - 3600000 * 24 * 2)), // 2 days ago
        },
        {
          id: generateId(),
          title: "Need help with Forgotten Hall: Memory of Chaos!",
          content: "I'm stuck on Memory of Chaos stage 10. My teams aren't strong enough. Any F2P friendly team comps or strategies that can clear it? My main DPS are Dan Heng IL and Seele.",
          author: "MoC_Struggler",
          authorProfilePicUrl: "/pic.webp", // Dummy profile pic
          likes: 21,
          comments: 9,
          createdAt: formatDateTime(new Date(Date.now() - 3600000 * 24 * 3)), // 3 days ago
        },
        {
          id: generateId(),
          title: "Fan Art: Herta's Puppet Collection",
          content: "Just finished a new piece of fan art featuring Herta's adorable puppet collection! Let me know what you think in the comments. I tried to capture their unique personalities.",
          author: "Artistic_Trailblazer",
          authorProfilePicUrl: "/pic.webp", // Dummy profile pic
          likes: 75,
          comments: 18,
          createdAt: formatDateTime(new Date(Date.now() - 3600000 * 24 * 5)), // 5 days ago
          imageUrl: "/guides.avif", // Dummy post image
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle image file selection for new post
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPostImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPostImageFile(null);
      setPostImagePreviewUrl(null);
    }
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setPostStatus('error');
      setTimeout(() => setPostStatus('idle'), 3000);
      return;
    }

    setIsLoading(true);
    setPostStatus('idle');

    setTimeout(() => {
      const newPost: Post = {
        id: generateId(),
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        author: "Current_User", // Placeholder for logged-in user
        authorProfilePicUrl: "/hsr_ch.avif", // Dummy profile pic for new posts
        likes: 0,
        comments: 0,
        createdAt: formatDateTime(new Date()),
        imageUrl: postImagePreviewUrl || undefined, // Include the image Data URL if available
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewPostTitle('');
      setNewPostContent('');
      setPostImageFile(null); // Clear file input
      setPostImagePreviewUrl(null); // Clear preview
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the actual file input element
      }
      setIsCreatingPost(false);
      setIsLoading(false);
      setPostStatus('success');
      setTimeout(() => setPostStatus('idle'), 3000);
    }, 1500); // Simulate API call
  };

  const handleLike = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-orbitron text-gray-100 bg-gradient-to-br from-gray-950 to-black">
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600 drop-shadow-lg">
          Stellar Nexus Community
        </h1>

        {/* Post Creation Section */}
        <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-purple-700/50 mb-8
                        transition-all duration-300 ease-in-out hover:border-purple-500 hover:shadow-purple-500/20">
          <button
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="w-full flex items-center justify-center py-3 px-6 rounded-lg font-semibold text-lg
                       bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900
                       transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 border border-purple-600"
          >
            {isCreatingPost ? (
              <>
                <X className="mr-2" size={20} /> Close Post Creator
              </>
            ) : (
              <>
                <PlusCircle className="mr-2" size={20} /> Create New Post
              </>
            )}
          </button>

          {isCreatingPost && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <input
                type="text"
                placeholder="Post Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-950 border border-indigo-600/50
                           text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                           shadow-inner shadow-gray-700/20"
              />
              <textarea
                placeholder="Share your thoughts, questions, or guides here (Markdown supported!)"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={6}
                className="w-full p-3 rounded-md bg-gray-950 border border-indigo-600/50
                           text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-y
                           shadow-inner shadow-gray-700/20"
              ></textarea>

              {/* Image Upload Input */}
              <label className="block text-gray-400 text-sm font-medium mb-2">
                <ImageIcon className="inline-block mr-2" size={16} /> Attach Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-purple-500/20 file:text-purple-300
                           hover:file:bg-purple-500/30 transition-colors duration-200"
              />
              {postImagePreviewUrl && (
                <div className="mt-4 border border-gray-700 rounded-lg p-2 flex justify-center items-center bg-gray-900/50">
                  <Image
                    src={postImagePreviewUrl}
                    alt="Image Preview"
                    width={300}
                    height={200}
                    className="max-w-full h-auto rounded-md shadow-lg border border-indigo-500/50"
                    objectFit="contain"
                  />
                </div>
              )}

              <button
                onClick={handleCreatePost}
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-semibold text-lg
                           ${isLoading
                              ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800'}
                           transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 border border-blue-500`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2" size={20} /> Publish Post
                  </>
                )}
              </button>
              {postStatus === 'success' && (
                <p className="text-green-400 text-center mt-2 text-shadow-sm shadow-green-700">Post published successfully!</p>
              )}
              {postStatus === 'error' && (
                <p className="text-red-400 text-center mt-2 text-shadow-sm shadow-red-700">Please fill in both title and content.</p>
              )}
            </div>
          )}
        </div>

        {/* Post Feed */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-lg">
          Stellar Feed
        </h2>

        {isLoading && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-900/70 rounded-xl border border-gray-700 shadow-xl">
            <svg className="animate-spin h-12 w-12 text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-3 text-xl text-gray-300 text-shadow-sm shadow-gray-700">Loading stellar data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-400 text-lg bg-gray-900/70 p-6 rounded-xl border border-gray-700 shadow-xl">No posts yet. Be the first to share your stellar insights!</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl
                             border border-blue-700/50 hover:border-blue-500 transition-all duration-200
                             hover:shadow-blue-500/20 group"
                >
                  {/* Subtle background gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-transparent rounded-xl -z-10"></div>
                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-200 -z-20
                                  group-hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>

                  <div className="flex items-center mb-3">
                    <Image
                      src={post.authorProfilePicUrl}
                      alt={`${post.author}'s profile pic`}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-purple-500 shadow-md mr-3"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 text-shadow-sm shadow-blue-700">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Posted by <span className="text-purple-400 font-medium">{post.author}</span> on {post.createdAt}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-200 mb-4 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>

                  {post.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 shadow-md">
                      <Image
                        src={post.imageUrl}
                        alt="Post Image"
                        width={600} // Max width for display
                        height={300} // Auto height to maintain aspect ratio
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-6 text-gray-400">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-1 hover:text-red-400 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-1 group/like"
                    >
                      <Heart size={20} fill="currentColor" className="group-hover/like:animate-pulse" />
                      <span>{post.likes} Likes</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-md p-1 group/comment"
                    >
                      <MessageSquare size={20} fill="currentColor" className="group-hover/comment:animate-bounce-y" /> {/* Added bounce animation */}
                      <span>{post.comments} Comments</span>
                    </button>
                    {/* Link to a detail page would go here */}
                    {/* <Link href={`/community/${post.id}`} className="text-blue-400 hover:underline">Read More</Link> */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
