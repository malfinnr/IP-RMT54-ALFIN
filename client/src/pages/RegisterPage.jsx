import { useState } from "react";
import logo from "../assets/Image.png";
import { Link, useNavigate } from "react-router-dom";
import apiHelps from "../helpers/ApiHelps";
import { setAccessToken, setUserLogin } from "../helpers/CredentialToken";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const onSubmitRegister = async (event) => {
    try {
      event.preventDefault();
      const response = await apiHelps.post("/login", {
        email: email,
        password: password,
      });
      setAccessToken(response.data.accessToken);
      setUserLogin({
        email: response.data.email,
        fullName: response.data.fullName,
        userName: response.data.userName,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
      <div className="mx-auto w-full max-w-md">
        <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 mx-auto w-full max-w-[480px]">
        <div className="bg-white py-12 shadow rounded-lg px-12">
          <form onSubmit={onSubmitRegister} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  id="userName"
                  name="userName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <input
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  id="gender"
                  name="gender"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-brown px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Have an account?{" "}
          <Link
            className="inline-flex text-sm font-semi-bold text-dark-brown"
            to={"/login"}
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
