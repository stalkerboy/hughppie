import React from "react";
import PropTypes from "prop-types";
import { TestSitePostTemplate } from "../../templates/testsite-post";

const TestSitePostPreview = ({ entry, widgetFor }) => (
  <TestSitePostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

TestSitePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default TestSitePostPreview;
