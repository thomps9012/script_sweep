import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Minimal Setup",
    Svg: require("@site/static/img/undraw_sign_up.svg").default,
    description: (
      <>
        Email, first, and last name are all that's needed to request an API key
        and begin using the{" "}
        <span id="highlight" className="bold">
          script_sweep
        </span>{" "}
        API
      </>
    ),
  },
  {
    title: "Flexible API",
    Svg: require("@site/static/img/undraw_file_searching.svg").default,
    description: (
      <>
        Text information, filtering, classification, and organization based on
        various factors determined by you
      </>
    ),
  },
  {
    title: "Powered by Open Source",
    Svg: require("@site/static/img/undraw_open_source.svg").default,
    description: (
      <>
        Developers, see an opportunity to improve the API, feel free to fork the
        repository and open a pull request
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
