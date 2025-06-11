import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import API from "../../utils/apiService";
import { Select, Option } from "@material-tailwind/react";

export function Leads() {
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await API.leadService.getAllLeads();
        setLeads(response.data);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      }
    };
    fetchLeads();
  }, []);

  const handleOpen = (lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const updateStatus = async (status) => {
    try {
      await API.leadService.updateLeadStatus(selectedLead.id, status);
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, status } : lead
        )
      );
      setSelectedLead((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDeleteLead = async () => {
    try {
      await API.leadService.deleteLead(selectedLead.id);
      setLeads((prev) => prev.filter((lead) => lead.id !== selectedLead.id));
      setOpen(false);
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lead Details
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[900px] table-auto">
            <thead>
              <tr>
                {[
                  "Session ID",
                  "Full Name",
                  "Insurance Type",
                  "Vehicle No.",
                  "Contact",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {header}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 px-5 text-center text-gray-500"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.sessionId}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.fullName}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.insuranceType}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.vehicleNumber || "-"}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.contactNumber}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {lead.status}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Button
                        variant="outlined"
                        color="black"
                        onClick={() => handleOpen(lead)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal for lead details */}
      <Dialog
        open={open}
        handler={() => setOpen(false)}
        size="lg"
        className="max-w-3xl"
      >
        <DialogHeader className="text-xl font-semibold border-b border-gray-200">
          Lead Details
        </DialogHeader>

        <DialogBody divider className="space-y-6 py-6 px-8">
          {selectedLead && (
            <>
              {/* Basic Info */}
              <section className="space-y-2">
                <Typography className="text-gray-700 font-medium">
                  <strong>Full Name:</strong> {selectedLead.fullName}
                </Typography>
                <Typography className="text-gray-700 font-medium">
                  <strong>Email:</strong> {selectedLead.email}
                </Typography>
                <Typography className="text-gray-700 font-medium">
                  <strong>Contact:</strong> {selectedLead.contactNumber}
                </Typography>
                <Typography className="text-gray-700 font-medium">
                  <strong>Insurance Type:</strong> {selectedLead.insuranceType}
                </Typography>
              </section>

              {/* Vehicle Info */}
              {selectedLead.vehicleNumber && (
                <section className="space-y-2 border-t border-gray-200 pt-4">
                  <Typography className="text-gray-600 font-semibold uppercase text-sm tracking-wide">
                    Vehicle Information
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Vehicle Number:</strong>{" "}
                    {selectedLead.vehicleNumber}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Vehicle Model:</strong> {selectedLead.vehicleModel}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Year:</strong> {selectedLead.yearOfManufacture}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Usage Type:</strong> {selectedLead.usageType}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Estimated Value:</strong>{" "}
                    {selectedLead.estimatedValue}
                  </Typography>
                </section>
              )}

              {/* Travel Info */}
              {selectedLead.destination && (
                <section className="space-y-2 border-t border-gray-200 pt-4">
                  <Typography className="text-gray-600 font-semibold uppercase text-sm tracking-wide">
                    Travel Information
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Destination:</strong> {selectedLead.destination}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Travel Dates:</strong> {selectedLead.travelDates}
                  </Typography>
                  <Typography className="text-gray-700">
                    <strong>Age:</strong> {selectedLead.travellerAge}
                  </Typography>
                </section>
              )}

              {/* Status */}
              <section className="border-t border-gray-200 pt-4">
                <Typography className="text-gray-700 font-medium">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      selectedLead.status === "NEW"
                        ? "bg-green-100 text-green-800"
                        : selectedLead.status === "ON_HOLD"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedLead.status === "CLOSED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedLead.status}
                  </span>
                </Typography>
              </section>

              {/* Action Buttons */}
              <section className="mt-6 flex gap-4 justify-end">
                {selectedLead.status === "NEW" && (
                  <>
                    <Button
                      color="amber"
                      variant="outlined"
                      size="md"
                      onClick={() => updateStatus("ON_HOLD")}
                    >
                      Hold
                    </Button>
                    <Button
                      color="red"
                      variant="filled"
                      size="md"
                      onClick={() => updateStatus("CLOSED")}
                    >
                      Close
                    </Button>
                  </>
                )}

                {selectedLead.status === "ON_HOLD" && (
                  <Button
                    color="red"
                    variant="filled"
                    size="md"
                    onClick={() => updateStatus("CLOSED")}
                  >
                    Close
                  </Button>
                )}
              </section>
            </>
          )}
        </DialogBody>

        <DialogFooter className="border-t border-gray-200 py-3 px-8">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Leads;
