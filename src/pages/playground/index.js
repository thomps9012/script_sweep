import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "../index.module.css";
const ScientistSVG = require("@site/static/img/undraw_scientist.svg").default;
import styles_two from "../../components/HomepageFeatures/styles.module.css";
export default function Home() {
  return (
    <Layout
      title="Request Playground"
      description="The landing page for users to request API Keys, exchange for JSON Web Tokens, and begin making secure, authenticated API endpoint requests."
    >
      <main>
        <header
          className={clsx("hero hero--primary", styles.heroBanner)}
          id="landing_page"
        >
          <h1>Request Playground</h1>
          <ScientistSVG className={styles_two.featureSvg} role="img" />
          <div
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: 'space-between' }}
          >
            <section>
              <h3>New?</h3>
              <Link
                to="/playground/api_key"
                className="button button--warning button--lg"
              >
                Request an API Key 🗝️
              </Link>
            </section>
            <section>
              <h3>Already Have a Key?</h3>
              <Link
                to="/playground/jwt"
                className="button button--success button--lg"
              >
                Exchange for an Auth Token 💱
              </Link>
            </section>
          </div>
        </header>
      </main>
    </Layout>
  );
}
