import { useState } from "react";
import { motion } from "framer-motion";

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
  innerRadius?: number;
  className?: string;
  title?: string;
}

export function PieChart({ data, size = 220, innerRadius = 60, className = "", title }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10;

  let cumulativeAngle = -90; // Start from top

  const slices = data.map((slice, i) => {
    const angle = (slice.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(startRad);
    const iy1 = cy + innerRadius * Math.sin(startRad);
    const ix2 = cx + innerRadius * Math.cos(endRad);
    const iy2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const d = [
      `M ${ix1} ${iy1}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");

    return { ...slice, d, index: i, percentage: ((slice.value / total) * 100).toFixed(1) };
  });

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {title && <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">{title}</h4>}
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((slice) => (
            <motion.path
              key={slice.index}
              d={slice.d}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              className="dark:stroke-neutral-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: hoveredIndex === slice.index ? 1.05 : 1 }}
              transition={{ duration: 0.5, delay: slice.index * 0.1 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              onMouseEnter={() => setHoveredIndex(slice.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              cursor="pointer"
            />
          ))}
          {/* Center text */}
          <text x={cx} y={cy - 6} textAnchor="middle" className="fill-neutral-800 dark:fill-white text-lg font-bold">
            {hoveredIndex !== null ? `${slices[hoveredIndex].percentage}%` : "Total"}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-400 text-xs">
            {hoveredIndex !== null ? slices[hoveredIndex].label : `₹${total.toLocaleString()}`}
          </text>
        </svg>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 justify-center">
        {data.map((slice, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
            <span>{slice.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
