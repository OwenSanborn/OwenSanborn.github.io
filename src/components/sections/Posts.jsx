import { posts } from '../../data/posts';

const Posts = () => {
  return (
    <section id="posts" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Posts
        </h2>
        <div className="max-w-5xl grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/${post.slug}.html`}
              className="block border border-steel-blue border-opacity-30 p-6 rounded hover:border-opacity-60 hover:bg-slate hover:bg-opacity-10 transition-all"
            >
              <h3 className="text-xl font-light text-steel-blue mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-warm-grey font-light mb-3">
                {post.description}
              </p>
              <span className="text-xs text-warm-grey opacity-60">{post.date}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
