import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import LeadsStatCard from "@/widgets/cards/leads-stat-card";
import { BarChart } from "@mui/x-charts/BarChart";

const stats = {
  leads: [
    {
      icon: "🚗",
      label: "Motor Vehicle Insurance",
      value: "512 Leads",
      change: "40",
      trend: "down",
    },
    {
      icon: "✈️",
      label: "Travel Insurance",
      value: "55 Leads",
      change: "70",
      trend: "up",
    },
    {
      icon: "🔆",
      label: "Solar Panel Insurance",
      value: "121 Leads",
      change: "90",
      trend: "up",
    },
  ],
  conversations: [
    {
      icon: "🚗",
      label: "Motor Vehicle Insurance",
      value: "1055 Chats",
      change: "10",
      trend: "down",
    },
    {
      icon: "✈️",
      label: "Travel Insurance",
      value: "201 Chats",
      change: "80",
      trend: "up",
    },
    {
      icon: "🔆",
      label: "Solar Panel Insurance",
      value: "557 Chats",
      change: "70",
      trend: "up",
    },
    {
      icon: "💡",
      label: "Other: Generic",
      value: "777 Chats",
      change: "70",
      trend: "up",
    },
  ],
};

export function Home() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    console.log("Start:", ranges.selection.startDate);
    console.log("End:", ranges.selection.endDate);
  };
  return (
    <div className="mt-5">
      {/*Date range selector */}
      <div className="mb-6">
        <Popover placement="bottom-start">
          <PopoverHandler>
            <Button variant="outlined" color="blue-gray">
              {selectionRange.startDate.toDateString()} -{" "}
              {selectionRange.endDate.toDateString()}
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-50 p-0 shadow-lg">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              rangeColors={["#3B82F6"]}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/*stat section */}
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6 mb-10">
        {/* Total Leads */}
        <div>
          <h2 className="text-lg font-bold mb-3">Total Leads</h2>
          <div className="">
            {stats.leads.map((item, idx) => (
              <LeadsStatCard key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* Total Conversations */}
        <div>
          <h2 className="text-lg font-bold mb-3">Total Conversations</h2>
          <div>
            {stats.conversations.map((item, idx) => (
              <LeadsStatCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">Bar Chart</h2>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"] }]}
        />
      </div>
    </div>
  );
}

export default Home;
