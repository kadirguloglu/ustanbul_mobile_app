import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
    Icon, Button, Content, Toast, Root, Text, Input, Item, Header, Left, Right, Body, Title, CheckBox, ListItem, Spinner,
    Picker
} from "native-base";
import { connect } from 'react-redux';
import { userUpdateData, customerUpdateData, refreshAuthenticatedUser } from '../../src/reducer-functions'
import MyButton from '../../components/MyButton';

class CustomerDetailProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            getToast: false,

            UserParameter: {
                UserName: '',
                Email: '',
                PhoneNumber: '',
                Password: '',
                NotificationType: -1,
                IsSubscriber: false,
            },
            CustomerParameter: {
                Name: '',
                Surname: ''
            }
        }
    }
    componentWillMount() {
        this.handlerUserUpdate = function () {
            this.props.userUpdateData(this.state.UserParameter)
            this.setState({ getToast: true });
        }
        this.handlerCustomerUpdate = function () {
            this.props.customerUpdateData(this.state.CustomerParameter)
            this.setState({ getToast: true });
        }
        setTimeout(() => {
            const { activeUser } = this.props;
            this.setState({ UserParameter: activeUser });
            this.setState({ CustomerParameter: activeUser.Customer });
            this.setState({ pageLoading: false });
        }, 2000);
    }
    componentDidUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userUpdateResult == true && this.state.getToast) {
            Toast.show({
                text: 'Güncelleme işlemi başarıyla tamamlandı.',
                buttonText: 'Tamam',
                duration: 2500
            });
            this.props.refreshAuthenticatedUser(this.props.activeUser);
            this.setState({ getToast: false });
        } else if (nextProps.userUpdateResult == false && this.state.getToast) {
            Toast.show({
                text: 'Güncelleme işlemi başarısız.',
                buttonText: 'Tamam',
                duration: 2500
            });
            this.setState({ getToast: false });
        }
    }
    render() {
        const { userUpdateLoading, userUpdateResult } = this.props;
        if (this.state.pageLoading || userUpdateLoading) {
            return (<Root><Spinner /></Root>)
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
                            <Title>Hesap Bilgileriniz</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Content style={{ padding: 10 }}>
                        <View>
                            <Text style={{ textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: 24 }}>Hesap Bilgileriniz</Text>
                        </View>
                        <View>
                            <View>
                                <Text>Kullanıcı Adı</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='Kullanıcı Adı'
                                        onChangeText={(value) => this.setState({ UserParameter: { ...this.state.UserParameter, UserName: value } })}
                                        value={this.state.UserParameter.UserName} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.UserParameter.UserName.length > 10 &&
                                        this.state.UserParameter.UserName.length < 50 ? styles.help_block_success : styles.help_block_error}>
                                    ** {this.state.UserParameter.UserName.length} / 50 </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>E-Posta Adresiniz</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='E-Posta Adresiniz'
                                        onChangeText={(value) => this.setState({ UserParameter: { ...this.state.UserParameter, Email: value } })}
                                        value={this.state.UserParameter.Email} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.UserParameter.Email.length > 10 &&
                                        this.state.UserParameter.Email.length < 50 ? styles.help_block_success : styles.help_block_error}>
                                    ** {this.state.UserParameter.Email.length} / 50 </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Telefon Numaranız</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='Telefon Numaranız'
                                        onChangeText={(value) => this.setState({ UserParameter: { ...this.state.UserParameter, PhoneNumber: value } })}
                                        value={this.state.UserParameter.PhoneNumber} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.UserParameter.PhoneNumber.length > 9 &&
                                        this.state.UserParameter.PhoneNumber.length < 20 ? styles.help_block_success : styles.help_block_error}>
                                    {this.state.UserParameter.PhoneNumber.length} / 20 </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Parolanız</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='Parolanız'
                                        onChangeText={(value) => this.setState({ UserParameter: { ...this.state.UserParameter, Password: value } })}
                                        value={this.state.UserParameter.Password}
                                        secureTextEntry={true} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.UserParameter.Password.length > 6 &&
                                        this.state.UserParameter.Password.length < 50 ? styles.help_block_success : styles.help_block_error}>
                                    Parolanız şifrelenmiştir. Bu alanı şifre değişikliği istemiyorsanız güncellemeyin. {this.state.UserParameter.Password.length} / 50 </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Bildirim Yönetiminiz</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        placeholder={"Bildirim Yönetiminiz"}
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.UserParameter.NotificationType}
                                        onValueChange={(value) => this.setState({ UserParameter: { ...this.state.UserParameter, NotificationType: value } })}
                                    >
                                        <Picker.Item label={"Email ile bildirim"} value={1} />
                                        <Picker.Item label={"Sms ile bildirim"} value={2} />
                                        <Picker.Item label={"Sms ve email ile bildirim"} value={3} />
                                    </Picker>
                                </Item>
                            </View>
                            <View>
                                <Text></Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Bülten Aboneliği</Text>
                            </View>
                            <View>
                                <ListItem
                                    onPress={() => this.setState({ UserParameter: { ...this.state.UserParameter, IsSubscriber: !this.state.UserParameter.IsSubscriber } })}>
                                    <CheckBox checked={this.state.UserParameter.IsSubscriber} />
                                    <Body
                                        onPress={() => this.setState({ UserParameter: { ...this.state.UserParameter, IsSubscriber: !this.state.UserParameter.IsSubscriber } })}>
                                        <Text>{"Bülten Aboneliği"}</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View>
                                <Text></Text>
                            </View>
                        </View>
                        <View>
                            <MyButton press={() => this.handlerUserUpdate()} text="Hesap Bilgilerimi Kaydet" />
                            {/* <TouchableHighlight onPress={() => this.handlerUserUpdate()}>
                                <Text>Hesap Bilgilerimi Kaydet</Text>
                            </TouchableHighlight> */}
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 20, fontSize: 24 }}>Kullanıcı Bilgileriniz</Text>
                        </View>
                        <View>
                            <View>
                                <Text>Adınız</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='Adınız'
                                        onChangeText={(value) => this.setState({ CustomerParameter: { ...this.state.CustomerParameter, Name: value } })}
                                        value={this.state.CustomerParameter.Name} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.CustomerParameter.Name.length > 3 &&
                                        this.state.CustomerParameter.Name.length < 50 ? styles.help_block_success : styles.help_block_error}>
                                    ** {this.state.CustomerParameter.Name.length} / 50 </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Soyadınız</Text>
                            </View>
                            <View>
                                <Item rounded>
                                    <Input
                                        placeholder='Soyadınız'
                                        onChangeText={(value) => this.setState({ CustomerParameter: { ...this.state.CustomerParameter, Surname: value } })}
                                        value={this.state.CustomerParameter.Surname} />
                                </Item>
                            </View>
                            <View>
                                <Text
                                    style={this.state.CustomerParameter.Surname.length > 3 &&
                                        this.state.CustomerParameter.Surname.length < 50 ? styles.help_block_success : styles.help_block_error}>
                                    ** {this.state.CustomerParameter.Surname.length} / 50 </Text>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20 }}>
                            <MyButton press={() => this.handlerCustomerUpdate()} text="Kullanıcı Bilgilerimi Kaydet" />
                        </View>
                    </Content>
                </Root>
            )
        }

    }
}

const mapStateToProps = ({ activeUser, userUpdateLoading, userUpdateResult }) => ({
    activeUser,
    userUpdateLoading,
    userUpdateResult
});

const mapDispatchToProps = {
    userUpdateData,
    customerUpdateData,
    refreshAuthenticatedUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailProfileScreen);


const styles = StyleSheet.create({
    help_block_success: {
        fontSize: 12,
        textAlign: 'right',
        color: 'green'
    },
    help_block_error: {
        fontSize: 12,
        textAlign: 'right',
        color: 'red'
    },
})