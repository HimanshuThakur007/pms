import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { useAuthContext } from "../../core/common/AuthContext";

const ProfileCard = () => {
  const { state } = useAuthContext();
  const { UserID, Name, EMail, Mobile,Active,Url,Role } = state.decryptedData;

  return (
    <div className="card card1 p-4" style={{ width: "300px" }}>
    <div className="img rounded-circle mx-auto">
      <ImageWithBasePath src={Url || "assets/img/admin.jpg"} alt="Profile" />
    </div>
    <h5 className="mt-3 text-center">{Name}</h5>
    <h6 className="mt-1 text-center text-primary">{Role}</h6>
    <h6 className="mt-1 text-center">{EMail}</h6>
        <p className="mt-3 text-center">Welcome to your profile! Here, you can find your essential account details, including your registered email, 
            contact number, and account status. Keep your information up to date to ensure a smooth experience.</p>
    <div className="mt-3">
      {/* <p className="d-flex justify-content-between">
        <strong>Email:</strong> <strong>{EMail}</strong>
      </p> */}
      <p className="d-flex justify-content-between">
        <strong>Mobile:</strong> <strong>{Mobile}</strong>
      </p>
      <p className="d-flex justify-content-between">
        <strong>Account:</strong> <strong>{Active === 1 ? "Active" : "DeActive"}</strong>
      </p>
    </div>
  </div>
  );
};

export default ProfileCard;
