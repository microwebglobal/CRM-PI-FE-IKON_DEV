import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function LeadsStatCard({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md px-6 py-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14">
          <CircularProgressbarWithChildren
            value={parseInt(value)}
            maxValue={100}
            styles={buildStyles({
              pathColor: "#3b82f6", // blue-500
              trailColor: "#e5e7eb", // gray-200
            })}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-lg">
              {icon}
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div>
          <div className="font-medium text-gray-700">{label}</div>
          <div className="text-xl font-bold text-blue-600">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default LeadsStatCard;
