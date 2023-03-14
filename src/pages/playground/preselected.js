import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import styles from "../index.module.css";
import styles_two from "../../components/HomepageFeatures/styles.module.css";
const ScientistSVG = require("@site/static/img/undraw_scientist.svg").default;
const api_url = "https://script-sweep-loele2hdfa-uc.a.run.app/api";

function EndpointTest({ jwt, email }) {
  const [url_endpoint, setEndpoint] = useState("");
  const [fetch_options, setFetchOpts] = useState("");
  const [request_content, setRequestContent] = useState("");
  const handleChange = (e) => {
    const endpoint = e.target.value;
    document.getElementById("response").setAttribute("class", "hide");
    if (endpoint != "") {
      document.getElementById("curl").setAttribute("class", "curl");
    } else {
      document.getElementById("curl").setAttribute("class", "hide");
    }
    setEndpoint(api_url + endpoint);
    switch (endpoint) {
      case "/scripts":
        setFetchOpts({
          method: "GET",
          headers: {
            email: email,
            fields: "id,name, year",
            limit: "5",
            order_by: "year",
            order_direction: "desc",
            token: jwt,
          },
        });
        setRequestContent(
          `curl --request GET \n--url ${api_url}/scripts \n--header 'email:${email}' \n--header 'fields: id, name, year' \n--header 'limit: 5' \n--header 'order_by: year' \n--header 'order_direction: desc' \n--header 'token: ${jwt}'`
        );
        break;
      case "/scripts/39":
        setFetchOpts({
          method: "GET",
          headers: {
            email: email,
            token: jwt,
          },
        });
        setRequestContent(
          `curl --request GET \n--url ${api_url}/scripts/39 \n--header 'email:${email}' \n--header 'token: ${jwt}'`
        );
        break;
      case "/filter":
        setFetchOpts({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: email,
            token: jwt,
          },
        });
        setRequestContent(
          `curl --request GET \n--url ${api_url}/filter \n--header 'email: ${email}' \n--header 'token: ${jwt}' \n--data '{
            "text": "hello goodbye в 英国的 اقثقنح this is a test", "script_id": 61
          }`
        );
        break;
      case "/classify":
        setFetchOpts({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: email,
            token: jwt,
          },
          body: `{"text": "hello goodbye в 英国的 اقثقنح"}`,
        });
        setRequestContent(`curl --request POST \n--url ${api_url}/classify \n--header 'Content-Type: application/json' \n--header 'by: word' \n--header 'email: ${email}' \n--header 'token: ${jwt}' \n--data '{
              "text": "hello goodbye в 英国的 اقثقنح"
          }'`);
        break;
      case "/organize":
        setFetchOpts({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: email,
            token: jwt,
          },
          body: `{"text": "hello goodbye в 英国的 اقثقنح"}`,
        });
        setRequestContent(`curl --request POST \n--url ${api_url}/organize \n--header 'Content-Type: application/json' \n--header 'by: word' \n--header 'email: ${email}' \n--header 'token: ${jwt}' \n--data '{
              "text": "hello goodbye в 英国的 اقثقنح"
          }'`);
        break;
    }
  };
  const handleRequest = async (e) => {
    e.preventDefault();
    document.getElementById("loader").setAttribute("class", "lds-ellipsis");
    document.getElementById("response").setAttribute("class", "response");
    document.getElementById("response-res").setAttribute("class", "hide");
    try {
      const data = await fetch(url_endpoint, fetch_options).then((res) =>
        res.json()
      );
      if (data) {
        document.getElementById("loader").setAttribute("class", "hide");
        document.getElementById("response-res").setAttribute("class", "show");
        const brace = {
          brace: 0,
        };
        document.querySelector("#response-res").innerHTML = JSON.stringify(
          data
        ).replace(/({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g, (m, p1) => {
          const returnFunction = () =>
            `<div style="text-indent: ${brace["brace"] * 20}px;">${p1}</div>`;
          let returnString = 0;
          if (p1.lastIndexOf("{") === p1.length - 1) {
            returnString = returnFunction();
            brace["brace"] += 1;
          } else if (p1.indexOf("}") === 0) {
            brace["brace"] -= 1;
            returnString = returnFunction();
          } else {
            returnString = returnFunction();
          }
          return returnString;
        });
      } else {
        document.getElementById("response").setAttribute("class", "hide");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      id="sample_request"
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">Curated Requests</h1>
        <ScientistSVG className={styles_two.featureSvg} role="img" />
        <div className={styles.buttons}>
          <form className="custom-requests" onSubmit={handleRequest}>
            <label>Select a Request Option</label>
            <select onChange={handleChange} id="request_select">
              <option value=""></option>
              <option value="/scripts">
                View Select Info for 5 Different Scripts
              </option>
              <option value="/scripts/39">Get a Script with ID of 39</option>
              <option value="/filter">
                Filter Text Input Based on It's Script
              </option>
              <option value="/classify">Classify Text Input</option>
              <option value="/organize">Organize Text Input</option>
            </select>
            <div className="hide" id="curl">
              <h1>Actual cURL Request</h1>
              <h3>With Your Authorization Credentials</h3>
              <pre>
                <code>{request_content}</code>
              </pre>
              <button
                className="button button--success button--lg"
                type="submit"
                id="send-request-btn"
              >
                Send Request 🚀
              </button>
            </div>
            <div className="hide" id="response">
              <h1>Actual Server Response Body</h1>
              <div id="loader" class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <pre id="response-res" className="hide"></pre>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default function PreselectedRequests() {
  const [email, setEmail] = useState("");
  const [jwt, setJWT] = useState("");
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
    setJWT(sessionStorage.getItem("token"));
  }, []);
  const endpointProps = { jwt, email };
  const clearCredentials = () => {
    sessionStorage.clear();
    window.location.assign("/script_sweep");
  };
  return (
    <Layout
      title="Preselected Requests"
      description="A collection of preselected and formatted requests to the script_sweep API endpoint complete with user credentials."
    >
      <EndpointTest {...endpointProps} />
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
