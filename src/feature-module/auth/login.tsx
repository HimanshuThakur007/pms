import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { encryptCBC } from "../../core/common/CryptoUtils";
import CryptoJS from "crypto-js";
import useFetch from "../../core/Hooks/useFetch";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { RootState } from "../../core/data/redux/store";
import { loginSuccess, setLoading } from "../../core/data/redux/authSlice";
import Loader from "../../core/common/loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const yearRange = `${previousYear} - ${currentYear}`;
  const route = all_routes;
 
  const secretKey: any = process.env.REACT_APP_SECRET_KEY;
  const [key] = useState(CryptoJS.enc.Utf8.parse(secretKey));
  const [iv] = useState(CryptoJS.lib.WordArray.create());
  const [encryptData, setEncryptData] = useState("");

  const [inputValue, setInputValue] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

  let callFetch = useFetch();

  const handleInputField = (e: any) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const { username, password } = inputValue;

  const jsonData: any = {
    UType: 1,
    UName: username,
    PWD: password,
  };

  // Encrypt JSON data for API request
  const encryptAndSetCiphertext = async () => {
    const encrypted = encryptCBC(JSON.stringify(jsonData), key, iv);
    await setEncryptData(encrypted);
  };

  useEffect(() => {
    encryptAndSetCiphertext();
  }, [jsonData]);
  // console.log("data from login",encryptData)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let url = `/api/UserAuthentication`;
    setLoading(true)
    try {
      const bodyEnc = { RequestBodyEncrypted: encryptData };
      // console.log("data from login",encryptData)
      const { got } = await callFetch(url, "POST", bodyEnc);

      if (got.msg === "Valid User" && got.status === 1) {
        const userData = JSON.stringify(got.responseBodyEncrypted);
        sessionStorage.setItem("encryptedData", userData);
        navigate(route.dealsDashboard);
      } else {
        alert("Invalid userId or password");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false)
      // dispatch(setLoading(false));
    }
  };
  return (
    <div className="account-content">
      <Loader isSaving={loading} />
      <div className="col-12 d-flex">
        {/* <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop"> */}
        <div className="col-lg-6 col-sm-12 col-6 d-flex align-items-center justify-content-center flex-wrap vh-100 p-4 bg-backdrop">
          <form className="flex-fill" onSubmit={handleSubmit}>
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                <ImageWithBasePath
                  src="logo1.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
              <div className="mb-4">
                <h4>Sign In</h4>
                {/* <p>Access the ZECO panel using your email/mobile No. and passcode.</p> */}
                <p>Access Annual PMS {previousYear} and Goal setting {currentYear}</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email Address/Mobile No.</label>
                <div className="position-relative">
                  <input
                    name="username"
                    value={username}
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    onChange={handleInputField}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                {/* <div className="pass-group">
                  <input
                    name="password"
                    type="password"
                    className="pass-input form-control"
                    value={password}
                    onChange={handleInputField}
                    required
                  />
                </div> */}
                <div className="icon-form-end">
                  <span className="form-icon" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`ti ${showPassword ? "ti-eye" : "ti-eye-off"}`} />
                  </span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={handleInputField}
                  />
                </div>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <div className="text-center">
                <p className="fw-medium text-gray">Copyright ©{new Date().getFullYear()} - ZECO. Developed By Excellent Software's</p>
                <p className="fw-medium text-gray"></p>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6 vh-100 account-bg-01"></div>
      </div>
    </div>
  );
};

export default Login;
