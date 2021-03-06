import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform, StyleSheet, TextInput } from 'react-native'
import { View } from 'react-native-animatable'
import { Icon } from 'native-base'

const IS_ANDROID = Platform.OS === 'android'

export default class AuthTextInput extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool
  }

  state = {
    isFocused: false
  }

  focus = () => this.textInputRef.focus()

  render() {
    const { isEnabled, ...otherProps } = this.props
    const { isFocused } = this.state
    const color = isEnabled ? 'white' : 'rgba(255,255,255,0.4)'
    const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)'
    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <Icon style={[styles.inputIcon, { color }]} name="ios-copy" />
          <TextInput
            ref={(ref) => this.textInputRef = ref}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={[styles.textInput, { color }]}
            maxLength={32}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            selectionColor={'white'}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    // borderBottomWidth: 1
  },
  textInput: {
    // flex: 1,
    color: 'white',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  },
  inputIcon: {
    // flex: 1,
    color: 'white',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  }
})
