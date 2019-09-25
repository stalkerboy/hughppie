import React from "react";
import PropTypes from "prop-types";
import { BetaSitePostTemplate } from "../../templates/betasite-post";

const BetaSitePostPreview = ({ entry, widgetFor }) => (
  <BetaSitePostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

BetaSitePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BetaSitePostPreview;
