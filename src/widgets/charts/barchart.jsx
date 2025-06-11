import React, { useEffect, useState, useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import dayjs from "dayjs";
import API from "../../utils/apiService";
import {
  CircularProgress,
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";

const getLastNDays = (n) => {
  return Array.from({ length: n }, (_, i) =>
    dayjs().subtract(i, "day").format("MMM DD")
  );
};

const LeadsBarChart = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await API.leadService.getAllLeads();
        setLeads(response.data);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const chartData = useMemo(() => {
    const pastDays = getLastNDays(4);
    const grouped = {};

    pastDays.forEach((date) => {
      grouped[date] = {
        "Travel Insurance": 0,
        "Motor Insurance": 0,
      };
    });

    leads.forEach((lead) => {
      const formattedDate = dayjs(lead.createdAt).format("MMM DD");
      const type = lead.insuranceType;
      if (
        grouped[formattedDate] &&
        grouped[formattedDate][type] !== undefined
      ) {
        grouped[formattedDate][type]++;
      }
    });

    return {
      labels: pastDays,
      travelData: pastDays.map((d) => grouped[d]["Travel Insurance"]),
      motorData: pastDays.map((d) => grouped[d]["Motor Insurance"]),
    };
  }, [leads]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Leads by Day & Insurance Type
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <BarChart
        height={320}
        xAxis={[
          {
            data: chartData.labels,
            scaleType: "band",
            label: "Date",
            tickLabelStyle: {
              fontSize: 12,
              angle: 0,
              textAnchor: "middle",
            },
          },
        ]}
        series={[
          {
            data: chartData.travelData,
            label: "Travel Insurance",
            color: theme.palette.primary.main,
          },
          {
            data: chartData.motorData,
            label: "Motor Insurance",
            color: theme.palette.warning.main,
          },
        ]}
        margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
        grid={{ horizontal: true }}
        tooltip={{
          trigger: "axis",
          formatter: (params) =>
            params.map((p) => `${p.seriesLabel}: ${p.value} leads`).join("\n"),
        }}
      />
    </Paper>
  );
};

export default LeadsBarChart;
