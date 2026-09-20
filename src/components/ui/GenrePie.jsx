import { useState } from 'react';
import { genres } from '../../data/books';

const SIZE = 160;
const R = SIZE / 2;

// SVG path for one pie slice, angles in radians measured clockwise from 12 o'clock.
const slicePath = (start, end) => {
  const x1 = R + R * Math.sin(start);
  const y1 = R - R * Math.cos(start);
  const x2 = R + R * Math.sin(end);
  const y2 = R - R * Math.cos(end);
  const largeArc = end - start > Math.PI ? 1 : 0;
  return `M ${R} ${R} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
};

const GenrePie = ({ books, label }) => {
  const [active, setActive] = useState(null);
  const total = books.length;

  const rows = genres
    .map((genre) => ({ ...genre, count: books.filter((b) => b.genre === genre.id).length }))
    .filter((row) => row.count > 0);

  const slices = rows.map((row, i) => {
    const before = rows.slice(0, i).reduce((sum, r) => sum + r.count, 0);
    return {
      ...row,
      start: (before / total) * 2 * Math.PI,
      end: ((before + row.count) / total) * 2 * Math.PI,
    };
  });

  const pct = (count) => Math.round((count / total) * 100);
  const dim = (id) => (active && active !== id ? 0.35 : 1);

  return (
    <div className="flex items-center gap-6">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${label} genre breakdown: ${rows.map((r) => `${r.label} ${r.count}`).join(', ')}`}
        className="flex-shrink-0"
      >
        {slices.map((slice) => (
          <path
            key={slice.id}
            d={
              slice.count === total
                ? `M ${R} 0 A ${R} ${R} 0 1 1 ${R - 0.01} 0 Z`
                : slicePath(slice.start, slice.end)
            }
            fill={slice.color}
            stroke="#1A1B26"
            strokeWidth="2"
            opacity={dim(slice.id)}
            onMouseEnter={() => setActive(slice.id)}
            onMouseLeave={() => setActive(null)}
            className="transition-opacity"
          >
            <title>{`${slice.label}: ${slice.count} of ${total} (${pct(slice.count)}%)`}</title>
          </path>
        ))}
      </svg>
      <ul className="text-sm font-light space-y-1.5">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center gap-2 text-warm-grey transition-opacity"
            style={{ opacity: dim(row.id) }}
            onMouseEnter={() => setActive(row.id)}
            onMouseLeave={() => setActive(null)}
          >
            <span
              className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: row.color }}
            />
            <span className="text-ivory">{row.label}</span>
            <span className="opacity-70">
              {row.count} · {pct(row.count)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenrePie;
