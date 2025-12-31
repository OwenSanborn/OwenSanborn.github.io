const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                YN
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience building
                web applications. I love turning complex problems into simple, beautiful, and
                intuitive solutions.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing my knowledge through technical blog posts.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                My goal is to create impactful products that improve people's lives while
                constantly learning and growing as a developer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
