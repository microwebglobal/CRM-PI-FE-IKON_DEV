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
import Swal from "sweetalert2";

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
    const { isConfirmed } = await Swal.fire({
      title: `Change status to ${status}?`,
      text: "Are you sure you want to update the status of this lead?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      willOpen: () => {
        const confirmBtn = document.querySelector(".swal2-confirm");
        const cancelBtn = document.querySelector(".swal2-cancel");

        if (confirmBtn) {
          confirmBtn.style.backgroundColor = "#dc2626";
          confirmBtn.style.color = "white";
          confirmBtn.style.padding = "8px 16px";
          confirmBtn.style.margin = "8px";
          confirmBtn.style.borderRadius = "0.375rem";
        }

        if (cancelBtn) {
          cancelBtn.style.backgroundColor = "#e5e7eb";
          cancelBtn.style.color = "black";
          cancelBtn.style.padding = "8px 16px";
          cancelBtn.style.borderRadius = "0.375rem";
        }
      },
    });

    if (!isConfirmed) return;

    try {
      await API.leadService.updateLeadStatus(selectedLead.id, status);
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, status } : lead
        )
      );
      setSelectedLead((prev) => ({ ...prev, status }));

      Swal.fire({
        title: "Success!",
        text: `Status has been updated to ${status}.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to update status", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to update status. Please try again.",
        icon: "error",
      });
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
                  "Lead No.",
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
                leads.map((lead, index) => (
                  <tr key={lead.id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {index + 1}
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
                        size="sm" // 👈 Make button smaller
                        onClick={() => handleOpen(lead)}
                      >
                        View
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
        className="max-w-xl rounded-2xl"
      >
        {/* Header */}
        <DialogHeader className="bg-black text-white px-8 py-4 text-2xl font-bold border-b border-blue-300 flex items-center gap-3 rounded-t-2xl">
          <i className="fas fa-user-circle text-3xl"></i> Lead Details
        </DialogHeader>

        {/* Body with scrollable content */}
        <DialogBody
          divider
          className="space-y-6 py-6 px-8 bg-white max-h-[70vh] overflow-y-auto"
        >
          {selectedLead && (
            <>
              {/* Basic Info */}
              <section className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <Typography className="text-gray-800 font-semibold text-lg mb-2">
                  Basic Information
                </Typography>
                <div className="space-y-1 text-gray-700">
                  <Typography>
                    <strong>Full Name:</strong> {selectedLead.fullName}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {selectedLead.email}
                  </Typography>
                  <Typography>
                    <strong>Contact:</strong> {selectedLead.contactNumber}
                  </Typography>
                  <Typography>
                    <strong>Insurance Type:</strong>{" "}
                    {selectedLead.insuranceType}
                  </Typography>
                </div>
              </section>

              {/* Vehicle Info */}
              {selectedLead.vehicleNumber && (
                <section className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <Typography className="text-gray-800 font-semibold text-lg mb-2">
                    Vehicle Information
                  </Typography>
                  <div className="space-y-1 text-gray-700">
                    <Typography>
                      <strong>Vehicle Number:</strong>{" "}
                      {selectedLead.vehicleNumber}
                    </Typography>
                    <Typography>
                      <strong>Vehicle Model:</strong>{" "}
                      {selectedLead.vehicleModel}
                    </Typography>
                    <Typography>
                      <strong>Year:</strong> {selectedLead.yearOfManufacture}
                    </Typography>
                    <Typography>
                      <strong>Usage Type:</strong> {selectedLead.usageType}
                    </Typography>
                    <Typography>
                      <strong>Estimated Value:</strong>{" "}
                      {selectedLead.estimatedValue}
                    </Typography>
                  </div>
                </section>
              )}

              {/* Travel Info */}
              {selectedLead.destination && (
                <section className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <Typography className="text-gray-800 font-semibold text-lg mb-2">
                    Travel Information
                  </Typography>
                  <div className="space-y-1 text-gray-700">
                    <Typography>
                      <strong>Destination:</strong> {selectedLead.destination}
                    </Typography>
                    <Typography>
                      <strong>Travel Dates:</strong> {selectedLead.travelDates}
                    </Typography>
                    <Typography>
                      <strong>Age:</strong> {selectedLead.travellerAge}
                    </Typography>
                  </div>
                </section>
              )}

              {/* Status */}
              <section className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <Typography className="text-gray-800 font-semibold text-lg mb-2">
                  Status
                </Typography>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedLead.status === "NEW"
                      ? "bg-green-100 text-green-700"
                      : selectedLead.status === "ON_HOLD"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedLead.status === "CLOSED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedLead.status}
                </span>
              </section>

              {/* Action Buttons */}
              <section className="mt-6 flex gap-4 justify-end">
                {selectedLead.status === "NEW" && (
                  <>
                    <Button
                      color="amber"
                      variant="gradient"
                      size="md"
                      className="rounded-full shadow-md"
                      onClick={() => updateStatus("ON_HOLD")}
                    >
                      Hold Lead
                    </Button>
                    <Button
                      color="red"
                      variant="gradient"
                      size="md"
                      className="rounded-full shadow-md"
                      onClick={() => updateStatus("CLOSED")}
                    >
                      Close Lead
                    </Button>
                  </>
                )}

                {selectedLead.status === "ON_HOLD" && (
                  <Button
                    color="red"
                    variant="gradient"
                    size="md"
                    className="rounded-full shadow-md"
                    onClick={() => updateStatus("CLOSED")}
                  >
                    Close
                  </Button>
                )}
              </section>
            </>
          )}
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="border-t border-gray-200 py-3 px-8 bg-gray-50">
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="text-black hover:underline bg-red-200"
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Leads;
