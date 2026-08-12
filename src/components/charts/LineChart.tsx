import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  title?: string;
  unit?: string;
  lineColor?: string;
  fillColor?: string;
  showDots?: boolean;
  showArea?: boolean;
}

export function LineChart({
  data,
  height = 200,
  className = "",
  title,
  unit = "",
  lineColor = "#22c55e",
  fillColor,
  showDots = true,
  showArea = true,
}: LineChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 10, bottom: 30, left: 45 };
  const chartWidth = 500;
  const chartHeight = height;
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values) * 1.1;
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerW;
    const y = padding.top + innerH - ((d.value - minVal) / range) * innerH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerH} L ${points[0].x} ${padding.top + innerH} Z`;

  const gradientId = `lineGrad-${Math.random().toString(36).slice(2, 9)}`;
  const actualFill = fillColor || lineColor;

  // Y-axis ticks
  const yTicks = 5;
  const yTickVals = Array.from({ length: yTicks }, (_, i) => minVal + (range / (yTicks - 1)) * i);

  return (
    <div className={className}>
      {title && <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">{title}</h4>}
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={actualFill} stopOpacity={0.3} />
            <stop offset="100%" stopColor={actualFill} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTickVals.map((val, i) => {
          const y = padding.top + innerH - ((val - minVal) / range) * innerH;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="currentColor" className="text-neutral-200 dark:text-neutral-700" strokeWidth={1} />
              <text x={padding.left - 6} y={y + 4} textAnchor="end" className="fill-neutral-400 dark:fill-neutral-500" fontSize={10}>
                {Math.round(val)}{unit}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        {showArea && (
          <motion.path
            d={areaPath}
            fill={`url(#${gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="white"
              stroke={lineColor}
              strokeWidth={2.5}
              className="dark:fill-neutral-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            />
          ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={chartHeight - 6} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-400" fontSize={10}>
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
