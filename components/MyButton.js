import React from "react";
import { Button, Text } from "native-base";
import PropTypes from "prop-types";

export default (MyButton = props => {
  const { press, text, buttonStyle, textStyle, full, parameters } = props;
  return (
    <Button
      full={full}
      onPress={() => press(...parameters)}
      style={buttonStyle}
    >
      <Text style={textStyle}>{text}</Text>
    </Button>
  );
});
MyButton.propTypes = {
  press: PropTypes.func,
  text: PropTypes.string,
  full: PropTypes.bool
};

MyButton.defaultProps = {
  press: () => null,
  text: "Tıklayınız",
  full: false,
  parameters: []
};
