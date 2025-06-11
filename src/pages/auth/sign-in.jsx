import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/dashboard/account");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check credentials.";
      setErrorMsg(message);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <Typography
              variant="h3"
              className="font-bold text-indigo-700 text-center mb-2"
            >
              Welcome Back
            </Typography>
            <Typography className="text-gray-600 text-center text-sm">
              Enter your credentials to access your account
            </Typography>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Typography
                variant="small"
                className="font-medium text-gray-700 mb-1"
              >
                Email
              </Typography>
              <Input
                size="lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="!border-gray-300 focus:!border-indigo-500"
                required
              />
            </div>

            <div>
              <Typography
                variant="small"
                className="font-medium text-gray-700 mb-1"
              >
                Password
              </Typography>
              <Input
                size="lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="!border-gray-300 focus:!border-indigo-500"
                required
              />
            </div>

            <Checkbox
              label={
                <Typography variant="small" color="gray">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 underline">
                    Terms and Conditions
                  </a>
                </Typography>
              }
            />

            <Button
              type="submit"
              className="mt-2 bg-indigo-600 hover:bg-indigo-700"
              fullWidth
            >
              Sign In
            </Button>

            {errorMsg && (
              <Typography color="red" className="text-center text-sm mt-2">
                {errorMsg}
              </Typography>
            )}

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-1/2 relative max-h-[650px] overflow-hidden rounded-r-3xl">
          <img
            src="/img/chatbot-image.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default SignIn;
