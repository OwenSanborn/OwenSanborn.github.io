import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Publications from './components/sections/Publications';
import Posts from './components/sections/Posts';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <Posts />
      <Experience />
      <Publications />
      <Contact />
    </Layout>
  );
}

export default App;
