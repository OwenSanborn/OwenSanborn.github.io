import { experience } from '../../data/experience';
import ExperienceCard from '../ui/ExperienceCard';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Experience
        </h2>
        <div className="max-w-5xl space-y-12">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
