import React from "react";

import Layout from "../../components/Layout";
import TestSiteRoll from "../../components/TestSiteRoll";

export default class TestSiteIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/testsite-index.jpg')`
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: "#f40",
              color: "white",
              padding: "1rem"
            }}
          >
            Test Site
          </h1>
          <h4>- 3d - 채팅 - 성향테스트 - 달력 -</h4>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <TestSiteRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
