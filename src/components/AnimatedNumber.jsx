import { useEffect, useState } from "react";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
}) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(timer);
      }

      setNumber(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="animate-number">
      {prefix}
      {Math.floor(number).toLocaleString()}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;