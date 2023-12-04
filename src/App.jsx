import React, { useState } from "react";
import IMask from "imask";
import axios from "axios";

export default function App() {
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [responseData, setResponseData] = useState([]);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (e) => {
    setResponseData([]);
    if (!isValidEmail(e.target.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError(null);
    }

    setEmail(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setResponseData([]);
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setNumberError("Number should contain 6 digits");
    } else {
      setNumberError(null);
    }

    const mask = IMask(document.getElementById("masked"), {
      mask: "00-00-00",
    });
    setNumber(mask.value.split("-").join(""));
  };

  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (number && number.length < 6) {
      setNumberError("Number should contain 6 digits!");
      return;
    }
    if (emailError) {
      setEmailError("Please write valid email");
      return;
    }

    source && source.cancel("Last request was canceled");
    source = axios.CancelToken.source();

    axios
      .post(
        "http://localhost:3000/",
        { email: email, number: number },
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        if (response.data.length === 0) {
          setEmailError("No users was found");
        }
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => handleChangeEmail(e)}
          />
          <input
            id="masked"
            placeholder="number"
            onChange={(e) => handleChangeNumber(e)}
            type="text"
          />
        </div>
        <div>
          <button onClick={(event) => handleSubmit(event)}>Submit</button>
        </div>
      </form>
      {emailError && <h2 style={{ color: "red" }}>{emailError}</h2>}
      {numberError && <h2 style={{ color: "red" }}>{numberError}</h2>}
      <div>
        {responseData.map((el, key) => (
          <div key={key}>
            email: {el.email}, number: {el.number}
          </div>
        ))}
      </div>
    </>
  );
}
