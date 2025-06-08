import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function LeadsStatCard({ icon, label, value, change, trend }) {
  const progressValue = parseInt(change);

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12">
          <CircularProgressbarWithChildren
            value={progressValue}
            maxValue={100}
            styles={buildStyles({
              pathColor: trend === "up" ? "#22c55e" : "#ef4444",
              trailColor: "#e5e7eb",
            })}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">
              {icon}
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-blue-500 text-sm">{value}</div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {trend === "up" ? (
          <ArrowUpRight className="text-green-500 w-4 h-4" />
        ) : (
          <ArrowDownRight className="text-red-500 w-4 h-4" />
        )}
        <span
          className={`${trend === "up" ? "text-green-500" : "text-red-500"}`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

export default LeadsStatCard;
