import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  WebView
} from "react-native";
import {
  Icon,
  Button,
  Toast,
  Root,
  Header,
  Left,
  Right,
  Body,
  Title,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import {
  serviceCreateData,
  createService
} from "../../src/actions/serviceService";
import { IsValidDate, ThemeColor } from "../../src/functions";
import moment from "moment";
import { ViewPager } from "rn-viewpager";
import Modal from "react-native-modal";
import MyButton from "../../components/MyButton";
import { Permissions, ImagePicker } from "expo";
import Geocoder from "react-native-geocoding";
import styles from "./index-css";
import ViewPagerContent from "./Forms/ViewPagerContent";

Geocoder.init("AIzaSyArGwRN6xy2dTu7Nv2eapfvN2ghQgH_E7o"); // use a valid API key

let PAGES = [];

requestCameraPermission = async () => {
  let camera = await Permissions.askAsync(Permissions.CAMERA);
  let camera_roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (camera_roll.status !== "granted" || camera.status !== "granted") {
    alert("Servis oluşturmak için camera izni vermelisiniz.");
    return false;
  }
  return true;
};

let contractIndex = -1;

class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view1: 10,
      view2: 10,
      view3: 10,
      view4: 10,
      currentPosition: 0,
      serviceCreateDataResult: [],
      serviceCreateDataLoading: true,
      locationPermission: false,
      // photos: [],
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      dataLoading: true,
      headerPageSwapIcon: null,
      modalIsVisible: false,
      modalContent: "",

      serviceParameter: {
        CategoryID: -1,
        CategoryName: "",
        LanguageCode: "tr-TR", //
        Title: "",
        Description: "",
        SmsNotification: false,
        EmailNotification: false,
        IsPayDoor: false,
        IsDiscovery: false,
        IsGuarantor: true,
        Income: 0,
        Latitude: "", //
        Longitude: "", //
        Location: "", //
        AddressDescription: "",
        UserID: -1,
        SiteID: 1, //
        Questions: [],

        Contracts: [],
        serviceImages: [
          { uri: require("../../assets/image-place-holder.png"), image: {} },
          { uri: require("../../assets/image-place-holder.png"), image: {} },
          { uri: require("../../assets/image-place-holder.png"), image: {} },
          { uri: require("../../assets/image-place-holder.png"), image: {} },
          { uri: require("../../assets/image-place-holder.png"), image: {} },
          { uri: require("../../assets/image-place-holder.png"), image: {} }
        ]
      }
    };
  }

  async componentWillMount() {
    PAGES = [];
    const { navigation } = this.props;
    const itemId = navigation.getParam("CategoryID", -1);
    this.setState({ CategoryID: itemId });
    let cameraResult = await requestCameraPermission();
    if (!cameraResult) {
      this.props.navigation.navigate("Home");
    }
    this.props.serviceCreateData(itemId, "1", "1").then(({ payload }) => {
      let data = payload.data;
      let name = data.Name;
      this.setState({
        serviceParameter: {
          ...this.state.serviceParameter,
          CategoryName: name
        }
      });

      let activeUserId = this.props.generalServiceGetResponse.activeUser.Id;
      this.setState({
        serviceParameter: {
          ...this.state.serviceParameter,
          UserID: activeUserId
        }
      });

      if (PAGES.length == 0) {
        let pageCount = 7 + data.Questions.length;
        for (x = 0; x <= pageCount; x++) {
          PAGES.push(x);
        }
      }

      const quest = [];
      data.Questions.map((item, i) => {
        quest.push({
          Answer: "",
          AnswerID: -1,
          Question: item
        });
      });
      this.setState({
        serviceParameter: { ...this.state.serviceParameter, Questions: quest }
      });

      const contract = [];
      data.CustomPages.map((item, i) => {
        contract.push({
          Choose: false,
          Contract: item
        });
      });
      this.setState({
        serviceParameter: {
          ...this.state.serviceParameter,
          Contracts: contract
        }
      });
      this.setState({ dataLoading: false });
    });
  }

  handlerContactCheckAndCloseModal = () => {
    this.setState({ modalIsVisible: false });
    this.handleSetStateContract(contractIndex, true);
  };

  handleContractOpen = (contract, index) => {
    contractIndex = index;
    this.setState({ modalContent: contract.Description });
    this.setState({ modalIsVisible: true });
  };

  handleSetStateContract = (i, value) => {
    let cont = this.state.serviceParameter.Contracts;
    cont[i].Choose = value;
    this.setState({
      serviceParameter: { ...this.state.serviceParameter, Contacts: cont }
    });
  };

  handleSetStateQuestion = (
    i,
    value,
    valueId,
    checked,
    questionType,
    answerIndex
  ) => {
    let quest = this.state.serviceParameter.Questions;
    if (questionType) {
      if (questionType === 5) {
        let isAdded = true;
        if (!quest[i].Answers) {
          quest[i].Answers = [];
        }
        if (quest[i].Answers) {
          for (let p = 0; p < quest[i].Answers.length; p++) {
            const item = quest[i].Answers[p];
            if (item.AnswerIndex === answerIndex) {
              quest[i].Answers[p].Checked = checked;
              isAdded = false;
            }
          }
        }
        if (isAdded) {
          quest[i].Answers.push({
            AnswerIndex: answerIndex,
            Checked: checked,
            Answer: value,
            AnswerID: valueId
          });
        }
      }
    }
    quest[i].Answer = value;
    quest[i].AnswerID = valueId;
    this.setState({
      serviceParameter: { ...this.state.serviceParameter, Questions: quest }
    });
  };

  handleNumericMaxMinRegex = (max, min, value) => {
    value = parseInt(value);
    var rgx = /[0-9]/g;
    var result = rgx.test(value);
    if (result) {
      if (value < max && value > min) return true;
    }
    return false;
  };

  handleDatePickerMaxMinValue = (max, min, value) => {
    if (max) {
      if (IsValidDate(max)) {
        if (value > moment(max)) {
          return false;
        }
      }
    }
    if (min) {
      if (IsValidDate(min)) {
        if (value < moment(min)) {
          return false;
        }
      }
    }
    return true;
  };

  handleServiceImageList = () => {
    return (
      <FlatList
        data={this.state.serviceParameter.serviceImages}
        extraData={this.state.serviceParameter}
        renderItem={({ item, index }) =>
          this.renderServiceImageState(item, index)
        }
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  onRegionChange = (region, lastLat, lastLong) => {
    //alert(JSON.stringify(arguments));
  };
  handleCreateService = () => {
    let postedData = {
      CategoryID: this.state.serviceParameter.CategoryID,
      CategoryName: this.state.serviceParameter.CategoryName,
      LanguageCode: this.state.serviceParameter.LanguageCode,
      Title: this.state.serviceParameter.Title,
      Description: this.state.serviceParameter.Description,
      EmailNotification: this.state.serviceParameter.EmailNotification,
      SmsNotification: this.state.serviceParameter.SmsNotification,
      IsPayDoor: this.state.serviceParameter.IsPayDoor,
      IsDiscovery: this.state.serviceParameter.IsDiscovery,
      IsGuarantor: this.state.serviceParameter.IsGuarantor,
      Income: this.state.serviceParameter.Income,
      Latitude: this.state.serviceParameter.Latitude,
      Longitude: this.state.serviceParameter.Longitude,
      Location: this.state.serviceParameter.Location,
      AddressDescription: this.state.serviceParameter.AddressDescription,
      UserID: this.state.serviceParameter.UserID,
      SiteID: this.state.serviceParameter.SiteID,
      Questions: []
    };
    for (i = 0; i < this.state.serviceParameter.Contracts.length; i++) {
      if (this.state.serviceParameter.Contracts[i].Choose == false) {
        Toast.show({
          text: "Devam edebilmek için sözleşmeleri onaylamalısınız",
          buttonText: "Tamam",
          duration: 2500
        });
        this.viewPager.setPage(0);
        return;
      }
    }
    if (postedData.Title.length < 11) {
      Toast.show({
        text: "Hizmet başlığını daha açıklayıcı yazınız",
        buttonText: "Tamam",
        duration: 2500
      });
      this.viewPager.setPage(1);
      return;
    }
    if (postedData.Description.length < 50) {
      Toast.show({
        text: "Hizmet notunuzu daha açıklayıcı yazınız",
        buttonText: "Tamam",
        duration: 2500
      });
      this.viewPager.setPage(2);
      return;
    }
    if (
      postedData.SmsNotification == false &&
      postedData.EmailNotification == false
    ) {
      Toast.show({
        text: "En az bir haberleşme yöntemi seçiniz",
        buttonText: "Tamam",
        duration: 2500
      });
      this.viewPager.setPage(3);
      return;
    }

    let errorServiceParameter = false;
    let errorToastMessage;
    let setPageNumber = 0;

    for (let ix = 0; ix < this.state.serviceParameter.Questions.length; ix++) {
      const item = this.state.serviceParameter.Questions[ix];
      let answers = [];
      if (item.Question.QuestionType == 1) {
        if (item.Question.IsRequired) {
          if (item.Question.QuestionMinValue > item.Answer.length) {
            errorToastMessage = {
              text: "Cevabınız çok kısa lütfen cevabınızı control ediniz",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
          if (item.Question.QuestionMaxValue < item.Answer.length) {
            errorToastMessage = {
              text: "Cevabınız çok uzun lütfen cevabınızı control ediniz",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
        }
        answers.push({
          ID: item.AnswerID,
          Answer: item.Answer,
          AnswerTextOrPlaceHolder: item.Answer
        });
      }
      if (item.Question.QuestionType == 2) {
        if (item.Question.IsRequired) {
          if (item.Question.QuestionMinValue > parseInt(item.Answer)) {
            errorToastMessage = {
              text: "Cevabınızı istenilen aralıkta giriniz",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
          if (item.Question.QuestionMaxValue < parseInt(item.Answer)) {
            errorToastMessage = {
              text: "Cevabınızı istenilen aralıkta giriniz",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
        }
        answers.push({
          ID: item.AnswerID,
          Answer: item.Answer,
          AnswerTextOrPlaceHolder: item.Answer
        });
      }
      if (item.Question.QuestionType == 3) {
        if (item.Question.IsRequired) {
          var dateResult = this.handleDatePickerMaxMinValue(
            item.Question.QuestionMaxValue,
            item.Question.QuestionMinValue,
            item.Answer
          );
          if (!dateResult) {
            errorToastMessage = {
              text: "Tarih seçimi hatalı. Lütfen kontrol ediniz",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
        }
        answers.push({
          ID: item.AnswerID,
          Answer: item.Answer,
          AnswerTextOrPlaceHolder: item.Answer
        });
      }
      if (item.Question.QuestionType == 4) {
        if (item.Question.IsRequired) {
          if (item.AnswerID == -1) {
            errorToastMessage = {
              text: "Zorunlu seçmeli soru cevaplanmamış",
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
        }
        answers.push({
          ID: item.AnswerID,
          Answer: item.Answer,
          AnswerTextOrPlaceHolder: item.Answer
        });
      }
      if (item.Question.QuestionType == 5) {
        let checkedCount = 0;
        if (item.Answers) {
          for (let mn = 0; mn < item.Answers.length; mn++) {
            const checkQuestion = item.Answers[mn];
            if (checkQuestion.Checked) {
              checkedCount++;
            }
          }
        }
        if (item.Question.IsRequired) {
          if (checkedCount === 0) {
            errorToastMessage = {
              text: `${item.Question.Question} sorusu boş geçilemez`,
              buttonText: "Tamam",
              duration: 2500
            };
            setPageNumber = 7;
            errorServiceParameter = true;
            break;
          }
        }
        if (
          checkedCount < item.Question.QuestionMinValue ||
          checkedCount > item.Question.QuestionMaxValue
        ) {
          errorToastMessage = {
            text: `${item.Question.Question} sorusu için en fazla ${
              item.Question.QuestionMaxValue
            } en az ${item.Question.QuestionMinValue} seçim yapmalısınız`,
            buttonText: "Tamam",
            duration: 2500
          };
          setPageNumber = 7;
          errorServiceParameter = true;
          break;
        }
      }
      if (item.Answers) {
        for (let mn = 0; mn < item.Answers.length; mn++) {
          const checkQuestion = item.Answers[mn];
          if (checkQuestion.Checked) { 
            answers.push({
              ID: checkQuestion.AnswerID,
              Answer: checkQuestion.Answer,
              AnswerTextOrPlaceHolder: checkQuestion.Answer
            });
          }
        }
      }
      let quest = {
        ID: item.Question.ID,
        Question: item.Question.Question,
        Answers: answers
      };
      postedData.Questions.push(quest);
    }
    if (errorServiceParameter) {
      Toast.show(errorToastMessage);
      this.viewPager.setPage(setPageNumber);
      return;
    }
    if (
      postedData.AddressDescription.length > 450 ||
      postedData.AddressDescription.length < 20
    ) {
      Toast.show({
        text: "Adresiniz çok uzun kontrol ediniz",
        buttonText: "Tamam",
        duration: 2500
      });
      this.viewPager.setPage(6);
      return;
    }
    // this.props
    //   .createService(this.state.serviceParameter, postedData, 1)
    //   .then(({ payload }) => {})
    //   .catch(e => {});
  };

  _handleSetState = (property, value) => {
    this.setState({
      serviceParameter: {
        ...this.state.serviceParameter,
        [property]: value
      }
    });
  };

  renderViewPagerPage = page => {
    const { serviceServiceResponse } = this.props;
    const { serviceCreateDataResult } = serviceServiceResponse;
    const {
      serviceParameter,
      view1,
      view2,
      view3,
      view4,
      currentLocation,
      locationPermission
    } = this.state;
    return (
      <View key={"ViewPagerContent-" + page}>
        <ViewPagerContent
          serviceServiceResponse={serviceServiceResponse}
          serviceParameter={serviceParameter}
          viewPager={this.viewPager}
          styles={styles}
          _handleSetState={this._handleSetState}
          handleServiceImageList={this.handleServiceImageList}
          _handleViewHeightSetState={this._handleViewHeightSetState}
          locationPermission={locationPermission}
          view1={view1}
          view2={view2}
          view3={view3}
          view4={view4}
          currentLocation={currentLocation}
          _handleMapPress={this._handleMapPress}
          handleCreateService={this.handleCreateService}
          handleSetStateQuestion={this.handleSetStateQuestion}
          handleNumericMaxMinRegex={this.handleNumericMaxMinRegex}
          handleDatePickerMaxMinValue={this.handleDatePickerMaxMinValue}
          page={page}
          PAGES={PAGES}
          handleSetStateContract={this.handleSetStateContract}
          handleContractOpen={this.handleContractOpen}
          serviceCreateDataResult={serviceCreateDataResult}
        />
      </View>
    );
  };

  _handleViewHeightSetState = (event, view) => {
    this.setState({
      [view]:
        event.nativeEvent.layout.height > 0
          ? event.nativeEvent.layout.height
          : 50
    });
  };

  _handleCheckLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.setState({ locationPermission: true });
      return true;
    }
    this.setState({ locationPermission: false });
    return false;
  };

  _handleGetAddressWithGeocode = async (lat, long) => {
    Geocoder.from(lat, long)
      .then(json => {
        if (json.status === "OK") {
          this.setState({
            currentAddress: json
          });
          this.setState({
            serviceParameter: {
              ...this.state.serviceParameter,
              AddressDescription: this.state.currentAddress.results[0]
                .formatted_address
            }
          });
        } else {
          Toast.show({
            text:
              "Adres için konumunuza ulaşılamadı. İnternet bağlantınızı kontrol edin veya tekrar deneyiniz.",
            buttonText: "Tamam",
            duration: 2500
          });
        }
      })
      .catch(error => console.warn(error));
  };

  _handleMapPress = async e => {
    this.setState({
      currentLocation: e.nativeEvent.coordinate
    });
    this._handleGetAddressWithGeocode(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude
    );
  };

  handleCameraRool = async index => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images"
      });
      if (!result.cancelled) {
        let oldControl = false;
        this.state.serviceParameter.serviceImages.map(item => {
          if (item.uri.uri == result.uri) {
            oldControl = true;
            Toast.show({
              text: "Farklı bir görsel seçiniz",
              buttonText: "Tamam",
              duration: 2500
            });
          }
        });
        if (!oldControl) {
          let imageList = this.state.serviceParameter.serviceImages;
          imageList[index].uri = { uri: result.uri };
          imageList[index].image = result;
          this.setState({
            serviceParameter: {
              ...this.state.serviceParameter,
              serviceImages: imageList
            }
          });
        }
      }
    } catch (error) {
      Toast.show({
        text:
          "İşlem sırasında bir hata oluştur. İnternet bağlantınızı kontrol ediniz.",
        buttonText: "Tamam",
        duration: 2500
      });
    }
  };

  renderServiceImageState = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleCameraRool(index)}
        underlayColor="white"
      >
        <Image source={item.uri} style={styles.serviceImage} />
      </TouchableWithoutFeedback>
    );
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this.watchID = navigator.geolocation.watchPosition(
        async position => {
          this.setState({
            currentLocation: position.coords
          });
          this.setState({
            currentAddress: await this._handleGetAddressWithGeocode(
              position.coords.latitude,
              position.coords.longitude
            )
          });
          navigator.geolocation.clearWatch(this.watchID);
        },
        error => { 
          Toast.show({
            text:
              "Adres için konumunuza ulaşılamadı. İnternet bağlantınızı kontrol edin veya tekrar deneyiniz.",
            buttonText: "Tamam",
            duration: 2500
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10
        }
      );
    }
  }

  async componentWillUnmount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.currentPosition != this.state.currentPosition) {
      if (this.viewPager) {
        this.setState({ currentPosition: nextState.currentPosition });
        this.viewPager.setPage(nextState.currentPosition);
      }
    }
  }

  render() {
    const {
      serviceCreateDataResult,
      serviceCreateDataLoading
    } = this.props.serviceServiceResponse;
    return serviceCreateDataLoading == false &&
      this.state.dataLoading == false ? (
      <Root>
        <Modal isVisible={this.state.modalIsVisible}>
          <View style={{ flex: 1 }}>
            <WebView source={{ html: this.state.modalContent }} />
            <MyButton
              press={() => this.handlerContactCheckAndCloseModal()}
              text="Okudum Onaylıyorum"
            />
          </View>
        </Modal>
        <Header style={{ backgroundColor: ThemeColor }}>
          <Left>
            {this.state.currentPosition > 0 &&
            this.state.currentPosition < PAGES.length - 1 ? (
              <Button
                transparent
                onPress={() =>
                  this.viewPager.setPage(this.state.currentPosition - 1)
                }
              >
                <Icon
                  name="ios-arrow-back"
                  color="white"
                  style={{ color: "white" }}
                />
              </Button>
            ) : null}
            {this.state.currentPosition == 0 ? (
              <Button
                transparent
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Icon name="ios-menu" />
              </Button>
            ) : null}
          </Left>
          <Body>
            <Title>{serviceCreateDataResult.Name}</Title>
          </Body>
          <Right>
            {/* <Text>{this.state.currentPosition}</Text> */}
            {/* <Button onPress={() => alert(JSON.stringify(this.state.serviceParameter.Contracts.length))}><Text>Test</Text></Button> */}
          </Right>
        </Header>
        <View style={styles.container}>
          {/* <StepIndicator
                                customStyles={styles.stepIndicator}
                                currentPosition={this.state.currentPosition}
                            // labels={labels}
                            /> */}
          <ViewPager
            style={{ flexGrow: 1 }}
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
            onPageSelected={page => {
              this.setState({ currentPosition: page.position });
            }}
            horizontalScroll={
              this.state.currentPosition < PAGES.length - 1 ? true : false
            }
          >
            {PAGES.map(page => this.renderViewPagerPage(page))}
          </ViewPager>
        </View>
      </Root>
    ) : (
      <Root>
        <Spinner color="blue" />
      </Root>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  serviceServiceResponse
}) => ({
  generalServiceGetResponse,
  serviceServiceResponse
});

const mapDispatchToProps = {
  serviceCreateData,
  createService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesScreen);
