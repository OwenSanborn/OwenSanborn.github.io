const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-slate border-opacity-20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <p className="text-warm-grey text-sm font-light">
            {currentYear} Owen D. Sanborn
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
