import React from 'react'

interface CircleGraphProps {
  percentage: number;
}

const CircleGraph = ({ percentage }: CircleGraphProps): React.JSX.Element => {
  // Calculate the circumference based on the path radius (~49.15)
  const circumference = 308.819;
  // Map the 0-100 percentage to the stroke dash offset
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
        stroke="#E1E1E2"
        strokeWidth="1.7"
        fillOpacity="0"
      />
      <path
        d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
        stroke="#1A1B1C"
        strokeWidth="1.7"
        fillOpacity="0"
        style={{
          strokeDasharray: `${circumference}px, ${circumference}px`,
          strokeDashoffset: `${dashOffset}px`,
          transition: "stroke-dashoffset 0.8s ease-in-out",
        }}
      />
    </svg>
  );
};

export default CircleGraph;
