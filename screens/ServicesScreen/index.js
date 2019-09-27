import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  WebView,
  Keyboard,
  Alert
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
import { NavigationEvents } from "react-navigation";
import moment from "moment";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Geocoder from "react-native-geocoding";
import i18n from "../../constants/strings";

import { serviceCreateData } from "../../src/actions/serviceService";
import { createService } from "../../src/actions/servicePost";

import { IsValidDate, ThemeColor, Loader } from "../../src/functions";

import MyButton from "../../components/MyButton";
import ViewPager from "./Forms/ViewPager";

import styles from "./index-css";

Geocoder.init("AIzaSyArGwRN6xy2dTu7Nv2eapfvN2ghQgH_E7o"); // use a valid API key

requestCameraPermission = async () => {
  let camera = await Permissions.askAsync(Permissions.CAMERA);
  let camera_roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (camera_roll.status !== "granted" || camera.status !== "granted") {
    alert(i18n.t("text_4"));
    return false;
  }
  return true;
};

let contractIndex = -1;

let postedData = {};

const calcPagesCount = 3;
const descriptionPageIndex = 1;
const contractsPageIndex = 0;
const addressPageIndex = 3;

class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeViewPagerPage: 0,
      PAGES: [],
      view1: 10,
      view2: 10,
      view3: 10,
      view4: 10,
      headerHeight: 10,
      serviceCreateDataResult: [],
      serviceCreateDataLoading: true,
      locationPermission: false,
      // photos: [],
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      dataLoading: false,
      headerPageSwapIcon: null,
      modalIsVisible: false,
      modalContent: "",
      isMapReady: false,

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

  _handleSetInitialState = (property, value) => {
    this.setState({ [property]: value });
  };

  async componentWillMount() {
    this._handleNavigationComponentWillMount();
  }

  _handleNavigationComponentWillMount = async () => {
    let PAGES = [];
    const { navigation, generalServiceGetResponse } = this.props;
    const { activeUser } = generalServiceGetResponse;
    try {
      if (activeUser) {
        if (activeUser.Id > 0) {
          if (activeUser.IsCompany) {
            Alert.alert(
              "Uyarı",
              i18n.t("text_3"),
              [
                {
                  text: i18n.t("text_2"),
                  onPress: () => navigation.navigate("Login")
                },
                {
                  text: i18n.t("anasayfa"),
                  onPress: () => navigation.navigate("Home"),
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
            return;
          }
        } else if (activeUser.Id == 0) {
          Alert.alert(
            "Uyarı",
            i18n.t("text_1"),
            [
              {
                text: i18n.t("giris_yap"),
                onPress: () => navigation.navigate("Login")
              },
              {
                text: i18n.t("anasayfa"),
                onPress: () => navigation.navigate("Home"),
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
          return;
        }
      } else if (activeUser == undefined || activeUser == null) {
        Alert.alert(
          "Uyarı",
          i18n.t("text_1"),
          [
            {
              text: i18n.t("giris_yap"),
              onPress: () => navigation.navigate("Login")
            },
            {
              text: i18n.t("anasayfa"),
              onPress: () => navigation.navigate("Home"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
        return;
      }
    } catch (e) {
      Alert.alert(
        "Uyarı",
        i18n.t("text_1"),
        [
          {
            text: i18n.t("giris_yap"),
            onPress: () => navigation.navigate("Login")
          },
          {
            text: i18n.t("text_2"),
            onPress: () => navigation.navigate("Home"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }
    const itemId = navigation.getParam("CategoryID", -1);
    let cameraResult = await requestCameraPermission();
    this.setState({
      serviceParameter: {
        ...this.state.serviceParameter,
        LangID: 1
      }
    });
    if (!cameraResult) {
      this.props.navigation.navigate("Home");
    }
    this.props.serviceCreateData(itemId, "1", "1").then(({ payload }) => {
      let data = payload.data;
      let name = data.Name;

      let activeUserId = activeUser.Id;

      if (PAGES.length == 0) {
        let pageCount = calcPagesCount + data.Questions.length;
        for (x = 0; x <= pageCount; x++) {
          PAGES.push(x);
        }
      }

      const quest = [];
      data.Questions.map((item, i) => {
        quest.push({
          Answer: "",
          AnswerID: -1,
          Question: item,
          pageIndex: calcPagesCount + 1 + i
        });
      });

      const contract = [];
      data.CustomPages.map((item, i) => {
        contract.push({
          Choose: false,
          Contract: item
        });
      });

      this.setState({
        PAGES: PAGES,
        dataLoading: false,
        serviceParameter: {
          ...this.state.serviceParameter,
          Contracts: contract,
          Questions: quest,
          UserID: activeUserId,
          CategoryName: name,
          CategoryID: itemId
        }
      });
    });
    this._handleCheckLocationPermission();
  };

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

  _handleSetState = (property, value) => {
    this.setState({
      serviceParameter: {
        ...this.state.serviceParameter,
        [property]: value
      }
    });
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
              AddressDescription: json.results[0].formatted_address
            }
          });
          this.setState({
            serviceParameter: {
              ...this.state.serviceParameter,
              Location: this.state.currentAddress.results[0].formatted_address
            }
          });
        } else {
          Toast.show({
            text: i18n.t("text_5"),
            buttonText: i18n.t("text_6"),
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

    this.setState({
      serviceParameter: {
        ...this.state.serviceParameter,
        Latitude: e.nativeEvent.coordinate.latitude,
        Longitude: e.nativeEvent.coordinate.longitude
      }
    });
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
              text: i18n.t("text_7"),
              buttonText: i18n.t("text_6"),
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
        text: i18n.t("text_8"),
        buttonText: i18n.t("text_6"),
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
          this.setState({
            serviceParameter: {
              ...this.state.serviceParameter,
              Latitude: position.coords.latitude,
              Longitude: position.coords.longitude
            }
          });
          navigator.geolocation.clearWatch(this.watchID);
        },
        error => {
          this.setState({ locationPermission: false });
          Toast.show({
            text: i18n.t("text_9"),
            buttonText: i18n.t("text_6"),
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
    } else {
      this.setState({ locationPermission: false });
    }
  }

  async componentWillUnmount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }
  _validate = () => {
    Keyboard.dismiss();
    postedData = {};
    postedData = {
      LangID: this.state.serviceParameter.LangID,
      UserID: this.state.serviceParameter.UserID,
      SiteID: this.state.serviceParameter.SiteID,
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
      Location: this.state.serviceParameter.Location,
      Latitude: this.state.serviceParameter.Latitude,
      Longitude: this.state.serviceParameter.Longitude,
      Questions: [],
      AddressDescription: this.state.serviceParameter.AddressDescription
    };
    for (i = 0; i < this.state.serviceParameter.Contracts.length; i++) {
      if (this.state.serviceParameter.Contracts[i].Choose == false) {
        Toast.show({
          text: i18n.t("text_10"),
          buttonText: i18n.t("text_6"),
          duration: 2500
        });
        this.setState({ activeViewPagerPage: contractsPageIndex });
        return false;
      }
    }
    // if (postedData.Title.length < 11) {
    //   Toast.show({
    //     text: i18n.t("text_11"),
    //     buttonText: i18n.t("text_6"),
    //     duration: 2500
    //   });
    //   this.setState({ activeViewPagerPage: 1 });
    //   return false;
    // }
    if (postedData.Description.length < 50) {
      Toast.show({
        text: i18n.t("text_12"),
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      this.setState({ activeViewPagerPage: descriptionPageIndex });
      return false;
    }
    // if (
    //   postedData.SmsNotification == false &&
    //   postedData.EmailNotification == false
    // ) {
    //   Toast.show({
    //     text: i18n.t("text_13"),
    //     buttonText: i18n.t("text_6"),
    //     duration: 2500
    //   });
    //   this.setState({ activeViewPagerPage: 3 });
    //   return false;
    // }

    if (
      postedData.AddressDescription.length > 450 ||
      postedData.AddressDescription.length < 20
    ) {
      Toast.show({
        text: i18n.t("text_14"),
        buttonText: i18n.t("text_6"),
        duration: 2500
      });
      this.setState({ activeViewPagerPage: addressPageIndex });
      return false;
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
              text: i18n.t("text_15"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
            errorServiceParameter = true;
            break;
          }
          if (item.Question.QuestionMaxValue < item.Answer.length) {
            errorToastMessage = {
              text: i18n.t("text_16"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
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
              text: i18n.t("text_17"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
            errorServiceParameter = true;
            break;
          }
          if (item.Question.QuestionMaxValue < parseInt(item.Answer)) {
            errorToastMessage = {
              text: i18n.t("text_17"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
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
              text: i18n.t("text_18"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
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
              text: i18n.t("text_19"),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
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
              text: i18n.t("text_20", { v: item.Question.Question }),
              buttonText: i18n.t("text_6"),
              duration: 2500
            };
            setPageNumber = item.pageIndex;
            errorServiceParameter = true;
            break;
          }
        }
        if (
          checkedCount < item.Question.QuestionMinValue ||
          checkedCount > item.Question.QuestionMaxValue
        ) {
          errorToastMessage = {
            text: i18n.t("text_21", {
              v: item.Question.Question,
              v1: item.Question.QuestionMaxValue,
              v2: item.Question.QuestionMinValue
            }),
            buttonText: i18n.t("text_6"),
            duration: 2500
          };
          setPageNumber = item.pageIndex;
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
      this.setState({ activeViewPagerPage: setPageNumber });
      return false;
    }
    return true;
  };

  handleCreateService = () => {
    const validResult = this._validate();
    if (validResult) {
      this.props
        .createService(this.state.serviceParameter, postedData)
        .then(({ payload }) => {
          if (payload) {
            if (payload.data) {
              switch (payload.data) {
                case 0:
                  Toast.show({
                    text: i18n.t("text_22"),
                    buttonText: i18n.t("text_6"),
                    duration: 5500,
                    type: "danger"
                  });
                  return;
                case 1:
                  Toast.show({
                    text: i18n.t("text_23"),
                    buttonText: i18n.t("text_6"),
                    duration: 10000,
                    type: "success"
                  });
                  this.props.navigation.navigate("Home");
                  return;
                case 2:
                  Toast.show({
                    text: i18n.t("text_24"),
                    buttonText: i18n.t("text_6"),
                    duration: 5500,
                    type: "danger"
                  });
                  return;
                default:
                  Toast.show({
                    text: i18n.t("text_24"),
                    buttonText: i18n.t("text_6"),
                    duration: 5500,
                    type: "danger"
                  });
                  return;
              }
            } else {
              Toast.show({
                text: i18n.t("text_24"),
                buttonText: i18n.t("text_6"),
                duration: 5500,
                type: "danger"
              });
              return;
            }
          } else {
            Toast.show({
              text: i18n.t("text_24"),
              buttonText: i18n.t("text_6"),
              duration: 5500,
              type: "danger"
            });
            return;
          }
        });
    }
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  render() {
    const {
      serviceServiceResponse,
      servicePostResponse,
      navigation
    } = this.props;
    const { serviceCreateLoading } = servicePostResponse;
    const {
      serviceCreateDataLoading,
      serviceCreateDataResult
    } = serviceServiceResponse;
    const {
      modalIsVisible,
      modalContent,
      PAGES,
      serviceParameter,
      view1,
      view2,
      view3,
      view4,
      headerHeight,
      currentLocation,
      locationPermission,
      activeViewPagerPage,
      isMapReady
    } = this.state;
    return (
      <React.Fragment>
        <NavigationEvents
          onDidFocus={() => this._handleNavigationComponentWillMount()}
        />
        <Modal isVisible={modalIsVisible}>
          <View style={{ flex: 1 }}>
            <WebView source={{ html: modalContent }} />
            <MyButton
              press={() => this.handlerContactCheckAndCloseModal()}
              text={i18n.t("text_25")}
            />
          </View>
        </Modal>
        <Header
          onLayout={event =>
            this._handleViewHeightSetState(event, "headerHeight")
          }
          style={{ backgroundColor: ThemeColor }}
        >
          <Left>
            {activeViewPagerPage > 0 && activeViewPagerPage < PAGES.length ? (
              <Button
                transparent
                onPress={() =>
                  this.setState({
                    activeViewPagerPage: activeViewPagerPage - 1
                  })
                }
              >
                <Icon
                  name="ios-arrow-back"
                  color="white"
                  style={{ color: "white" }}
                />
              </Button>
            ) : null}
            {activeViewPagerPage == 0 ? (
              <Button transparent onPress={() => navigation.toggleDrawer()}>
                <Icon
                  name="ios-menu"
                  color="white"
                  style={{ color: "white" }}
                />
              </Button>
            ) : null}
          </Left>
          <Body>
            <Title style={{ color: "white" }}>
              {serviceCreateDataResult.Name}
            </Title>
          </Body>
          <Right>
            {/* <Button transparent onPress={() => this.handleCreateService()}>
                <Icon
                  name="ios-arrow-back"
                  color="white"
                  style={{ color: "white" }}
                />
              </Button> */}
          </Right>
        </Header>
        {serviceCreateDataLoading ? (
          <Spinner />
        ) : (
          <View style={styles.container}>
            <ViewPager
              PAGES={PAGES}
              serviceServiceResponse={serviceServiceResponse}
              serviceParameter={serviceParameter}
              styles={styles}
              _handleSetState={this._handleSetState}
              handleServiceImageList={this.handleServiceImageList}
              _handleViewHeightSetState={this._handleViewHeightSetState}
              locationPermission={locationPermission}
              view1={view1}
              view2={view2}
              view3={view3}
              view4={view4}
              headerHeight={headerHeight}
              currentLocation={currentLocation}
              _handleMapPress={this._handleMapPress}
              handleCreateService={this.handleCreateService}
              handleSetStateQuestion={this.handleSetStateQuestion}
              handleNumericMaxMinRegex={this.handleNumericMaxMinRegex}
              handleDatePickerMaxMinValue={this.handleDatePickerMaxMinValue}
              handleSetStateContract={this.handleSetStateContract}
              handleContractOpen={this.handleContractOpen}
              serviceCreateDataResult={serviceCreateDataResult}
              activeViewPagerPage={activeViewPagerPage}
              _handleSetInitialState={this._handleSetInitialState}
              _validate={this._validate}
              isMapReady={isMapReady}
              onMapLayout={this.onMapLayout}
              serviceCreateLoading={serviceCreateLoading}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  generalServiceGetResponse,
  serviceServiceResponse,
  servicePostResponse
}) => ({
  generalServiceGetResponse,
  serviceServiceResponse,
  servicePostResponse
});

const mapDispatchToProps = {
  serviceCreateData,
  createService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesScreen);
