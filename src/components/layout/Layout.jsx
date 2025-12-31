import Footer from './Footer';
import StickyNav from './StickyNav';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <StickyNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
