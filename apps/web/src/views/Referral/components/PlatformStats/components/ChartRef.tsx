import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts'

interface IProps {
  percent: number
  name: string
  cx?: number
  cy?: number
  fill?: string
  color?: string[]
}

function CustomLabel({ view, percent, name }) {
  const { cx, cy } = view

  return (
    <>
      <text
        x={65}
        y={65}
        fill=" rgba(255, 255, 255, 0.87)"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="24">
          {percent}
        </tspan>
      </text>
      <text
        x={cx}
        y={cy}
        fill="rgba(255, 255, 255, 0.6)"
        className="recharts-text recharts-label"
        textAnchor="bottom"
        dominantBaseline="bottom"
      >
        <tspan alignmentBaseline="text-after-edge" fontSize="12" fontWeight="400">
          {name}
        </tspan>
      </text>
    </>
  )
}

const ChartRef: React.FC<IProps> = ({
  percent = 0,
  name = '',
  cx = 50,
  cy = 110,
  color = ['#cbc2ec', '#8e82ba', 'rgba(255, 255, 255, 0.1)'],
}) => {
  const data = [
    { name: 'Group A', value: percent - 2 },
    { name: 'Group B', value: 2 },
    { name: 'Group C', value: 100 - percent },
  ]

  // const COLORS = [
  //   { start: '#9e54ed', end: '#5c4cb6' },
  //   { start: '#34c3ff', end: '#2876bd' },
  //   { start: '#da9d35', end: '#e96935' },
  // ]

  return (
    <PieChart width={130} height={120}>
      {/* <defs>
        {data.map((entry, index) => (
          <linearGradient id={`myGradient${index}`}>
            <stop offset="0%" stopColor={COLORS[index % COLORS.length].start} />
            <stop offset="100%" stopColor={COLORS[index % COLORS.length].end} />
          </linearGradient>
        ))}
      </defs> */}
      <Pie
        data={data}
        cx={60}
        cy={60}
        startAngle={220}
        endAngle={-40}
        innerRadius={45}
        outerRadius={60}
        fill="#8884d8"
        dataKey="value"
        stroke="none"
      >
        <Label
          width={30}
          position="center"
          content={<CustomLabel view={{ cx, cy }} percent={`${percent}%`} name={name} />}
        />
        {data.map((entry, index) => (
          <Cell key={`cell-${color.length}`} fill={color[index % color.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default ChartRef
