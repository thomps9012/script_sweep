import React, { useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import styles from "../index.module.css";
import styles_two from "../../components/HomepageFeatures/styles.module.css";
const SecuritySvg = require("@site/static/img/undraw_security.svg").default;
const api_url = "https://script-sweep-loele2hdfa-uc.a.run.app/api";

function APIKeyRequest() {
  const [info_link, setInfoLink] = useState("");
  const [api_info, setAPIInfo] = useState("");
  const [api_key, setAPIKey] = useState("");
  const [submitText, setSubmitText] = useState("Request Key");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    const { email, first_name, last_name } = values;
    const email_regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
    const name_regex = /^([A-Za-z]('[A-Za-z])?[a-z][A-Za-z]{0,2}[a-z]*)/g;
    const email_match = email.match(email_regex);
    const first_name_match = first_name.match(name_regex);
    const last_name_match = last_name.match(name_regex);
    if (!email || !email_match) {
      document
        .getElementById("email_validation")
        .setAttribute("class", "invalid_email");
    } else {
      document
        .getElementById("email_validation")
        .setAttribute("class", "valid_email");
    }
    if (!first_name || !first_name_match) {
      document
        .getElementById("first_name_validation")
        .setAttribute("class", "invalid_first_name");
    } else {
      document
        .getElementById("first_name_validation")
        .setAttribute("class", "valid_first_name");
    }
    if (!last_name || !last_name_match) {
      document
        .getElementById("last_name_validation")
        .setAttribute("class", "invalid_last_name");
    } else {
      document
        .getElementById("last_name_validation")
        .setAttribute("class", "valid_last_name");
    }
    if (
      !email ||
      !email_match ||
      !first_name ||
      !first_name_match ||
      !last_name ||
      !last_name_match
    ) {
      return;
    } else {
      const url = api_url + "/auth/api_key";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `{"email":"${email}","first_name":"${first_name}","last_name":"${last_name}"}`,
      };
      try {
        const res = await fetch(url, options).then((response) =>
          response.json()
        );
        const api_key_info_link = document.getElementById("info-redirect");
        setAPIInfo(res.message);
        console.dir(res)
        if (res.code != 201) {
          setInfoLink(res.data);
          api_key_info_link.setAttribute(
            "class",
            "button button--primary button--lg"
          );
          api_key_info_link.innerText = "Learn How to Resolve 	💡";
          setSubmitText("Try Again");
        } else {
          setAPIKey(res.data);
          api_key_info_link.setAttribute("class", "hide");
          sessionStorage.setItem("email", email);
          setInfoLink("/script_sweep/playground/jwt");
          api_key_info_link.setAttribute(
            "class",
            "button button--warning button--lg"
          );
          api_key_info_link.innerText = "Exchange for Auth Token 💱";
          document.getElementById("submit-btn").setAttribute("class", "hide");
          return;
        }
      } catch (err) {
        // handle errors
        console.error(err);
      }
    }
  };
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      id="api_key_request"
    >
      <div className="container">
        <h1 className="hero__title">API Key Request</h1>
        <SecuritySvg className={styles_two.featureSvg} role="img" />
        <div className={styles.buttons}>
          <form className="custom-requests" onSubmit={handleSignUp}>
            <label>Email</label>
            <input name="email" />
            <span id="email_validation" className="valid_email">
              Please enter a valid email
            </span>
            <label>First Name</label>
            <input name="first_name" />
            <span id="first_name_validation" className="valid_first_name">
              Please enter a valid first name
            </span>
            <label>Last Name</label>
            <input name="last_name" />
            <span id="last_name_validation" className="valid_last_name">
              Please enter a valid last name
            </span>
            <div id="auth-status">
              <p id="api-key-info">{api_info}</p>
              <p id="api-key-text">{api_key}</p>
              <a id="info-redirect" href={info_link}></a>
            </div>
            <button className="button button--warning button--lg" type="submit" id="submit-btn">
              {submitText} 🗝️
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default function APIKey() {
  return (
    <Layout
      title="API Key Request"
      description="A page where users can generate an API Key in order to begin making requests to the script_sweep API Endpoint."
    >
      <main>
        <APIKeyRequest />
      </main>
    </Layout>
  );
}
