const Hero = () => {
  return (
    <section id="home" className="bg-charcoal">
      <div className="container mx-auto px-6 pt-36 pb-12">
        <div className="max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-light text-steel-blue mb-6 tracking-tight">
            Owen D. Sanborn
          </h1>
          <p className="text-xl md:text-2xl text-warm-grey font-light">
            PhD Candidate, Genetics & Genomics
          </p>
          <p className="text-base md:text-lg text-warm-grey font-light opacity-80 mt-6 max-w-3xl leading-relaxed">
            RNA biologist building computational and wet-lab tools to interrogate RNA–protein interactions and their functional consequences
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
