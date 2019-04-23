import React, { Component } from 'react';
import { StyleSheet, ListView, AsyncStorage, View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { customerServicePreviewData, servicePreviewDetailData, servicePreviewDetailQuestionData, proposalDetailData, updateServiceProposal } from '../reducer-functions';
import {
    Root, Spinner, Container, Header, Content,
    Button, Icon, List, ListItem,
    Left, Right, Body, Title, Fab,
    Footer, FooterTab, View as NativeView
} from 'native-base';
import { ThemeColor, MyToast } from '../functions';
import { ViewPager } from 'rn-viewpager';
import { BlurView } from 'react-native-blur';
import Dialog from 'react-native-dialog';
import moment from 'moment'
import Modal from "react-native-modal";
import MyButton from '../../components/MyButton'

let PAGES = [];
let PAGES_DATA_CATEGORY_INDEX = [];
class CustomerServiceScreen extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            currentPosition: 0,
            getToast: false,
            fabActive: false,
            iconIsText: false,
            modalIsVisible: false,
            dialogVisible: false,
            newProposalRegex: true,
            oldProposalPrice: "0",
            selectedProposalId: 0
        }
    }
    componentWillMount() {
        this.props.customerServicePreviewData(this.props.activeUser, this.props.activeLang);
        this.handlerUpdateServiceProposal = function (item, data) {
            this.setState({ selectedProposalId: data.ProposalID });
            this.props.proposalDetailData(data.ProposalID);
            var myInterval = setInterval(() => {
                if (this.props.proposalDetailLoading == false) {
                    clearInterval(myInterval);
                    this.setState({ oldProposalPrice: this.props.proposalDetailResult.Price + "" })
                    this.setState({ dialogVisible: true })
                }
            }, 1000)
        }
        this.renderViewPagerPage = function (page) {
            const { servicePreviewListResult } = this.props;
            if (servicePreviewListResult) {
                let item = servicePreviewListResult[PAGES_DATA_CATEGORY_INDEX[page].categoryIndex];
                let data = item.Value[PAGES_DATA_CATEGORY_INDEX[page].dataIndex];
                if (item && data)
                    return (<View key={"Service" + page} style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}>
                        <View>
                            <Text style={{ fontSize: 16, padding: 10, textAlign: 'center', color: 'white', borderBottomColor: 'white', borderBottomWidth: 1 }}>{item.Key.substr(2)}</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 5, padding: 10 }}>
                            <Text style={{ fontSize: 15, textAlign: 'center' }}>{data.CategoryName}</Text>
                            <Text style={{ fontSize: 13, textAlign: 'center', borderBottomColor: 'white', borderBottomWidth: 1 }}>{moment(data.CreateDate).format("DD MMMM YYYY, dddd hh:mm")}</Text>
                            {
                                (item.Key.indexOf('1#') > -1) ?
                                    (
                                        <View>
                                            <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                <Text style={styles.iconText}>Teklifleri gör</Text>
                                            </Button>
                                            <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                <Text style={styles.iconText}>İncele</Text>
                                            </Button>
                                            <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                <Text style={styles.iconText}>İptal et</Text>
                                            </Button>
                                        </View>
                                    ) :
                                    (item.Key.indexOf('2#') > -1) ?
                                        (
                                            <View>
                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                    <Text style={styles.iconText}>Usta onayı için QR oluştur</Text>
                                                </Button>
                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                    <Text style={styles.iconText}>İncele</Text>
                                                </Button>
                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                    <Text style={styles.iconText}>İptal Et</Text>
                                                </Button>
                                            </View>
                                        ) :
                                        (item.Key.indexOf('3#') > -1) ?
                                            (
                                                <View>
                                                    <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                        <Text style={styles.iconText}>Hizmeti onayla</Text>
                                                    </Button>
                                                    <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                        <Text style={styles.iconText}>İncele</Text>
                                                    </Button>
                                                    <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                        <Text style={styles.iconText}>Şikayet et</Text>
                                                    </Button>
                                                </View>
                                            ) :
                                            (item.Key.indexOf('4#') > -1) ?
                                                (
                                                    <View>
                                                        <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                            <Text style={styles.iconText}>Puan ver</Text>
                                                        </Button>
                                                        <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                            <Text style={styles.iconText}>İncele</Text>
                                                        </Button>
                                                    </View>
                                                ) :
                                                (item.Key.indexOf('5#') > -1) ?
                                                    (
                                                        <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                            <Text style={styles.iconText}>İncele</Text>
                                                        </Button>
                                                    ) :
                                                    (item.Key.indexOf('6#') > -1) ?
                                                        (
                                                            <View>
                                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                                    <Text style={styles.iconText}>Teklifleri gör</Text>
                                                                </Button>
                                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                                    <Text style={styles.iconText}>İncele</Text>
                                                                </Button>
                                                                <Button full style={styles.buttonStyle} onPress={() => this.handlerPreviewSelectedService(item, data)}>
                                                                    <Text style={styles.iconText}>İptal et</Text>
                                                                </Button>
                                                            </View>
                                                        ) : (null)
                            }
                        </View>
                    </View>);
                else
                    return <View key={"Service" + page} ></View>;
            } else {
                return <View key={"Service" + page} ></View>
            }
        }
        this.handlerPreviewSelectedService = function (item, data) {
            this.setState({ modalIsVisible: true });
            this.props.servicePreviewDetailData(data.ID);
            this.props.servicePreviewDetailQuestionData(data.ID);
        }
        this.onlyNumberRegex = function (value) {
            this.setState({ oldProposalPrice: value + "" })
            if (value.length == 0)
                this.setState({ newProposalRegex: true })
            else if ((/^(\d*\.)?\d+$/).test(value)) {
                this.setState({ newProposalRegex: true })
            } else
                this.setState({ newProposalRegex: false })
        }
        this.handleCancel = () => {
            this.setState({ dialogVisible: false });
        };

        this.handleUpdateProposal = () => {
            if (this.state.newProposalRegex == false) {
                MyToast("Teklifinizi kontrol ediniz")
                return
            }
            this.props.updateServiceProposal(this.state.oldProposalPrice, this.state.selectedProposalId);
            var myInterval = setInterval(() => {
                if (this.props.proposalDetailLoading == false) {
                    clearInterval(myInterval);
                    let lst;
                    if (this.props.updateServiceProposalResult.UpdateServiceProposalResult) {
                        lst = this.props.updateServiceProposalResult.UpdateServiceProposalResult;
                    } else {
                        lst = this.props.updateServiceProposalResult;
                    }
                    switch (lst) {
                        case "success":
                            MyToast("Teklifiniz güncellendi.");
                            break;
                        case "error":
                            MyToast("Teklifiniz güncellenirken hata oluştu. Tekrar deneyiniz.");
                            break;
                        default:
                            break;
                    }
                }
            }, 1000)
            this.setState({ dialogVisible: false });
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.state.getToast) {
            MyToast(nextProps.contactMessagePostResult ? "Mesajınız iletildi. En yakın zamanda size geri dönüş yapacağız." : "Üzgünüz mesajınız gönderilemedi. Lütfen tekrar deneyiniz");
            this.setState({ getToast: false });
        }
        if (nextState.currentPosition != this.state.currentPosition) {
            if (this.viewPager) {
                if (nextState.currentPosition === undefined) {
                    this.setState({ currentPosition: 0 });
                    this.viewPager.setPage(0)
                } else {
                    this.setState({ currentPosition: nextState.currentPosition });
                    this.viewPager.setPage(nextState.currentPosition)
                }
            }
        }
    }
    render() {
        const { companyServicePreviewLoading, servicePreviewListResult, activeUser, servicePreviewDetailLoading,
            servicePreviewDetailResult, servicePreviewDetailQuestionLoading, servicePreviewDetailQuestionResult } = this.props;
        if (servicePreviewListResult) {
            if (PAGES.length == 0) {
                let sayac = 0;
                for (let index = 0; index < servicePreviewListResult.length; index++) {
                    const element = servicePreviewListResult[index];
                    for (let valueIndex = 0; valueIndex < element.Value.length; valueIndex++) {
                        PAGES.push(sayac);
                        PAGES_DATA_CATEGORY_INDEX.push({
                            index: sayac,
                            categoryIndex: index,
                            dataIndex: valueIndex
                        });
                        sayac++;
                    }
                }
            }
        }
        if (companyServicePreviewLoading)
            return (
                <Root>
                    <Spinner />
                </Root>
            )
        const blurComponentIOS = (
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="xlight"
                blurAmount={50}
                viewRef={null}
            />
        )
        return (
            <Root>
                <Modal isVisible={this.state.modalIsVisible}>
                    <ScrollView>
                        <View style={{ backgroundColor: 'white', padding: 10 }}>
                            {servicePreviewDetailLoading ? (<Spinner />) : servicePreviewDetailResult ? (
                                <View>
                                    <Text style={styles.ServicePreviewItemText}>Adres Açıklaması</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.AddressDescription}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Not</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.Note}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Garantörlü mü?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsGuarantor ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Müşteri onaydı mı?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsApproved ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Usta onayladı mı?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsMasterApproved ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Keşif istendi mi?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsDiscovery ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Ödeme yapıldı mı?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsPayment ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>İptal edildi mi?</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.IsActive ? 'evet' : 'hayir'}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Ülke / İl / İlçe / Mahalle</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.CountryName ? servicePreviewDetailResult.CountryName.trim() : ''} / {servicePreviewDetailResult.CountyName ? servicePreviewDetailResult.CountyName.trim() : ''} / {servicePreviewDetailResult.DiscrictName ? servicePreviewDetailResult.DiscrictName.trim() : ''} / {servicePreviewDetailResult.NeigborhoodName ? servicePreviewDetailResult.NeigborhoodName.trim() : ''}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Hizmet kodu</Text>
                                    <Text style={styles.ServicePreviewItemTextAnswer}>{servicePreviewDetailResult.ID}{servicePreviewDetailResult.CodeText}</Text>
                                    <Text style={styles.ServicePreviewItemText}>Sorulara verilen cevaplar</Text>
                                    {servicePreviewDetailQuestionLoading ? (<Spinner />) : (servicePreviewDetailQuestionResult.map((item, index) => {
                                        return <Text key={"Answers" + index} style={[styles.QuestionAndAnswer, styles.ServicePreviewItemTextAnswer]}>{item.Question} : {item.Answer}</Text>
                                    }))}

                                </View>
                            ) : <Spinner />}
                            <MyButton press={() => this.setState({ modalIsVisible: false })} text="Kapat" />
                        </View>
                    </ScrollView>
                </Modal>
                <Dialog.Container
                    visible={this.state.dialogVisible}
                    blurComponentIOS={blurComponentIOS}
                >
                    <Dialog.Title>Teklif Güncelleme</Dialog.Title>
                    <Dialog.Description>{!this.state.newProposalRegex ? 'Yeni teklifinizi yazınız. Sayısal Değer Giriniz' : 'Yeni teklifinizi yazınız.'}</Dialog.Description>
                    <Dialog.Input onChangeText={(value) => this.onlyNumberRegex(value)} value={this.state.oldProposalPrice}></Dialog.Input>
                    <Dialog.Button label="İptal et" onPress={() => this.handleCancel()} />
                    <Dialog.Button label="Teklifi güncelle" onPress={() => this.handleUpdateProposal()} />
                </Dialog.Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Hizmetlerim</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header >
                <ImageBackground style={{
                    flex: 1,
                }}
                    source={require('../../assets/splash-screen-demo.png')}>
                    <View style={{ flex: 1 }}>
                        <ViewPager
                            style={{ flexGrow: 1 }}
                            ref={(viewPager) => { this.viewPager = viewPager }}
                            onPageSelected={(page) => { this.setState({ currentPosition: page.position }) }}
                            horizontalScroll={true}
                        >
                            {PAGES.map((page) => this.renderViewPagerPage(page))}
                        </ViewPager>
                    </View>
                </ImageBackground>
            </Root>
        )
    }
}

const mapStateToProps = ({ customerServicePreviewLoading, servicePreviewListResult, activeUser,
    activeLang,
    servicePreviewDetailLoading, servicePreviewDetailResult, servicePreviewDetailQuestionLoading,
    servicePreviewDetailQuestionResult, proposalDetailLoading, proposalDetailResult }) => ({
        customerServicePreviewLoading,
        servicePreviewListResult,
        activeUser,
        activeLang,
        servicePreviewDetailLoading,
        servicePreviewDetailResult,
        servicePreviewDetailQuestionLoading,
        servicePreviewDetailQuestionResult,
        proposalDetailLoading,
        proposalDetailResult,
    });

const mapDispatchToProps = {
    customerServicePreviewData,
    servicePreviewDetailData,
    servicePreviewDetailQuestionData,
    proposalDetailData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerServiceScreen);

const styles = StyleSheet.create({
    iconText: {
        fontSize: 18,
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: ThemeColor,
        margin: 10,
        borderRadius: 5,
    },
    ServicePreviewItemText: {
        textAlign: 'center',
        fontSize: 15,
    },
    ServicePreviewItemTextAnswer: {
        marginBottom: 2,
        borderBottomColor: ThemeColor,
        borderBottomWidth: 1
    }
})
