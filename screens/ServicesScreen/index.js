import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  WebView,
  Dimensions
} from "react-native";
import {
  Icon,
  Button,
  Toast,
  Root,
  Text,
  Input,
  Item,
  Header,
  Left,
  Right,
  Body,
  Title,
  CheckBox,
  ListItem,
  Spinner,
  Textarea,
  DatePicker,
  Picker
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
import { Permissions, ImagePicker, MapView } from "expo";
import Geocoder from "react-native-geocoding";
import styles from "./index-css";

Geocoder.init("AIzaSyArGwRN6xy2dTu7Nv2eapfvN2ghQgH_E7o"); // use a valid API key

const { width, height } = Dimensions.get("window");

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
  handleRenderContracts = contracts => {
    return contracts.map((item, index) => {
      if (this.state.serviceParameter.Contracts[index]) {
        return (
          <ListItem key={"contract" + item.ID}>
            <CheckBox
              checked={this.state.serviceParameter.Contracts[index].Choose}
              onPress={() =>
                this.handleSetStateContract(
                  index,
                  !this.state.serviceParameter.Contracts[index].Choose
                )
              }
            />
            <Body>
              <TouchableOpacity
                onPress={() => this.handleContractOpen(item, index)}
              >
                <Text>{item.PageName}</Text>
              </TouchableOpacity>
            </Body>
          </ListItem>
        );
      } else {
        return null;
      }
    });
  };
  handleSetStateContract = (i, value) => {
    let cont = this.state.serviceParameter.Contracts;
    cont[i].Choose = value;
    this.setState({
      serviceParameter: { ...this.state.serviceParameter, Contacts: cont }
    });
  };
  handleSetStateQuestion = (i, value, valueid) => {
    let quest = this.state.serviceParameter.Questions;
    quest[i].Answer = value;
    quest[i].AnswerID = valueid;
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
  handleServiceQuestion = questIndex => {
    const item = this.props.serviceServiceResponse.serviceCreateDataResult
      .Questions[questIndex - 7];
    const i = questIndex - 7;
    if (item.QuestionType == 1) {
      return (
        <View key={"renderPage" + questIndex} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{item.Question}</Text>
          </View>
          <Item rounded>
            <Input
              onChangeText={value =>
                this.handleSetStateQuestion(i, value, item.Answers[0].ID)
              }
              value={this.state.serviceParameter.Questions[i].Answer}
            />
          </Item>
          <View>
            <Text
              style={
                this.state.serviceParameter.Questions[i].Answer.length >
                  item.QuestionMinValue &&
                this.state.serviceParameter.Questions[i].Answer.length <
                  item.QuestionMaxValue
                  ? styles.help_block_success
                  : styles.help_block_error
              }
            >
              {item.IsRequired ? "** " : ""}
              {this.state.serviceParameter.Questions[i].Answer.length} /{" "}
              {item.QuestionMaxValue}{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this.viewPager.setPage(questIndex + 1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    if (item.QuestionType == 2) {
      return (
        <View key={"renderPage" + questIndex} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{item.Question}</Text>
          </View>
          <View>
            <Item rounded>
              <Input
                onChangeText={value =>
                  this.handleSetStateQuestion(i, value, item.Answers[0].ID)
                }
                value={this.state.serviceParameter.Questions[i].Answer}
              />
            </Item>
          </View>
          <View>
            {this.handleNumericMaxMinRegex(
              item.QuestionMaxValue,
              item.QuestionMinValue,
              this.state.serviceParameter.Questions[i].Answer
            ) ? (
              <Text />
            ) : (
              <Text style={styles.help_block_error}>
                {item.IsRequired ? "** " : ""}Lütfen geçerli bir değer giriniz.
                En fazla : {item.QuestionMaxValue}, En az :{" "}
                {item.QuestionMinValue}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this.viewPager.setPage(questIndex + 1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    if (item.QuestionType == 3) {
      return (
        <View key={"renderPage" + questIndex} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{item.Question}</Text>
          </View>
          <View>
            <Item rounded>
              <DatePicker
                defaultDate={new Date()}
                locale={"tr"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={value =>
                  this.handleSetStateQuestion(i, value, item.Answers[0].ID)
                }
                value={this.state.serviceParameter.Questions[i].Answer}
              />
            </Item>
          </View>
          <View>
            {this.handleDatePickerMaxMinValue(
              item.QuestionMaxValue,
              item.QuestionMinValue,
              this.state.serviceParameter.Questions[i].Answer
            ) ? (
              <Text />
            ) : (
              <Text style={styles.help_block_error}>
                {item.IsRequired ? "** " : ""}Lütfen geçerli bir değer giriniz.
                En fazla : {item.QuestionMaxValue}, En az :{" "}
                {item.QuestionMinValue}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this.viewPager.setPage(questIndex + 1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    if (item.QuestionType == 4) {
      return (
        <View key={"renderPage" + questIndex} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{item.Question}</Text>
          </View>
          <View>
            <Item rounded>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder={item.Question}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={
                  this.state.serviceParameter.Questions[i].Answer +
                  "~" +
                  this.state.serviceParameter.Questions[i].AnswerID
                }
                onValueChange={value =>
                  this.handleSetStateQuestion(
                    i,
                    value.split("~")[0],
                    value.split("~")[1]
                  )
                }
              >
                {item.Answers.map(ans => {
                  return (
                    <Picker.Item
                      key={"dropdown" + ans.ID}
                      label={ans.AnswerTextOrPlaceHolder}
                      value={ans.AnswerTextOrPlaceHolder + "~" + ans.ID}
                    />
                  );
                })}
              </Picker>
            </Item>
          </View>
          <View>
            {this.state.serviceParameter.Questions[i].Answer ? (
              <Text />
            ) : (
              <Text style={styles.help_block_error}>
                {item.IsRequired ? "** " : ""}Lütfen bir seçim yapınız
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => this.viewPager.setPage(questIndex + 1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return null;
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
      }
      let quest = {
        ID: item.Question.ID,
        Question: item.Question.Question,
        Answers: [
          {
            ID: item.AnswerID,
            Answer: item.Answer,
            AnswerTextOrPlaceHolder: item.Answer
          }
        ]
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
    this.props
      .createService(this.state.serviceParameter, postedData, 1)
      .then(({ payload }) => {})
      .catch(e => {});
  };
  renderViewPagerPage = page => {
    const { serviceCreateDataResult } = this.props.serviceServiceResponse;
    switch (page) {
      case 0:
        return (
          <View key={"renderPage" + 0} style={styles.pageTopView}>
            <Text style={styles.QuestionTitle}>
              Sizlere daha iyi ve guvenilir hizmet verebilmek adina sözleşmeleri
              okuyunuz.
            </Text>
            {this.handleRenderContracts(serviceCreateDataResult.CustomPages)}
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(1)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 1:
        return (
          <View key={"renderPage" + 1} style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>Hizmet Başlığı</Text>
            </View>
            <View>
              <Item rounded>
                <Input
                  placeholder="Hizmet Başlığı"
                  onChangeText={value =>
                    this.setState({
                      serviceParameter: {
                        ...this.state.serviceParameter,
                        Title: value
                      }
                    })
                  }
                  value={this.state.serviceParameter.Title}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.serviceParameter.Title.length > 10 &&
                  this.state.serviceParameter.Title.length < 31
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.serviceParameter.Title.length} / 30{" "}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(2)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 2:
        return (
          <View key={"renderPage" + 2} style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>Hizmet Notu</Text>
            </View>
            <View>
              <Item rounded>
                <Textarea
                  placeholder="Hizmet Notu"
                  rows={5}
                  onChangeText={value =>
                    this.setState({
                      serviceParameter: {
                        ...this.state.serviceParameter,
                        Description: value
                      }
                    })
                  }
                  value={this.state.serviceParameter.Description}
                />
              </Item>
            </View>
            <View>
              <Text
                style={
                  this.state.serviceParameter.Description.length > 50 &&
                  this.state.serviceParameter.Description.length < 451
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.serviceParameter.Description.length} / 450{" "}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(3)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 3:
        return (
          <View key={"renderPage" + 3} style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                Hizmetiniz ile ilgili gelismelerden nasil haberdar olmak
                istersiniz?
              </Text>
            </View>
            <View>
              <ListItem
                onPress={() =>
                  this.setState({
                    serviceParameter: {
                      ...this.state.serviceParameter,
                      SmsNotification: !this.state.serviceParameter
                        .SmsNotification
                    }
                  })
                }
              >
                <CheckBox
                  checked={this.state.serviceParameter.SmsNotification}
                />
                <Body>
                  <Text>SMS</Text>
                </Body>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    serviceParameter: {
                      ...this.state.serviceParameter,
                      EmailNotification: !this.state.serviceParameter
                        .EmailNotification
                    }
                  })
                }
              >
                <CheckBox
                  checked={this.state.serviceParameter.EmailNotification}
                />
                <Body>
                  <Text>Email</Text>
                </Body>
              </ListItem>
            </View>
            {this.state.serviceParameter.EmailNotification ||
            this.state.serviceParameter.SmsNotification ? null : (
              <View>
                <Text style={styles.help_block_error}>
                  ** En az bir seçim yapiniz
                </Text>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(4)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 4:
        return (
          <View key={"renderPage" + 4} style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>
                Hizmetiniz Ile Ilgili Fotograf Ekleyin
              </Text>
            </View>
            <View>{this.handleServiceImageList()}</View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(5)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 5:
        return (
          <View key={"renderPage" + 5} style={styles.pageTopView}>
            <View>
              <Text style={styles.QuestionTitle}>Hizmetinizi Filtreleyin</Text>
            </View>
            <View>
              <ListItem
                onPress={() =>
                  this.setState({
                    serviceParameter: {
                      ...this.state.serviceParameter,
                      IsDiscovery: !this.state.serviceParameter.IsDiscovery
                    }
                  })
                }
              >
                <CheckBox checked={this.state.serviceParameter.IsDiscovery} />
                <Body>
                  <Text>Kesif Istiyorum</Text>
                </Body>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    serviceParameter: {
                      ...this.state.serviceParameter,
                      IsGuarantor: !this.state.serviceParameter.IsGuarantor
                    }
                  })
                }
              >
                <CheckBox checked={this.state.serviceParameter.IsGuarantor} />
                <Body>
                  <Text>Hizmeti ustalazim garantörlügünde almak istiyorum</Text>
                </Body>
              </ListItem>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(6)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      case 6:
        return (
          <View key={"renderPage" + 6}>
            <View
              onLayout={event => this._handleViewHeightSetState(event, "view1")}
            >
              <Text style={styles.QuestionTitle}>Adresiniz</Text>
            </View>
            <View
              onLayout={event => this._handleViewHeightSetState(event, "view2")}
            >
              <Item rounded>
                <Input
                  placeholder="Adresiniz"
                  onChangeText={value =>
                    this.setState({
                      serviceParameter: {
                        ...this.state.serviceParameter,
                        AddressDescription: value
                      }
                    })
                  }
                  value={this.state.serviceParameter.AddressDescription}
                />
              </Item>
            </View>
            <View
              onLayout={event => this._handleViewHeightSetState(event, "view3")}
            >
              <Text
                style={
                  this.state.serviceParameter.AddressDescription.length > 20 &&
                  this.state.serviceParameter.AddressDescription.length < 451
                    ? styles.help_block_success
                    : styles.help_block_error
                }
              >
                ** {this.state.serviceParameter.AddressDescription.length} / 450{" "}
              </Text>
            </View>
            {this._handleCheckLocationPermission() ? (
              <View
                style={{
                  flex: 1,
                  height:
                    height -
                    (this.state.view1 +
                      this.state.view2 +
                      this.state.view3 +
                      this.state.view4)
                }}
              >
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta:
                      0.005 *
                      (width /
                        (height -
                          (this.state.view1 +
                            this.state.view2 +
                            this.state.view3 +
                            this.state.view4)))
                  }}
                  onPress={this._handleMapPress}
                >
                  {this.state.currentLocation !== null &&
                  this.state.currentLocation !== undefined ? (
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.currentLocation.latitude,
                        longitude: this.state.currentLocation.longitude
                      }}
                    />
                  ) : null}
                </MapView>
              </View>
            ) : null}

            <View
              onLayout={event => this._handleViewHeightSetState(event, "view4")}
            >
              <TouchableHighlight
                onPress={() => this.viewPager.setPage(7)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      default:
        if (page == PAGES.length - 1) {
          return (
            <View
              key={"renderPage" + (PAGES.length - 1)}
              style={styles.pageTopView}
            >
              {this.props.serviceServiceResponse.serviceCreateLoading ? (
                <Spinner color="blue" />
              ) : (
                <Button onPress={() => this.handleCreateService()}>
                  <Text>Tamamla</Text>
                </Button>
              )}
            </View>
          );
        }
        return this.handleServiceQuestion(page);
    }
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
      return true;
    }
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
          console.log("componentDidMount -> error watchPosition", error);
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
