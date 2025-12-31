const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Contact
        </h2>
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-warm-grey">
              <span className="font-light text-sm w-20">Email</span>
              <span className="text-warm-brown">—</span>
              <a
                href="mailto:osanborn@bu.edu"
                className="text-steel-blue hover:text-opacity-80 transition-colors font-light"
              >
                osanborn@bu.edu
              </a>
            </div>
            <div className="flex items-center gap-4 text-warm-grey">
              <span className="font-light text-sm w-20">Location</span>
              <span className="text-warm-brown">—</span>
              <span className="font-light">Boston, MA</span>
            </div>
            <div className="flex items-center gap-4 text-warm-grey">
              <span className="font-light text-sm w-20">LinkedIn</span>
              <span className="text-warm-brown">—</span>
              <a
                href="https://www.linkedin.com/in/owen-sanborn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel-blue hover:text-opacity-80 transition-colors font-light"
              >
                owen-sanborn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
