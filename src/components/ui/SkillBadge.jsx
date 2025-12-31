const SkillBadge = ({ skill }) => {
  return (
    <span className="px-4 py-2 bg-slate bg-opacity-40 border border-warm-brown border-opacity-40 text-warm-grey rounded font-light hover:border-steel-blue hover:text-ivory transform hover:-translate-y-1 transition-all inline-block">
      {skill}
    </span>
  );
};

export default SkillBadge;
