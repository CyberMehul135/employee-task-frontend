const PerformanceBar = ({ percentage }) => {
  const radius = 30;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div>
      <div className="flex justify-center items-center max-lg:py-[8px]">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb" // Tailwind's gray-200
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#4ade80" // Tailwind's blue-500
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`} // start from top
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="13"
            fill="#fff"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default PerformanceBar;
