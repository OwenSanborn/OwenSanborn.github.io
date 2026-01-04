const Tools = () => {
  const tools = [
    {
      id: 1,
      name: "RBPscan Analysis",
      description: "A quantitative, in vivo tool for profiling RNA-binding protein interactions. Upload your data and analyze RBP binding patterns with interactive visualizations.",
      link: "/tools/rbpscan/",
      external: false,
    },
    {
      id: 2,
      name: "Sanger Analysis",
      description: "Browser-based Sanger sequencing analysis tool. Upload .ab1 files to analyze RNA editing patterns with statistical modeling - all processed locally in your browser.",
      link: "/tools/rbpscan/Analysis",
      external: false,
    },
  ];

  return (
    <section id="tools" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Tools
        </h2>
        <div className="max-w-5xl grid md:grid-cols-1 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={tool.link}
              target={tool.external ? "_blank" : "_self"}
              rel={tool.external ? "noopener noreferrer" : undefined}
              className="block border border-steel-blue border-opacity-30 p-8 rounded hover:border-opacity-60 hover:bg-slate hover:bg-opacity-10 transition-all"
            >
              <h3 className="text-2xl font-light text-steel-blue mb-3">
                {tool.name}
              </h3>
              <p className="text-base text-warm-grey font-light leading-relaxed">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
