import { publications } from '../../data/publications';

const Publications = () => {
  return (
    <section id="publications" className="py-24 bg-slate bg-opacity-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Publications
        </h2>
        <div className="max-w-5xl space-y-8">
          {publications.map((pub) => (
            <div key={pub.id} className="border-l border-steel-blue pl-6 pb-6">
              {pub.link ? (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-light text-steel-blue mb-3 leading-relaxed hover:underline block"
                >
                  {pub.title}
                </a>
              ) : (
                <h3 className="text-base font-light text-ivory mb-3 leading-relaxed">
                  {pub.title}
                </h3>
              )}
              <p className="text-sm text-warm-grey font-light mb-2 leading-relaxed">
                {pub.authors.map((author, idx) => (
                  <span key={idx}>
                    {author === 'Sanborn, O.' ? (
                      <strong className="text-ivory font-medium">{author}</strong>
                    ) : (
                      author
                    )}
                    {idx < pub.authors.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-warm-grey opacity-70">
                <span className="italic">{pub.journal}</span>
                <span>•</span>
                <span>{pub.year}</span>
                {pub.status === "Accepted in principle" && (
                  <>
                    <span>•</span>
                    <span className="text-steel-blue">{pub.status}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
