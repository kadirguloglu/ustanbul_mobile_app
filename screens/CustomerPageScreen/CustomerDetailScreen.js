import React, { Component } from "react";
import {
    StyleSheet, TouchableOpacity, View, CameraRoll, ScrollView, Image, FlatList,
    TouchableWithoutFeedback, Dimensions, PermissionsAndroid, TouchableHighlight
} from "react-native";
import {
    Container, Icon, Footer, Label, Button, Content, Toast, Root, Text, Input, Item, Header, Left, Right, Body, Title, CheckBox, ListItem, Spinner,
    Textarea, Form, DatePicker, Picker,
    Badge
} from "native-base";
import { connect } from 'react-redux';
import { customerServiceCountData } from '../../src/reducer-functions'
import { MidPath, IsValidDate } from '../functions'
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import metrics from '../../config/metrics'
import { ViewPager } from 'rn-viewpager';

class CustomerDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        this.props.customerServiceCountData(this.props.activeUser);
        this.renderText = function (item) {
            switch (item.Key) {
                case "bekleme":
                    return "Beklemede";
                case "onaylanan":
                    return "Onaylanan";
                case "yoruma-acik":
                    return "Yoruma Açık";
                case "biten":
                    return "Biten";
                case "iptal-edilen":
                    return "İptal Edilen";
            }
            return "";
        }
        this.handleServiceCount = function () {
            return this.props.customerServiceCountResult.map((item, index) => {
                return (
                    <View key={'item' + index} style={{ height: 60 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: 40, height: 50 }}>
                                <Badge primary>
                                    <Text>{item.Value}</Text>
                                </Badge>
                            </View>
                            <View style={{ width: 150, height: 50 }}>
                                <Text>{this.renderText(item)}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
        }
    }
    componentWillReceiveProps() {

    }
    render() {
        const { customerServiceCountLoading } = this.props;
        if (customerServiceCountLoading) {
            return (
                <Spinner />
            )
        } else {
            return (
                <Root>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.toggleDrawer()}>
                                <Icon name="ios-menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Hesap Özetiniz</Title>
                        </Body>
                        <Right>
                            {/* <Text>{this.state.currentPosition}</Text> */}
                            {/* <Button onPress={() => alert(JSON.stringify(this.state.serviceParameter.Contracts.length))}><Text>Test</Text></Button> */}
                        </Right>
                    </Header>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: 10,
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        {this.handleServiceCount()}
                    </View>
                </Root>
            )
        }
    }
}

const mapStateToProps = ({ customerServiceCountLoading, customerServiceCountResult, activeUser }) => ({
    customerServiceCountResult,
    customerServiceCountLoading,
    activeUser
});

const mapDispatchToProps = {
    customerServiceCountData
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailScreen);


const styles = StyleSheet.create({

})