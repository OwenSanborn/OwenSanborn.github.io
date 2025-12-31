const PhDWeeks = () => {
  const startDate = new Date('2022-09-01');
  const endDate = new Date('2027-06-01');
  const today = new Date();

  // Calculate total weeks
  const totalWeeks = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24 * 7));

  // Calculate weeks passed
  const weeksPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24 * 7));

  // Create array of weeks
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i < weeksPassed);

  // Calculate grid dimensions (aim for roughly square)
  const weeksPerRow = 26; // 26 weeks = half a year
  const rows = Math.ceil(totalWeeks / weeksPerRow);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h3 className="text-2xl font-light text-ivory mb-2">PhD Journey</h3>
        <p className="text-base text-warm-grey font-light">
          {weeksPassed} / {totalWeeks} weeks
        </p>
      </div>
      <div className="inline-grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${weeksPerRow}, 14px)` }}>
        {weeks.map((isPassed, index) => (
          <div
            key={index}
            className={`w-[14px] h-[14px] rounded-[2px] ${
              isPassed
                ? 'bg-steel-blue'
                : 'bg-slate bg-opacity-40 border border-slate border-opacity-30'
            }`}
            title={`Week ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex gap-6 text-sm text-warm-grey font-light">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-steel-blue rounded-sm"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate bg-opacity-40 border border-slate border-opacity-30 rounded-sm"></div>
          <span>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default PhDWeeks;
