'use client';  // Only for app directory, if using client-side rendering

import { useSearchParams } from 'next/navigation';  // useParams and useSearchParams for app directory
import { useRouter } from 'next/router';  // For pages directory

export default function PostPage({
    params,
    searchParams,
  }: {
    params: { id: string };          // Dynamic route parameter 'id'
    searchParams: { category?: string }; // Query parameter 'category'
  }) {
  // For app directory (Next.js 13)
 
//   const searchParams = useSearchParams();
  
  // Ensure postId is a string (handle string[] cases)
//   const postId = Array.isArray(params.id) ? params.id[0] : params.id;
//   const category = searchParams.get('category');

  // Parse postId to an integer
  const parsedPostId = parseInt(params.id, 10);


  // Simulate fetching a single post based on the postId
  const posts = [
    { id: 1, title: 'Tech Post 1', content: 'Content for post 1', category: 'tech' },
    { id: 1, title: 'Tech Post 1', content: 'Content for post 1', category: 'travel' },
    { id: 2, title: 'Travel Post 1', content: 'Content for post 2', category: 'travel' },
  ];

  const post = posts.find(post => post.id === parsedPostId && (!searchParams.category || post.category === searchParams.category));

  if (!post) {
    return <p>Post not found or category does not match</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>
    </div>
  );
}
