import React, { useState, useEffect } from "react";
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
  const [text_action, setTextAction] = useState("");
  const handleChange = (e) => {
    const endpoint = e.target.value;
    document.getElementById("response").setAttribute("class", "hide");
    document.getElementById("curl").setAttribute("class", "hide");
    document.getElementById("script_filters").setAttribute("class", "hide");
    document.getElementById("text_input").setAttribute("class", "hide");
    document.getElementById("id_input").setAttribute("class", "hide");
    document.getElementById("text_string").setAttribute("value", "");
    setEndpoint(endpoint);
    switch (endpoint) {
      case "/scripts":
        document
          .getElementById("script_filters")
          .setAttribute("class", "show_script_filters");
        setEndpoint(api_url + endpoint);
        break;
      case "/scripts/:id":
        document
          .getElementById("id_input")
          .setAttribute("class", "show_id_input");
        break;
      case "/classify":
        setTextAction("Classify");
        document
          .getElementById("text_input")
          .setAttribute("class", "show_text_input");
        setEndpoint(api_url + endpoint);
        break;
      case "/organize":
        setTextAction("Organize");
        document
          .getElementById("text_input")
          .setAttribute("class", "show_text_input");
        setEndpoint(api_url + endpoint);
        break;
      case "/filter":
        setTextAction("Filter");
        document
          .getElementById("text_input")
          .setAttribute("class", "show_text_input");
        document
          .getElementById("id_input")
          .setAttribute("class", "show_id_input");
        setEndpoint(api_url + endpoint);
        break;
    }
  };
  const formatFilters = (e) => {
    e.preventDefault();
    const form = document.getElementById("script_filters");
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    let living_header;
    if (values["living"] != "on" || !values["living"]) {
      living_header = true;
    } else {
      living_header = false;
    }
    setFetchOpts({
      method: "GET",
      headers: {
        "email": email,
        "fields": values["fields"],
        "limit": values["limit"],
        "continent": values["continent"],
        "direction": values["direction"],
        "living": living_header,
        "max_year": values["max_year"],
        "min_year": values["min_year"],
        "Authorization": `Bearer ${jwt}`,
      },
    });
    setRequestContent(
      `curl --request GET \n--url ${url_endpoint} \n${
        values["continent"] != ""
          ? `--header 'continent: ${values["continent"]}' \n`
          : ""
      }${
        values["direction"] != ""
          ? `--header 'direction: ${values["direction"]}' \n`
          : ""
      }${`--header 'fields: ${values["fields"]}' \n`}${
        values["limit"] != "" ? `--header 'limit: ${values["limit"]}' \n` : ""
      }--header 'living: ${living_header}' \n${
        values["max_year"] != ""
          ? `--header 'max_year: ${values["max_year"]}' \n`
          : ""
      }${
        values["min_year"] != ""
          ? `--header 'min_year: ${values["min_year"]}' \n`
          : ""
      }--header 'Authorization: Bearer ${jwt}'\n
      --header 'email: ${email}'`
    );
    document.getElementById("curl").setAttribute("class", "show");
  };
  const formatID = (e) => {
    if (text_action != "Filter") {
      setFetchOpts({
        method: "GET",
        headers: {
          email: email,
          Authorization: `Bearer ${jwt}`,
        },
      });
      setEndpoint(`${api_url}/scripts/${e.target.value}`);
      setRequestContent(
        `curl --request GET \n--url ${api_url}/scripts/${e.target.value} \n--header 'email:${email}' \n--header 'Authorization: Bearer ${jwt}'`
      );
    } else {
      const text_to_filter = document.getElementById("text_string").value;
      setFetchOpts({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: email,
          Authorization: `Bearer ${jwt}`,
        },
        body: `{"text": "${text_to_filter}", "script_id": ${parseInt(
          e.target.value
        )}}`,
      });
      setRequestContent(`curl --request POST \n--url ${url_endpoint} \n--header 'Content-Type: application/json' \n--header 'email: ${email}' \n--header 'Authorization: Bearer ${jwt}' \n--data '{
        "text": "${text_to_filter}", \n"script_id": ${parseInt(e.target.value)}
    }'`);
    }
    document.getElementById("curl").setAttribute("class", "show");
  };
  const formatText = (e) => {
    if (text_action != "Filter") {
      setFetchOpts({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: email,
          Authorization: `Bearer ${jwt}`,
          by: "word",
        },
        body: `{"text": "${e.target.value}"}`,
      });
      setRequestContent(`curl --request POST \n--url ${url_endpoint} \n--header 'Content-Type: application/json' \n--header 'by: word' \n--header 'email: ${email}' \n--header 'Authorization: Bearer ${jwt}' \n--data '{
          "text": "${e.target.value}"}
        }'`);
    } else {
      const script_id = document.getElementById("script_id").value;
      setFetchOpts({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: email,
          Authorization: `Bearer ${jwt}`,
        },
        body: `{"text": "${e.target.value}", "script_id": ${parseInt(
          script_id
        )}}`,
      });
      setRequestContent(`curl --request POST \n--url ${url_endpoint} \n--header 'Content-Type: application/json' \n--header 'email: ${email}' \n--header 'Authorization: Bearer ${jwt}' \n--data '{
          "text": "${e.target.value}", "script_id": ${parseInt(script_id)}
        }'`);
    }
    document.getElementById("curl").setAttribute("class", "show");
  };
  const handleRequest = async (e) => {
    e.preventDefault();
    document.getElementById("loader").setAttribute("class", "lds-ellipsis");
    document.getElementById("response").setAttribute("class", "response");
    document.getElementById("response-res").setAttribute("class", "hide");

    try {
      const res = await fetch(url_endpoint, fetch_options).then((res) =>
        res.json()
      );
      if (res) {
        document.getElementById("loader").setAttribute("class", "hide");
        document.getElementById("response-res").setAttribute("class", "show");
        const brace = {
          brace: 0,
        };
        document.querySelector("#response-res").innerHTML = JSON.stringify(
          res
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
        <ScientistSVG className={styles_two.featureSvg} role="img" />
        <h1 className="hero__title">Customized Requests</h1>
        <div className={styles.buttons}>
          <div className="custom-requests">
            <label>Select an Endpoint</label>
            <select onChange={handleChange} id="request_select">
              <option value=""></option>
              <option value="/scripts">View & Filter Scripts</option>
              <option value="/scripts/:id">Retrieve a Script by ID</option>
              <option value="/classify">Classify Text by Character</option>
              <option value="/organize">Organize Text by Word</option>
              <option value="/filter">Filter Text by a Specified Script</option>
            </select>
            <form id="script_filters" className="hide" onChange={formatFilters}>
              <label>
                Minimum Creation Year <br />
                [negative numbers are BC]
              </label>
              <input type="number" name="min_year" />
              <label>
                Maximum Creation Year <br />
                [negative numbers are BC]
              </label>
              <input type="number" name="max_year" />
              <label>Language Status</label>
              <div className="slider-box">
                <p>Alive</p>
                <label className="switch">
                  <input type="checkbox" name="living" />
                  <span className="slider"></span>
                </label>
                <p>Dead</p>
              </div>
              <label>Text Direction</label>
              <select name="direction">
                <option value=""></option>
                <option value="LEFT_TO_RIGHT">Left to Right</option>
                <option value="RIGHT_TO_LEFT">Right to Left</option>
                <option value="TOP_TO_BOTTOM">Top to Bottom</option>
              </select>
              <label>Continent Found on</label>
              <select name="continent">
                <option value=""></option>
                <option value="AF">Africa</option>
                <option value="AS">Asia</option>
                <option value="AU">Australia</option>
                <option value="EU">Europe</option>
                <option value="NA">North America</option>
                <option value="SA">South America</option>
              </select>
              <label>Fields to Return</label>
              <input type="text" name="fields" placeholder="id, name, year" defaultValue={"id, name, year, ranges, link, direction, continents"} />
              <label>Response Limit</label>
              <input
                type="number"
                name="limit"
                min={1}
                max={140}
                placeholder="3"
              />
            </form>
            <div id="id_input" className="hide">
              <label>
                Script ID <br /> [1-140]
              </label>
              <input
                name="id"
                id="script_id"
                min={1}
                max={140}
                type="number"
                onChange={formatID}
              />
            </div>
            <div id="text_input" className="hide">
              <label>Text to {text_action}</label>
              <input
                type="text"
                name="text"
                id="text_string"
                onChange={formatText}
              />
            </div>
            <div className="hide" id="curl">
              <h1>Actual cURL Request</h1>
              <h3>With Your Authorization Credentials</h3>
              <pre>
                <code>{request_content}</code>
              </pre>
              <button
                onClick={handleRequest}
                className="button button--success button--lg"
                id="send-request-btn"
              >
                Send Request 🚀
              </button>
            </div>
            <div className="hide" id="response">
              <h1>Actual Server Response Body</h1>
              <div id="loader" className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <pre id="response-res" className="hide"></pre>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function CustomRequests() {
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
      title="Custom Requests"
      description="A user interface that allows the application user to create semi-customizable requests to the server using their authentication credentials"
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
