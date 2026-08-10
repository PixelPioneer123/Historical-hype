import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate }) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="hh-countdown" role="timer" aria-live="polite">
      {units.map((u, i) => (
        <div key={u.label} className="hh-countdown-unit">
          <span className="hh-countdown-value">{String(u.value).padStart(2, "0")}</span>
          <span className="hh-countdown-label">{u.label}</span>
          {i < units.length - 1 && <span className="hh-countdown-sep">:</span>}
        </div>
      ))}
    </div>
  );
}
