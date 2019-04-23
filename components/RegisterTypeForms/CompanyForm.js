import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ImageBackground, Text, View, TextInput, ActivityIndicator, StyleSheet, Button, TouchableHighlight, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeColor } from '../../src/functions';


const { width, height } = Dimensions.get('window');
class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoHeight: height,
        };
    }
    componentWillMount() {

    }
    render() {
        return (
            <ImageBackground
                source={require('../../assets/background/login-register-background.png')}
                style={styles.fullBackgroundImage}
                resizeMode='cover'>
                <Animatable.View animation="bounceInDown" style={[styles.loginScreenView]}>
                    <Animatable.View animation="zoomIn" delay={500} style={[styles.logoView, { height: this.state.logoHeight }]}>
                        <Text style={[styles.logoText]}>FixMasTR</Text>
                    </Animatable.View>
                    <Animatable.View animation="zoomIn" delay={1500}
                        onAnimationBegin={() => {
                            this.setState({ logoHeight: height * .4 })
                        }} style={styles.loginFormView}>


                        <TouchableHighlight onPress={() => this.props.open_register_form()}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text_1}>Hala hesabın yok mu?{"   "}</Text>
                                <Text style={styles.text_2}>Kayıt Ol</Text>
                            </View>
                        </TouchableHighlight>
                    </Animatable.View>
                </Animatable.View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ }) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 50,
        width: width * 0.8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 44,
        marginBottom: 10
    },
    inputIcon: {
        color: 'white',
        paddingRight: 7,
        width: 18
    },
    input: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Raleway_Light',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        width: (width * 0.8) - 30 - 18
    },
    button: {
        borderRadius: 10,
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    lineByLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 18
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: 55
    },
    lineByText: {
        textAlign: 'center',
        height: 15,
        color: 'white',
        fontSize: 14,
        fontFamily: 'Raleway_Light',
        paddingLeft: 5,
        paddingRight: 5
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    socialLoginIcon: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    },
    logoView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontFamily: 'Raleway_Bold',
        fontSize: 54,
        color: '#fff',
    },
    fullBackgroundImage: {
        width: width,
        height: height,
        flex: 1
    },
    loginScreenView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginFormView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: height * .6
    },
    registerTextContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        marginBottom: 10
    },
    text_1: {
        fontFamily: 'Raleway_Light',
        fontSize: 14,
        color: '#fff'
    },
    text_2: {
        fontFamily: 'Raleway_Bold',
        fontSize: 14,
        color: '#fff'
    }
})