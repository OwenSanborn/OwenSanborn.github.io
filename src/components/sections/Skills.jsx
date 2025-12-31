import { skills, skillCategories } from '../../data/skills';
import SkillBadge from '../ui/SkillBadge';

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-ivory mb-16 tracking-tight">
          Skills & Technologies
        </h2>
        <div className="max-w-5xl mx-auto space-y-12">
          {skillCategories.map((category) => (
            <div key={category.key}>
              <h3 className="text-2xl font-light text-steel-blue mb-6">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills[category.key].map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
