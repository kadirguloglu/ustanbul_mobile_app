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
import MapView from "react-native-maps";
import i18n from "../../../constants/strings";
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
    headerHeight,
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
    serviceCreateDataResult,
    _handleSetInitialState,
    isMapReady,
    onMapLayout,
    serviceCreateLoading
  } = props;
  switch (page) {
    case 0:
      return (
        <View key={"renderPage" + 0} style={styles.pageTopView}>
          <Text style={styles.QuestionTitle}>{i18n.t("text_26")}</Text>
          <ContractContent
            key={"renderPage-Contract" - 0}
            serviceParameter={serviceParameter}
            handleSetStateContract={handleSetStateContract}
            handleContractOpen={handleContractOpen}
            contracts={serviceCreateDataResult.CustomPages}
          />
          {page == PAGES.length - 1 ? (
            <View style={styles.buttonContainer}>
              {serviceServiceResponse.serviceCreateLoading ? (
                <Spinner color="blue" />
              ) : serviceCreateLoading ? (
                <Spinner color="blue"></Spinner>
              ) : (
                <TouchableHighlight
                  onPress={() => handleCreateService()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() =>
                  _handleSetInitialState("activeViewPagerPage", page + 1)
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      );
    // case 1:
    //   return (
    //     <View key={"renderPage" + 1} style={styles.pageTopView}>
    //       <View>
    //         <Text style={styles.QuestionTitle}>{i18n.t("text_29")}</Text>
    //       </View>
    //       <View>
    //         <Item rounded>
    //           <Input
    //             placeholder={i18n.t("text_29")}
    //             onChangeText={value => _handleSetState("Title", value)}
    //             value={serviceParameter.Title}
    //           />
    //         </Item>
    //       </View>
    //       <View>
    //         <Text
    //           style={
    //             serviceParameter.Title.length > 10 &&
    //             serviceParameter.Title.length < 31
    //               ? styles.help_block_success
    //               : styles.help_block_error
    //           }
    //         >
    //           ** {serviceParameter.Title.length} / 30{" "}
    //         </Text>
    //       </View>
    //       {page == PAGES.length - 1 ? (
    //         <View style={styles.buttonContainer}>
    //           {serviceServiceResponse.serviceCreateLoading ? (
    //             <Spinner color="blue" />
    //           )  : serviceCreateLoading ? (
    //            <Spinner color="blue"></Spinner>
    //            ): (
    //             <TouchableHighlight
    //               onPress={() => handleCreateService()}
    //               style={styles.button}
    //             >
    //               <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
    //             </TouchableHighlight>
    //           )}
    //         </View>
    //       ) : (
    //         <View style={styles.buttonContainer}>
    //           <TouchableHighlight
    //             onPress={() =>
    //               _handleSetInitialState("activeViewPagerPage", page + 1)
    //             }
    //             style={styles.button}
    //           >
    //             <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
    //           </TouchableHighlight>
    //         </View>
    //       )}
    //     </View>
    //   );
    case 1:
      return (
        <View key={"renderPage" + 2} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{i18n.t("text_30")}</Text>
          </View>
          <View>
            <Item rounded>
              <Textarea
                placeholder={i18n.t("text_30")}
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
          {page == PAGES.length - 1 ? (
            <View style={styles.buttonContainer}>
              {serviceServiceResponse.serviceCreateLoading ? (
                <Spinner color="blue" />
              ) : serviceCreateLoading ? (
                <Spinner color="blue"></Spinner>
              ) : (
                <TouchableHighlight
                  onPress={() => handleCreateService()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() =>
                  _handleSetInitialState("activeViewPagerPage", page + 1)
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      );
    // case 2:
    //   return (
    //     <View key={"renderPage" + 3} style={styles.pageTopView}>
    //       <View>
    //         <Text style={styles.QuestionTitle}>{i18n.t("text_31")}</Text>
    //       </View>
    //       <View>
    //         <ListItem>
    //           <CheckBox
    //             onPress={() =>
    //               _handleSetState(
    //                 "SmsNotification",
    //                 !serviceParameter.SmsNotification
    //               )
    //             }
    //             checked={serviceParameter.SmsNotification}
    //           />
    //           <Body>
    //             <Text>SMS</Text>
    //           </Body>
    //         </ListItem>
    //         <ListItem>
    //           <CheckBox
    //             onPress={() =>
    //               _handleSetState(
    //                 "EmailNotification",
    //                 !serviceParameter.EmailNotification
    //               )
    //             }
    //             checked={serviceParameter.EmailNotification}
    //           />
    //           <Body>
    //             <Text>Email</Text>
    //           </Body>
    //         </ListItem>
    //       </View>
    //       {serviceParameter.EmailNotification ||
    //       serviceParameter.SmsNotification ? null : (
    //         <View>
    //           <Text style={styles.help_block_error}>{i18n.t("text_32")}</Text>
    //         </View>
    //       )}
    //       {page == PAGES.length - 1 ? (
    //         <View style={styles.buttonContainer}>
    //           {serviceServiceResponse.serviceCreateLoading ? (
    //             <Spinner color="blue" />
    //           ) : serviceCreateLoading ? (
    //            <Spinner color="blue"></Spinner>
    //            ) : (
    //             <TouchableHighlight
    //               onPress={() => handleCreateService()}
    //               style={styles.button}
    //             >
    //               <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
    //             </TouchableHighlight>
    //           )}
    //         </View>
    //       ) : (
    //         <View style={styles.buttonContainer}>
    //           <TouchableHighlight
    //             onPress={() =>
    //               _handleSetInitialState("activeViewPagerPage", page + 1)
    //             }
    //             style={styles.button}
    //           >
    //             <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
    //           </TouchableHighlight>
    //         </View>
    //       )}
    //     </View>
    //   );
    case 2:
      return (
        <View key={"renderPage" + 4} style={styles.pageTopView}>
          <View>
            <Text style={styles.QuestionTitle}>{i18n.t("text_33")}</Text>
          </View>
          <View>{handleServiceImageList()}</View>
          {page == PAGES.length - 1 ? (
            <View style={styles.buttonContainer}>
              {serviceServiceResponse.serviceCreateLoading ? (
                <Spinner color="blue" />
              ) : serviceCreateLoading ? (
                <Spinner color="blue"></Spinner>
              ) : (
                <TouchableHighlight
                  onPress={() => handleCreateService()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={() =>
                  _handleSetInitialState("activeViewPagerPage", page + 1)
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      );
    // case 3:
    //   return (
    //     <View key={"renderPage" + 5} style={styles.pageTopView}>
    //       <View>
    //         <Text style={styles.QuestionTitle}>{i18n.t("text_34")}</Text>
    //       </View>
    //       <View>
    //         <ListItem
    //           onPress={() =>
    //             _handleSetState("IsDiscovery", serviceParameter.IsDiscovery)
    //           }
    //         >
    //           <CheckBox checked={serviceParameter.IsDiscovery} />
    //           <Body>
    //             <Text>{i18n.t("text_35")}</Text>
    //           </Body>
    //         </ListItem>
    //         <ListItem
    //           onPress={() =>
    //             _handleSetState("IsGuarantor", serviceParameter.IsGuarantor)
    //           }
    //         >
    //           <CheckBox checked={serviceParameter.IsGuarantor} />
    //           <Body>
    //             <Text>{i18n.t("text_36")}</Text>
    //           </Body>
    //         </ListItem>
    //       </View>
    //       {page == PAGES.length - 1 ? (
    //         <View style={styles.buttonContainer}>
    //           {serviceServiceResponse.serviceCreateLoading ? (
    //             <Spinner color="blue" />
    //           ) : serviceCreateLoading ? (
    //            <Spinner color="blue"></Spinner>
    //            ) : (
    //             <TouchableHighlight
    //               onPress={() => handleCreateService()}
    //               style={styles.button}
    //             >
    //               <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
    //             </TouchableHighlight>
    //           )}
    //         </View>
    //       ) : (
    //         <View style={styles.buttonContainer}>
    //           <TouchableHighlight
    //             onPress={() =>
    //               _handleSetInitialState("activeViewPagerPage", page + 1)
    //             }
    //             style={styles.button}
    //           >
    //             <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
    //           </TouchableHighlight>
    //         </View>
    //       )}
    //     </View>
    //   );
    case 3:
      let calcMapHeight = view1 + view2 + view3 + view4 + headerHeight;
      calcMapHeight = calcMapHeight == 0 ? 100 : calcMapHeight;

      return (
        <View key={"renderPage" + 6}>
          <View onLayout={event => _handleViewHeightSetState(event, "view1")}>
            <Text style={styles.QuestionTitle}>{i18n.t("text_37")}</Text>
          </View>
          <View onLayout={event => _handleViewHeightSetState(event, "view2")}>
            <Item rounded>
              <Input
                placeholder={i18n.t("text_37")}
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
                height: parseInt(height - calcMapHeight)
              }}
            >
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
                onPress={_handleMapPress}
                onLayout={onMapLayout}
              >
                {currentLocation !== null &&
                currentLocation !== undefined &&
                isMapReady ? (
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

          {page == PAGES.length - 1 ? (
            <View
              //style={styles.buttonContainer}
              onLayout={event => _handleViewHeightSetState(event, "view4")}
            >
              {serviceServiceResponse.serviceCreateLoading ? (
                <Spinner color="blue" />
              ) : serviceCreateLoading ? (
                <Spinner color="blue"></Spinner>
              ) : (
                <TouchableHighlight
                  onPress={() => handleCreateService()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{i18n.t("text_27")}</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <View
              style={styles.buttonContainer}
              onLayout={event => _handleViewHeightSetState(event, "view4")}
            >
              <TouchableHighlight
                onPress={() =>
                  _handleSetInitialState("activeViewPagerPage", page + 1)
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>{i18n.t("text_28")}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      );
    default:
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
          _handleSetInitialState={_handleSetInitialState}
          page={page + 1}
          handleCreateService={handleCreateService}
          PAGES={PAGES}
        />
      );
  }
};

export default ViewPagerContent;
