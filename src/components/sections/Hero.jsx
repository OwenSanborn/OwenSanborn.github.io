import PhDWeeks from '../ui/PhDWeeks';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-light text-steel-blue mb-6 tracking-tight">
              Owen D. Sanborn
            </h1>
            <p className="text-xl md:text-2xl text-warm-grey font-light">
              PhD Candidate, Genetics & Genomics
            </p>
          </div>
          <div className="flex-shrink-0">
            <PhDWeeks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
