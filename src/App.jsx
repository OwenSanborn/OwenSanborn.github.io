import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Publications from './components/sections/Publications';
import ReadingLists from './components/sections/ReadingLists';
import Tools from './components/sections/Tools';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <Tools />
      <Experience />
      <Publications />
      <ReadingLists />
      <Contact />
    </Layout>
  );
}

export default App;
