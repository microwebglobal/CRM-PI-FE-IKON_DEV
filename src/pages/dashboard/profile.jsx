import apiService from "@/utils/apiService";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await apiService.authService.getUserProfile();
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="blue-gray">
          Loading profile...
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="max-w-md w-full shadow-lg rounded-lg border border-gray-200">
        <CardBody className="p-6">
          <div className="flex flex-col items-center">
            <Avatar
              src="/img/user_img.png"
              alt="bruce-mars"
              size="xl"
              variant="rounded"
              className="rounded-lg shadow-lg shadow-blue-gray-500/40 mb-10"
            />

            <Typography variant="h4" color="blue-gray" className="mb-1">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography
              variant="small"
              className="text-blue-500 font-semibold mb-4 uppercase"
            >
              {profileData.role}
            </Typography>

            <div className="w-full space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{profileData.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Approval Status:</span>
                <span>{profileData.approvalStatus}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Member Since:</span>
                <span>
                  {new Date(profileData.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>
                  {new Date(profileData.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
