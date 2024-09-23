import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import useFetch from "../../core/Hooks/useFetch";

const Login = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  let callFetch = useFetch()

  const handleInputField = (e:any) => {
    const { name, value } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { username, password } = inputValue;
  let user = username.slice(0, 10);

  // console.log('calling')
  // const handleSubmit = (e:any) => {
  //   e.preventDefault();
  //   const urlStr = `http://${baseUrl}:${port}/api/Authentication?UserName=${user}&Pwd=${password}&ProjType=1`;
  //    console.log('url', urlStr)
  //   try {
  //     setLoading(true);
  //     const h = new Headers();
  //     h.append("Accept", "application/json");
  //     h.append("CompCode", "ESCRMDB");
  //     h.append("FYear", "0");

  //     const myRequest = new Request(urlStr, {
  //       method: "GET",
  //       headers: h,
  //       mode: "cors",
  //       cache: "default",
  //     });

  //     fetch(myRequest)
  //       .then((response) => response.json())

  //       .then((json) => {
  //         const resultData = json;
  //         // console.log('loginDataaaaa',resultData)
  //         const loginData = resultData;
  //         if (loginData.result == 1) {
  //           let UserId = loginData.code;
  //           let AdminType = loginData.admin;
  //           let TokenId = loginData.token;
  //           let UserType = loginData.ut;
  //           let Admin = loginData.name;
  //           let Type = loginData.utName;
  //           let Email = loginData.email;
  //           let department = loginData.department;
  //           let depName = loginData.departmentName;
  //           let ProjType = loginData.ProjType;
  //           // StoreData.push({UserId,UserType,Admin,TokenId,department,depName})
  //           sessionStorage.setItem(
  //             "userData",
  //             JSON.stringify({
  //               UserId,
  //               UserType,
  //               Admin,
  //               TokenId,
  //               Type,
  //               Email,
  //               department,
  //               depName,
  //               ProjType,
  //               AdminType,
  //             })
  //           );
  //           setLoading(false);

  //           // history.push("/");
  //           //  window.location.reload()
  //         } else {
  //           alert(loginData.msg);
  //         }
  //         setLoading(false);
  //         // setSerieslist(json.data)
  //       });
  //   } catch (err) {
  //     alert(err);
  //     setLoading(false);
  //     //  setLoading(false)
  //   }
  // };

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    let url = `/api/Authentication?UserName=${user}&Pwd=${password}&ProjType=1`;
    console.log(url,"url")
      try {
        setLoading(true)
          const { res, got } = await callFetch(url, 'GET');
          console.log(got,'api')
          const loginData = got
          // Handle response data
          if (loginData.result == 1) {
            let UserId = loginData.code;
            let AdminType = loginData.admin;
            let TokenId = loginData.token;
            let UserType = loginData.ut;
            let Admin = loginData.name;
            let Type = loginData.utName;
            let Email = loginData.email;
            let department = loginData.department;
            let depName = loginData.departmentName;
            let ProjType = loginData.ProjType;
            // StoreData.push({UserId,UserType,Admin,TokenId,department,depName})
            sessionStorage.setItem(
              "userData",
              JSON.stringify({
                UserId,
                UserType,
                Admin,
                TokenId,
                Type,
                Email,
                department,
                depName,
                ProjType,
                AdminType,
              })
            );
            setLoading(false);
             navigate(route.dealsDashboard)
            // history.push("/");
            //  window.location.reload()
          } else {
            alert(loginData.msg);
          }
          setLoading(false)
      } catch (error) {
          // Handle errors
          console.error('Error:', error);
          // showToastError(error)
          setLoading(false)
      }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);
  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-01">
        <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
          <form className="flex-fill" onSubmit={handleSubmit}>
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
              <div className="mb-4">
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your email and passcode.</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email Address</label>
                <div className="position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-mail"></i>
                  </span>
                  <input  name="username"
                      value={user}
                      className="form-control"
                      autoComplete="off"
                      type="number"
                      min="0"
                      onChange={handleInputField}
                      required />
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <div className="pass-group">
                  <input
                  name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    className="pass-input form-control"
                    value={password}
                    onChange={handleInputField}
                    required
                  />
                  <span
                    className={`ti toggle-password ${
                      isPasswordVisible ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="form-check form-check-md d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-md"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkebox-md">
                    Remember Me
                  </label>
                </div>
                <div className="text-end">
                  <Link
                    to={route.forgotPassword}
                    className="text-primary fw-medium link-hover"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <button
                  // to={route.dealsDashboard}
                  
                  className="btn btn-primary w-100"
                >
                  Sign In
                </button>
              </div>
              <div className="mb-3">
                <h6>
                  New on our platform?
                  <Link to={route.register} className="text-purple link-hover">
                    {" "}
                    Create an account
                  </Link>
                </h6>
              </div>
              <div className="form-set-login or-text mb-3">
                <h4>OR</h4>
              </div>
              <>
                <div className="d-flex align-items-center justify-content-center flex-wrap mb-3">
                  <div className="text-center me-2 flex-fill">
                    <Link
                      to="#"
                      className="br-10 p-2 px-4 btn bg-pending  d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid m-1"
                        src="assets/img/icons/facebook-logo.svg"
                        alt="Facebook"
                      />
                    </Link>
                  </div>
                  <div className="text-center me-2 flex-fill">
                    <Link
                      to="#"
                      className="br-10 p-2 px-4 btn bg-white d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid  m-1"
                        src="assets/img/icons/google-logo.svg"
                        alt="Facebook"
                      />
                    </Link>
                  </div>
                  <div className="text-center flex-fill">
                    <Link
                      to="#"
                      className="bg-dark br-10 p-2 px-4 btn btn-dark d-flex align-items-center justify-content-center"
                    >
                      <ImageWithBasePath
                        className="img-fluid  m-1"
                        src="assets/img/icons/apple-logo.svg"
                        alt="Apple"
                      />
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
                </div>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
