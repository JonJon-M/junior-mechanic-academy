import { motion } from 'framer-motion';

interface Props {
  spinning?: boolean;
  size?: number;
}

function Gear({ x, y, r, teeth, reverse, color }: {
  x: number; y: number; r: number; teeth: number; reverse?: boolean; color: string;
}) {
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2;
    const rad = i % 2 === 0 ? r + 8 : r;
    points.push(`${x + Math.cos(angle) * rad},${y + Math.sin(angle) * rad}`);
  }

  return (
    <motion.g
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <polygon points={points.join(' ')} fill={color} opacity="0.9" />
      <circle cx={x} cy={y} r={r * 0.4} fill="#1A1A2E" />
      <circle cx={x} cy={y} r={r * 0.15} fill={color} />
    </motion.g>
  );
}

export default function GearAnimation({ size = 160 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <Gear x={70} y={100} r={50} teeth={12} color="#ED8936" />
      <Gear x={145} y={100} r={32} teeth={8} reverse color="#4299E1" />
      <Gear x={145} y={40} r={22} teeth={6} color="#48BB78" />
    </svg>
  );
}
