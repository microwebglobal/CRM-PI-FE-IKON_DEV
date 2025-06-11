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

export function Conversations() {
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFirstChats = async () => {
      try {
        const response = await API.ChatService.getFirstChatPerSession();
        setSessions(response.data);
      } catch (error) {
        console.error("Failed to fetch first chats per session", error);
      }
    };
    fetchFirstChats();
  }, []);

  // Load chat history for selected session
  const handleOpen = async (sessionId) => {
    setSelectedSessionId(sessionId);
    setOpen(true);
    setLoading(true);

    try {
      const response = await API.ChatService.getChatHistory(sessionId);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
      setChatHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Conversations
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto cursor-pointer">
            <thead>
              <tr>
                {/* Customize columns as per your ChatDTO structure */}
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Session ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    First Message
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Timestamp
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Action
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 px-5 text-center text-gray-500"
                  >
                    No conversations found.
                  </td>
                </tr>
              ) : (
                sessions.map(({ sessionId, message, timestamp }) => (
                  <tr key={sessionId}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {sessionId}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {message}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      {new Date(timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Button
                        variant="outlined"
                        color="black"
                        onClick={() => handleOpen(sessionId)}
                      >
                        View Full Chat
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal for chat history */}
      <Dialog
        open={open}
        handler={() => setOpen(false)}
        size="lg"
        className="max-w-3xl"
      >
        <DialogHeader>Conversation Details</DialogHeader>
        <DialogBody divider>
          {loading ? (
            <Typography>Loading chat history...</Typography>
          ) : chatHistory.length === 0 ? (
            <Typography>No messages in this conversation.</Typography>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {chatHistory.map(({ id, message, sender, timestamp }, index) => (
                <div
                  key={id || index}
                  className="p-2 rounded border border-gray-200"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {sender || "Unknown"}{" "}
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(timestamp).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography className="mt-1">{message}</Typography>
                </div>
              ))}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Conversations;
