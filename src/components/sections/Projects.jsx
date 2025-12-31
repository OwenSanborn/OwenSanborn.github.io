import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate bg-opacity-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
