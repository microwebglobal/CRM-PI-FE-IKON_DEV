import React, { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import LeadsStatCard from "@/widgets/cards/leads-stat-card";
import { StatisticsCard } from "@/widgets/cards";
import { BanknoteIcon, PauseCircle, RefreshCcwDot } from "lucide-react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import apiService from "@/utils/apiService";
import LeadsBarChart from "@/widgets/charts/barchart";

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

  const [leadCountsByStatus, setLeadCountsByStatus] = useState({});
  const [leadCountsByInsurance, setLeadCountsByInsurance] = useState({});

  useEffect(() => {
    async function fetchLeadCounts() {
      const statusResponse =
        await apiService.leadService.getLeadCountByStatus();
      const insuranceResponse =
        await apiService.leadService.getLeadCountByInsuranceType();
      console.log(statusResponse.data);
      console.log(insuranceResponse.data);
      setLeadCountsByStatus(statusResponse.data);
      setLeadCountsByInsurance(insuranceResponse.data);
    }

    fetchLeadCounts();
  }, []);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    console.log("Start:", ranges.selection.startDate);
    console.log("End:", ranges.selection.endDate);
  };
  return (
    <div className="mt-5">
      {/*Date range selector */}
      {/* <div className="mb-6">
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
      </div> */}
      {/*stat section */}
      <div className="grid lg:grid-cols-3 gap-x-10 gap-y-6 mb-10">
        <StatisticsCard
          color="green"
          icon={<RefreshCcwDot className="h-6 w-6 text-white" />}
          title="New Leads"
          value={leadCountsByStatus?.NEW || 0}
          footer={
            <div className="flex items-center">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Updated just now
              </Typography>
            </div>
          }
        />
        <StatisticsCard
          color="blue"
          icon={<PauseCircle className="h-6 w-6 text-white" />}
          title="On Hold Leads"
          value={leadCountsByStatus?.ON_HOLD || 0}
          footer={
            <div className="flex items-center">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Updated just now
              </Typography>
            </div>
          }
        />
        <StatisticsCard
          color="yellow"
          icon={<LockClosedIcon className="h-6 w-6 text-white" />}
          title="Closed Leads"
          value={leadCountsByStatus?.CLOSED || 0}
          footer={
            <div className="flex items-center">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Updated just now
              </Typography>
            </div>
          }
        />
      </div>
      <hr />
      <div className="mb-10 mt-5">
        {/* Total Leads */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(leadCountsByInsurance).map(
              ([insuranceType, count], idx) => (
                <LeadsStatCard
                  key={idx}
                  icon={
                    insuranceType.includes("Travel")
                      ? "✈️"
                      : insuranceType.includes("Motor")
                      ? "🚗"
                      : insuranceType.includes("Solar")
                      ? "🔆"
                      : "💼"
                  }
                  label={insuranceType}
                  value={`${count} Leads`}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div>
        <LeadsBarChart />
      </div>
    </div>
  );
}

export default Home;
