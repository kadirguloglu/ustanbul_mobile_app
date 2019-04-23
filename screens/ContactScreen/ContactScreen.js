import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
    Root, Header, Left, Right, Content, Button,
    Icon, Title, Item, Picker, Input, Body, Spinner
} from 'native-base';
import { contactSubjectData, postContactSubject } from '../reducer-functions'
import MyButton from '../../components/MyButton';
import { MyToast } from '../functions'

class ContactScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getToast: false,
            ContactMessage: {
                MessageSubjectID: -1,
                NameSurname: this.props.activeUser.IsCompany ? this.props.activeUser.Company.AuthorizedPersonName : this.props.activeUser.Customer.Name + ' ' + this.props.activeUser.Customer.Surname,
                PhoneNumber: this.props.activeUser.PhoneNumber,
                Email: this.props.activeUser.Email,
                Title: '',
                Description: '',
                UserID: this.props.activeUser.ID,
                SiteID: this.props.SiteID
            }
        }
    }
    componentWillMount() {
        this.props.contactSubjectData();
        this.handlerContactMessage = function () {
            if (this.state.ContactMessage.MessageSubjectID == -1) {
                MyToast("Lütfen bir mesaj konusu seçiniz");
                return;
            }
            if (this.state.ContactMessage.NameSurname.length < 1 || this.state.ContactMessage.NameSurname.length > 50) {
                MyToast("Alanları kontrol ediniz");
                return;
            }
            if (this.state.ContactMessage.PhoneNumber.length < 1 || this.state.ContactMessage.PhoneNumber.length > 20) {
                MyToast("Alanları kontrol ediniz");
                return;
            }
            if (this.state.ContactMessage.Email.length < 1 || this.state.ContactMessage.Email.length > 50) {
                MyToast("Alanları kontrol ediniz");
                return;
            }
            if (this.state.ContactMessage.Title.length < 1 || this.state.ContactMessage.Title.length > 150) {
                MyToast("Alanları kontrol ediniz");
                return;
            }
            if (this.state.ContactMessage.Description.length < 5 || this.state.ContactMessage.Description.length > 1000) {
                MyToast("Alanları kontrol ediniz");
                return;
            }
            this.props.postContactSubject(this.state.ContactMessage);
            this.setState({ getToast: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.getToast) {
            MyToast(nextProps.contactMessagePostResult ? "Mesajınız iletildi. En yakın zamanda size geri dönüş yapacağız." : "Üzgünüz mesajınız gönderilemedi. Lütfen tekrar deneyiniz");
            this.setState({ getToast: false });
        }
    }
    render() {
        const { contactSubjectResult, contactSubjectLoading } = this.props;
        if (contactSubjectLoading) {
            return (<Root><Spinner /></Root>)
        }
        return (
            <Root>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Bize Ulaş</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header >
                <Content style={{ padding: 10 }}>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Mesaj Konusu (Zorunlu)"}</Text>
                        </View>
                        <View>
                            <Item rounded>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholder={"Mesaj Konusu"}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined }}
                                    selectedValue={this.state.ContactMessage.MessageSubjectID}
                                    onValueChange={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, MessageSubjectID: value } })}
                                >
                                    <Picker.Item key={'dropdown' + -1} label={"Seçiniz"} value={-1} />
                                    {contactSubjectResult ? contactSubjectResult.map((ans) => {
                                        return (
                                            <Picker.Item key={'dropdown' + ans.MessageSubjectID} label={ans.Title} value={ans.MessageSubjectID} />);
                                    }) : (null)}
                                </Picker>
                            </Item>
                        </View>
                        <View>
                            <Text style={this.state.ContactMessage.MessageSubjectID == -1 ? styles.help_block_error : styles.help_block_success}>** Lütfen bir seçim yapınız</Text>
                        </View>
                    </View>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Adınız Soyadınız (Zorunlu)"}</Text>
                        </View>
                        <Item rounded>
                            <Input
                                onChangeText={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, NameSurname: value } })}
                                value={this.state.ContactMessage.NameSurname} />
                        </Item>
                        <View>
                            <Text
                                style={this.state.ContactMessage.NameSurname.length > 1
                                    && this.state.ContactMessage.NameSurname.length < 50 ?
                                    styles.help_block_success : styles.help_block_error}>
                                {this.state.ContactMessage.NameSurname.length} / 50</Text>
                        </View>
                    </View>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Telefon Numaranız (Zorunlu)"}</Text>
                        </View>
                        <Item rounded>
                            <Input
                                onChangeText={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, PhoneNumber: value } })}
                                value={this.state.ContactMessage.PhoneNumber} />
                        </Item>
                        <View>
                            <Text
                                style={this.state.ContactMessage.PhoneNumber.length > 1
                                    && this.state.ContactMessage.PhoneNumber.length < 20 ?
                                    styles.help_block_success : styles.help_block_error}>
                                {this.state.ContactMessage.PhoneNumber.length} / 20</Text>
                        </View>
                    </View>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Mail Adresiniz (Zorunlu)"}</Text>
                        </View>
                        <Item rounded>
                            <Input
                                onChangeText={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, Email: value } })}
                                value={this.state.ContactMessage.Email} />
                        </Item>
                        <View>
                            <Text
                                style={this.state.ContactMessage.Email.length > 1
                                    && this.state.ContactMessage.Email.length < 50 ?
                                    styles.help_block_success : styles.help_block_error}>
                                {this.state.ContactMessage.Email.length} / 50</Text>
                        </View>
                    </View>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Mesaj Başlığınız (Zorunlu)"}</Text>
                        </View>
                        <Item rounded>
                            <Input
                                onChangeText={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, Title: value } })}
                                value={this.state.ContactMessage.Title} />
                        </Item>
                        <View>
                            <Text
                                style={this.state.ContactMessage.Title.length > 1
                                    && this.state.ContactMessage.Title.length < 150 ?
                                    styles.help_block_success : styles.help_block_error}>
                                {this.state.ContactMessage.Title.length} / 150</Text>
                        </View>
                    </View>
                    <View style={styles.pageTopView}>
                        <View>
                            <Text style={styles.QuestionTitle}>{"Mesajınız (Zorunlu)"}</Text>
                        </View>
                        <Item rounded>
                            <Input
                                onChangeText={(value) => this.setState({ ContactMessage: { ...this.state.ContactMessage, Description: value } })}
                                value={this.state.ContactMessage.Description} />
                        </Item>
                        <View>
                            <Text
                                style={this.state.ContactMessage.Description.length > 5
                                    && this.state.ContactMessage.Description.length < 1000 ?
                                    styles.help_block_success : styles.help_block_error}>
                                {this.state.ContactMessage.Description.length} / 1000</Text>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 20 }}>
                        <MyButton press={() => this.handlerContactMessage()} text="Gönder" />
                    </View>

                </Content>
            </Root>
        )
    }
}

const mapStateToProps = ({ contactSubjectResult, contactSubjectLoading, activeUser, SiteID, contactMessagePostResult }) => ({
    contactSubjectResult,
    contactSubjectLoading,
    activeUser,
    SiteID,
    contactMessagePostResult
});

const mapDispatchToProps = {
    contactSubjectData,
    postContactSubject
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);

const styles = StyleSheet.create({
    pageTopView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    QuestionTitle: {
        fontSize: 18,
        textAlign: 'center',
        padding: 20,
    },
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
});