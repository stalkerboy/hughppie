import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

import Content, { HTMLContent } from "./Content";

class AboutTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const { markdownRemark: post } = data;

    const PageContent = HTMLContent || Content;
    return (
      <div className="container">
        <div className="columns">
          <div className="section">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {post.frontmatter.title}
            </h2>
            <PageContent className="content" content={post.html} />
          </div>
        </div>
      </div>
    );
  }
}

AboutTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default () => (
  <StaticQuery
    query={graphql`
      query AboutTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
          html
          frontmatter {
            title
          }
        }
      }
    `}
    render={data => <AboutTemplate data={data} />}
  />
);
