const ExperienceCard = ({ experience }) => {
  const formatDate = (dateString) => {
    if (dateString === 'Present') return 'Present';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="border-l border-warm-brown pl-6 pb-8">
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
          <h3 className="text-xl font-light text-steel-blue">
            {experience.position}
          </h3>
          <span className="text-xs text-warm-grey font-light mt-1 md:mt-0 opacity-70">
            {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
          </span>
        </div>
        <p className="text-base text-warm-grey font-light mb-1">
          {experience.company}
        </p>
        {experience.advisor && (
          <p className="text-xs text-warm-grey font-light italic opacity-60">
            Advisor: {experience.advisor}
          </p>
        )}
      </div>

      <p className="text-warm-grey font-light leading-relaxed text-sm">
        {experience.description}
      </p>

      {experience.projects && (
        <div className="mt-6 space-y-5">
          {experience.projects.map((project) => (
            <div key={project.title}>
              <h4 className="text-sm text-ivory font-normal mb-1">{project.title}</h4>
              <p className="text-warm-grey font-light leading-relaxed text-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
