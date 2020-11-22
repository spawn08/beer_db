import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

const AppLoader = (props) => (
  <Dimmer active>
    <Loader size="huge" content={props.message} />
  </Dimmer>
);

export default AppLoader;