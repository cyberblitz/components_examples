

export default function PostPage({
    params,
    searchParams,
  }: {
    params: { id: string };          // Dynamic route parameter 'id'
    searchParams: { startDate: string, endDate: string }; // Query parameter 'category'
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
    { id: 1, title: 'Tech Post 1',      content: 'Content for post 1', category: 'tech',   startDate: '2022-01-01' },
    { id: 1, title: 'Travel Post 1',    content: 'Content for post 1', category: 'travel', startDate: '2022-01-02'},
    { id: 2, title: 'Travel Post 2',    content: 'Content for post 2', category: 'travel', startDate: '2022-01-03' },
  ];

  const post = posts.filter(post => !searchParams.startDate || post.startDate >= searchParams.startDate && post.startDate <= searchParams.endDate);

  if (post.length === 0) {
    return <p>Post not found or category does not match</p>;
  }

  return (
  <>
        {post.map((p) => 
            <div key={p.startDate}>
              <h1>{p.title}</h1>
              <p>{p.content}</p>
              <p>Category: {p.category}</p> 
            </div>
        )
        }
   </>
  
  );
}
