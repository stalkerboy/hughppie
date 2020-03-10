import React from "react";

import { Container } from "@material-ui/core";
import { ActionList } from "../../components/young7/actionlist";

export default class Young7Simulater extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <ActionList />
      </Container>
    );
  }
}
