import { motion } from "framer-motion";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  className?: string;
  title?: string;
  unit?: string;
  barColor?: string;
}

export function BarChart({ data, height = 200, className = "", title, unit = "", barColor = "#22c55e" }: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const barWidth = Math.min(40, (100 / data.length) * 0.6);
  const gap = 100 / data.length;

  return (
    <div className={className}>
      {title && <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">{title}</h4>}
      <div className="relative" style={{ height }}>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 w-full">
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 w-8 text-right flex-shrink-0">
                {Math.round(maxVal - (maxVal / 4) * i)}
              </span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <svg className="absolute inset-0 ml-10" width="calc(100% - 40px)" height={height} preserveAspectRatio="none">
          {data.map((d, i) => {
            const barH = (d.value / maxVal) * (height - 30);
            const x = `${gap * i + gap / 2 - barWidth / 2}%`;
            const color = d.color || barColor;
            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  y={height - barH - 20}
                  width={`${barWidth}%`}
                  height={barH}
                  rx={4}
                  fill={color}
                  initial={{ height: 0, y: height - 20 }}
                  animate={{ height: barH, y: height - barH - 20 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                />
                {/* Value label */}
                <motion.text
                  x={`${gap * i + gap / 2}%`}
                  y={height - barH - 26}
                  textAnchor="middle"
                  className="fill-neutral-600 dark:fill-neutral-400"
                  fontSize={10}
                  fontWeight={600}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  {d.value}{unit}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-10 right-0 flex">
          {data.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate block">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
