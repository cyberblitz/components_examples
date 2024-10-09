

export default function PostPage({
    searchParams,
  }: {
    searchParams: { category?: string }; // Query parameter 'category'
  }) {


  // Simulate fetching a single post based on the postId
  const posts = [
    { id: 1, title: 'Tech Post 1', content: 'Content for post 1', category: 'tech' },
    { id: 1, title: 'Travel Post 1', content: 'Content for post 1', category: 'travel' },
    { id: 2, title: 'Travel Post 2', content: 'Content for post 2', category: 'travel' },
  ];

  const post = posts.find(post => (!searchParams.category || post.category === searchParams.category));

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
