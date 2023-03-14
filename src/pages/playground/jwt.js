import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import styles from "../index.module.css";
import styles_two from "../../components/HomepageFeatures/styles.module.css";
import Link from "@docusaurus/Link";
const SecuritySvg = require("@site/static/img/undraw_security.svg").default;
const AstronautSvg = require("@site/static/img/undraw_astronaut.svg").default;
const api_url = "https://script-sweep-loele2hdfa-uc.a.run.app/api";


function RequestOptions() {
  return (
    <header
      id="landing_page"
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">Playground Options</h1>
        <AstronautSvg className={styles_two.featureSvg} role="img" />
        <Link
          className="button button--primary button--lg"
          to="/playground/preselected"
        >
          <h2>📚 Curated </h2>
        </Link>
        <h3>or</h3>
        <Link
          className="button button--primary button--lg"
          to="/playground/custom"
        >
          <h2>🧪 Customized</h2>
        </Link>
      </div>
    </header>
  );
}

export default function JWTExchange() {
  const [info_link, setInfoLink] = useState("");
  const [api_info, setAPIInfo] = useState("");
  const [submitText, setSubmitText] = useState("Exchange for Token");
  const handleExchange = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    const { email, api_key } = values;
    const email_regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
    const email_match = email.match(email_regex);
    if (!email || !email_match) {
      document
        .getElementById("email_validation")
        .setAttribute("class", "invalid_email");
    } else {
      document
        .getElementById("email_validation")
        .setAttribute("class", "valid_email");
    }
    if (!api_key || api_key == "") {
      document
        .getElementById("api_key_validation")
        .setAttribute("class", "invalid_api_key");
    } else {
      document
        .getElementById("api_key_validation")
        .setAttribute("class", "valid_api_key");
    }
    if (!email || !email_match || !api_key || api_key == "") {
      return;
    } else {
      const url = api_url + "/auth/jwt";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, api_key: api_key }),
      };
      try {
        const response = await fetch(url, options).then((res) => res.json());
        if (response.code == 200) {
          sessionStorage.setItem("token", response.data);
          sessionStorage.setItem("email", email);
          document.getElementById("key_exchange").setAttribute("class", "hide");
          document
            .getElementById("request_options")
            .setAttribute("class", "show");
        } else {
          const api_key_info_link = document.getElementById("info-redirect");
          setAPIInfo(response.message);
          setInfoLink(response.data);
          api_key_info_link.setAttribute(
            "class",
            "button button--info button--lg"
          );
          api_key_info_link.innerText = "Learn How to Resolve";
          setSubmitText("Try Again");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const clearCredentials = () => {
    sessionStorage.clear();
    window.location.assign("/script_sweep");
  };
  return (
    <Layout
      title="JWT Exchange"
      description="A place for a user to exchange an API Key for a JSON Web Token to begin making authenticated requests in the request playground."
    >
      <header
        className={clsx("hero hero--primary", styles.heroBanner)}
        id="key_exchange"
      >
        <div className="container">
          <h1 className="hero__title">Exchange API Key for JWT</h1>
          <SecuritySvg className={styles_two.featureSvg} role="img" />
          <div className={styles.buttons}>
            <form className="custom-requests" onSubmit={handleExchange}>
              <label>Email</label>
              <input name="email" />
              <span id="email_validation" className="valid_email">
                Please enter a valid email
              </span>
              <label>API Key</label>
              <input name="api_key" />
              <span id="api_key_validation" className="valid_api_key">
                Please enter a valid API key
              </span>
              <div id="auth-status">
                <h2 id="api-key-info">{api_info}</h2>
                <a id="info-redirect" target="_blank" href={info_link}></a>
              </div>
              <button
                className="button button--warning button--lg"
                type="submit"
              >
                {submitText}
                💱
              </button>
            </form>
          </div>
        </div>
      </header>
      <div id="request_options" className="hide">
        <RequestOptions />
      </div>
      <div
        id="footer"
        className={clsx("hero hero--primary", styles.heroBanner)}
      >
        <button
          onClick={clearCredentials}
          className="button button--primary button--lg"
          id="send-request-btn"
        >
          ❌ Clear Any Saved Credentials 🐱‍💻
        </button>
      </div>
    </Layout>
  );
}
