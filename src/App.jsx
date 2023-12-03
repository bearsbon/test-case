import React, { useState } from "react";
import IMask from "imask";
import axios from "axios";

export default function App() {
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(e.target.value);
  };

  const handleChangeNumber = (e) => {
    if (e.target.value.length < 8) {
      setError("Number should contain 6 digits");
    } else {
      setError(null);
    }

    const mask = IMask(document.getElementById("masked"), {
      mask: "00-00-00",
    });
    setNumber(mask.value);
  };

  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (error || number.length < 8) {
      setError("Please fill all inputs");
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input type="email" onChange={(e) => handleChangeEmail(e)} />
          <input
            id="masked"
            onChange={(e) => handleChangeNumber(e)}
            type="text"
          />
        </div>
        <div>
          <button onClick={(event) => handleSubmit(event)}>Submit</button>
        </div>
      </form>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </>
  );
}
