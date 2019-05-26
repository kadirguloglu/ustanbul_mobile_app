import React from "react";
import { Button, Text, Spinner } from "native-base";
import PropTypes from "prop-types";

export default (MyButton = props => {
  const {
    press,
    text,
    buttonStyle,
    textStyle,
    full,
    parameters,
    spinner
  } = props;
  return (
    <Button
      full={full}
      onPress={() => (spinner ? null : press(...parameters))}
      style={buttonStyle}
    >
      {spinner ? <Spinner /> : <Text style={textStyle}>{text}</Text>}
    </Button>
  );
});
MyButton.propTypes = {
  press: PropTypes.func,
  text: PropTypes.string,
  full: PropTypes.bool,
  spinner: PropTypes.bool
};

MyButton.defaultProps = {
  press: () => null,
  text: "Tıklayınız",
  full: false,
  parameters: [],
  spinner: false
};
