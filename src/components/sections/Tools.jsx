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
      link: "/tools/SangerAnalysis",
      external: false,
    },
    {
      id: 3,
      name: "Sequencing Depth Analyzer",
      description: "Evaluate sequencing depth from FASTQ.gz files. Generate coverage distribution plots, cumulative depth plots, and saturation curves to compare samples - all processed locally in your browser.",
      link: "/tools/sequencing-depth/",
      external: false,
    },
    {
      id: 4,
      name: "Library Pooling Calculator",
      description: "Calculate pooling volumes for Illumina sequencing. Supports equal molar pooling and unequal pooling by target Gb output per library. Import from clipboard, export as PDF.",
      link: "/tools/library-pooling/",
      external: false,
    },
    {
      id: 5,
      name: "NGS Editing Analyzer",
      description: "Analyze RNA editing from RBPscan NGS data. Upload FASTQ.gz files to extract motif IDs and hairpin editing counts. Supports paired-end mode (motif on R1, hairpin on reverse-complemented R2) and single-read mode. All processing done locally in your browser.",
      link: "/tools/ngs-editing/",
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
