import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import { authorsTableData } from "@/data";

export function Conversations() {
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleOpen = (author) => {
    setSelectedAuthor(author);
    setOpen(true);
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
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr
                      key={name}
                      onClick={() =>
                        handleOpen({ img, name, email, job, online, date })
                      }
                    >
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog open={open} handler={() => setOpen(false)} size="sm">
        <DialogHeader>Conversation Details</DialogHeader>
        <DialogBody divider>
          {selectedAuthor && (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Avatar src={selectedAuthor.img} size="md" variant="rounded" />
                <div>
                  <Typography variant="h6">{selectedAuthor.name}</Typography>
                  <Typography variant="small" color="gray">
                    {selectedAuthor.email}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="small" color="blue-gray">
                  <strong>Function:</strong> {selectedAuthor.job[0]} -{" "}
                  {selectedAuthor.job[1]}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="blue-gray">
                  <strong>Status:</strong>{" "}
                  {selectedAuthor.online ? "Online" : "Offline"}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="blue-gray">
                  <strong>Employed:</strong> {selectedAuthor.date}
                </Typography>
              </div>
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
//Conversations
