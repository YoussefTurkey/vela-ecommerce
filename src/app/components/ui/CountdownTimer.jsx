"use client";
import { getTimeLeft } from "../../utils/getTimeLeft";
import { useEffect, useState } from "react";

export default function CountdownTimer({ hours = 8 }) {
  const [target] = useState(() => Date.now() + hours * 3_600_000);
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      {[
        ["H", time.h],
        ["M", time.m],
        ["S", time.s],
      ].map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-app-sm bg-secondary-700 text-white font-bold text-lg flex items-center justify-center tabular-nums">
            {pad(val)}
          </div>
          <span className="text-[10px] text-gray-400 font-semibold mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
