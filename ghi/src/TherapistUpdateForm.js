import React, { useEffect, useState } from "react";
import { useToken } from "./Authentication";


function TherapistUpdateForm() {
  const [name, setName] = useState("");
  const [license_information, setLicense_information] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [picture, setPicture] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [about_me, setAbout_me] = useState("");
  const [payment, setPayment] = useState("");
  const [languages, setLanguages] = useState("");
  const [account_id, setAccount_id] = useState("");
  const { token, login } = useToken();
  const [therapy_id, setTherapy_id] = useState("");


useEffect(() => {
  async function get_by_account_id() {
    const response = await fetch(
      `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapistacc?account_id=${account_id}`
    );
    var therapistdata = await response.json();
    setName(therapistdata.name);
    setLicense_information(therapistdata.license_information);
    setState(therapistdata.state);
    setZipcode(therapistdata.zipcode);
    setPicture(therapistdata.picture);
    setSpecialties(therapistdata.specialties);
    setAbout_me(therapistdata.about_me);
    setPayment(therapistdata.payment);
    setLanguages(therapistdata.languages);
    setTherapy_id(therapistdata.id);
  }

    get_by_account_id();

}, []);





//   async function YaMom(){
//   const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client?account_id=${account_id}`);
//   var testData = await response.json();
//   if (response.ok){console.log(testData)}
// }

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    console.log(info);
    setAccount_id(info.account.id);
  }

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleLicense_informationChange = (event) => {
    const value = event.target.value;
    setLicense_information(value);
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value;
    setZipcode(value);
  };

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value);
  };

  const handleSpecialtiesChange = (event) => {
    const value = event.target.value;
    setSpecialties(value);
  };

  const handleAbout_meChange = (event) => {
    const value = event.target.value;
    setAbout_me(value);
  };

  const handlePaymentChange = (event) => {
    const value = event.target.value;
    setPayment(value);
  };

  const handleLanguagesChange = (event) => {
    const value = event.target.value;
    setLanguages(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    console.log(data);
    data.name = name;
    data.license_information = license_information;
    data.state = state;
    data.zipcode = zipcode;
    data.picture = picture;
    data.specialties = specialties;
    data.about_me = about_me;
    data.payment = payment;
    data.languages = languages;
    data.account_id = account_id;

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}/therapy/${therapy_id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newTherapist = await response.json();
      console.log(newTherapist);

      setName("");
      setLicense_information("");
      setState("");
      setZipcode("");
      setPicture("");
      setSpecialties("");
      setAbout_me("");
      setPayment("");
      setLanguages("");
      setTherapy_id("");
    }
  };

  useEffect(() => {
    if (token) {
      parseJwt(token);
    }
  }, [token],
);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Therapist</h1>
          <form onSubmit={handleSubmit} id="create-therapist-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleLicense_informationChange}
                value={license_information}
                placeholder="license_information"
                required
                type="text"
                name="license_information"
                id="license_information"
                className="form-control"
              />
              <label htmlFor="license_information">License Information</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleStateChange}
                value={state}
                placeholder="state"
                required
                type="text"
                name="state"
                id="state"
                className="form-control"
              />
              <label htmlFor="state">State</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleZipcodeChange}
                value={zipcode}
                placeholder="zipcode"
                required
                type="text"
                name="zipcode"
                id="zipcode"
                className="form-control"
              />
              <label htmlFor="zipcode">Zipcode</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={picture}
                placeholder="picture"
                required
                type="text"
                name="picture"
                id="picture"
                className="form-control"
              />
              <label htmlFor="picture">Picture</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleSpecialtiesChange}
                value={specialties}
                placeholder="specialties"
                required
                type="text"
                name="specialties"
                id="specialties"
                className="form-control"
              />
              <label htmlFor="specialties">Specialties</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleAbout_meChange}
                value={about_me}
                placeholder="about_me"
                required
                type="text"
                name="about_me"
                id="about_me"
                className="form-control"
              />
              <label htmlFor="about_me">About Me</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePaymentChange}
                value={payment}
                placeholder="payment"
                required
                type="text"
                name="payment"
                id="payment"
                className="form-control"
              />
              <label htmlFor="payment">Payment</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleLanguagesChange}
                value={languages}
                placeholder="languages"
                required
                type="text"
                name="languages"
                id="languages"
                className="form-control"
              />
              <label htmlFor="languages">Languages</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TherapistUpdateForm;