import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class MyButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { press, text } = this.props;
        return (
            <TouchableHighlight onPress={() => press()} style={styles.button}>
                <Text style={styles.text}>{text}</Text>
            </TouchableHighlight>
        )
    }
}
MyButton.propTypes = {
    press: PropTypes.func,
    text: PropTypes.string
}

MyButton.defaultProps = {
    press: () => null,
    text: 'Tıklayınız',
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#59aae1', padding: 10
    },
    text: {
        textAlign: 'center', color: 'white', fontSize: 15
    }
})