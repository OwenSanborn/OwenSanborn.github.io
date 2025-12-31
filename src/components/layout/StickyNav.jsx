const StickyNav = () => {
  const navItems = [
    { name: 'Posts', href: '#posts' },
    { name: 'Experience', href: '#experience' },
    { name: 'Publications', href: '#publications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-charcoal bg-opacity-95 backdrop-blur-sm z-50 border-b border-slate border-opacity-20">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-light text-steel-blue hover:text-opacity-80 transition-colors tracking-tight">
            Owen D. Sanborn
          </a>
          <div className="flex gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-6 py-2 bg-steel-blue text-ivory rounded font-light hover:bg-opacity-90 transition-all text-sm"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
