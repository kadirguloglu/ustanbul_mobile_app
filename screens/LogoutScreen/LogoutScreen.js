import React, { Component } from "react";
import { connect } from 'react-redux';
import App from '../../App'
import { Spinner } from 'native-base';
import { logoutUser } from '../reducer-functions'

class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitRemove: true
    }
  }
  componentWillMount() {
    this.props.logoutUser();
    setTimeout(() => {
      this.setState({ waitRemove: false });
    }, 1000);
  }
  render() {
    if (this.state.waitRemove == false) {
      return (<App />)
    }
    return (<Spinner />)
  }
}

const mapStateToProps = ({ }) => ({

});

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen); 