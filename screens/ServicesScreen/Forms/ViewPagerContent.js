import React from "react";
import { View, TouchableHighlight, Dimensions } from "react-native";
import {
  Button,
  Text,
  Input,
  Item,
  Body,
  CheckBox,
  ListItem,
  Spinner,
  Textarea
} from "native-base";
import { MapView } from "expo";
import ContractContent from "./ContractContent";
import ServiceQuestion from "./ServiceQuestion";

const { width, height } = Dimensions.get("window");

const ViewPagerContent = props => {
  const {
    serviceServiceResponse,
    serviceParameter,
    viewPager,
    styles,
    _handleSetState,
    handleServiceImageList,
    _handleViewHeightSetState,
    locationPermission,
    view1,
    view2,
    view3,
    view4,
    currentLocation,
    _handleMapPress,
    handleCreateService,
    handleSetStateQuestion,
    handleNumericMaxMinRegex,
    handleDatePickerMaxMinValue,
    page,
    PAGES,
    handleSetStateContract,
    handleContractOpen,
    contracts,
    serviceCreateDataResult
  } = props;
  switch (page) {
    case 0:
      return (
        <View key={"renderPage" + 0} style={styles.pageTopView}>
          <Text style={styles.QuestionTitle}>
            Sizlere daha iyi ve guvenilir hizmet verebilmek adina sözleşmeleri
            okuyunuz.
          </Text>
          <ContractContent
            key={"renderPage-Contract" - 0}
            serviceParameter={serviceParameter}
            handleSetStateContract={handleSetStateContract}
            handleContractOpen={handleContractOpen}
            contracts={serviceCreateDataResult.CustomPages}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(1)}
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
                onChangeText={value => _handleSetState("Title", value)}
                value={serviceParameter.Title}
              />
            </Item>
          </View>
          <View>
            <Text
              style={
                serviceParameter.Title.length > 10 &&
                serviceParameter.Title.length < 31
                  ? styles.help_block_success
                  : styles.help_block_error
              }
            >
              ** {serviceParameter.Title.length} / 30{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(2)}
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
                onChangeText={value => _handleSetState("Description", value)}
                value={serviceParameter.Description}
              />
            </Item>
          </View>
          <View>
            <Text
              style={
                serviceParameter.Description.length > 50 &&
                serviceParameter.Description.length < 451
                  ? styles.help_block_success
                  : styles.help_block_error
              }
            >
              ** {serviceParameter.Description.length} / 450{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(3)}
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
            <ListItem>
              <CheckBox
                onPress={() =>
                  _handleSetState(
                    "SmsNotification",
                    !serviceParameter.SmsNotification
                  )
                }
                checked={serviceParameter.SmsNotification}
              />
              <Body>
                <Text>SMS</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                onPress={() =>
                  _handleSetState(
                    "EmailNotification",
                    !serviceParameter.EmailNotification
                  )
                }
                checked={serviceParameter.EmailNotification}
              />
              <Body>
                <Text>Email</Text>
              </Body>
            </ListItem>
          </View>
          {serviceParameter.EmailNotification ||
          serviceParameter.SmsNotification ? null : (
            <View>
              <Text style={styles.help_block_error}>
                ** En az bir seçim yapiniz
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(4)}
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
          <View>{handleServiceImageList()}</View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(5)}
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
                _handleSetState("IsDiscovery", serviceParameter.IsDiscovery)
              }
            >
              <CheckBox checked={serviceParameter.IsDiscovery} />
              <Body>
                <Text>Kesif Istiyorum</Text>
              </Body>
            </ListItem>
            <ListItem
              onPress={() =>
                _handleSetState("IsGuarantor", serviceParameter.IsGuarantor)
              }
            >
              <CheckBox checked={serviceParameter.IsGuarantor} />
              <Body>
                <Text>Hizmeti ustalazim garantörlügünde almak istiyorum</Text>
              </Body>
            </ListItem>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(6)}
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
          <View onLayout={event => _handleViewHeightSetState(event, "view1")}>
            <Text style={styles.QuestionTitle}>Adresiniz</Text>
          </View>
          <View onLayout={event => _handleViewHeightSetState(event, "view2")}>
            <Item rounded>
              <Input
                placeholder="Adresiniz"
                onChangeText={value =>
                  _handleSetState("AddressDescription", value)
                }
                value={serviceParameter.AddressDescription}
              />
            </Item>
          </View>
          <View onLayout={event => _handleViewHeightSetState(event, "view3")}>
            <Text
              style={
                serviceParameter.AddressDescription.length > 20 &&
                serviceParameter.AddressDescription.length < 451
                  ? styles.help_block_success
                  : styles.help_block_error
              }
            >
              ** {serviceParameter.AddressDescription.length} / 450{" "}
            </Text>
          </View>
          {locationPermission ? (
            <View
              style={{
                flex: 1,
                height: height - (view1 + view2 + view3 + view4)
              }}
            >
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta:
                    0.005 * (width / (height - (view1 + view2 + view3 + view4)))
                }}
                onPress={_handleMapPress}
              >
                {currentLocation !== null && currentLocation !== undefined ? (
                  <MapView.Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude
                    }}
                  />
                ) : null}
              </MapView>
            </View>
          ) : null}

          <View onLayout={event => _handleViewHeightSetState(event, "view4")}>
            <TouchableHighlight
              onPress={() => viewPager.setPage(7)}
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
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <Button onPress={() => handleCreateService()}>
                <Text>Tamamla</Text>
              </Button>
            )}
          </View>
        );
      }
      return (
        <ServiceQuestion
          key={"renderPage" + page}
          serviceServiceResponse={serviceServiceResponse}
          serviceParameter={serviceParameter}
          handleSetStateQuestion={handleSetStateQuestion}
          viewPager={viewPager}
          handleNumericMaxMinRegex={handleNumericMaxMinRegex}
          handleDatePickerMaxMinValue={handleDatePickerMaxMinValue}
          styles={styles}
          questIndex={page}
        />
      );
  }
};

export default ViewPagerContent;
