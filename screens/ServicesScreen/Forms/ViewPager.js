import React, { Component } from "react";
import { View, Tabs, Tab, ScrollableTab } from "native-base";
//import { ViewPager as Pager } from "rn-viewpager";
import ViewPagerContent from "./ViewPagerContent";

const ViewPager = props => {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       currentPosition: 0
  //     };
  //   }
  //   componentWillReceiveProps(nextProps, nextState) {
  //     if (nextState.currentPosition != this.state.currentPosition) {
  //       if (this.viewPager) {
  //         this.setState({ currentPosition: nextState.currentPosition });
  //         this.viewPager.setPage(nextState.currentPosition);
  //       }
  //     }
  //   }
  const {
    PAGES,
    serviceServiceResponse,
    serviceParameter,
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
    handleSetStateContract,
    handleContractOpen,
    serviceCreateDataResult,
    handleDatePickerMaxMinValue,
    activeViewPagerPage,
    _handleSetInitialState
  } = props;
  return (
    <View style={styles.container}>
      <Tabs renderTabBar={() => <View />} page={activeViewPagerPage}>
        {PAGES.map(page => (
          <Tab key={"ViewPagerContent-" + page} heading={"Tab" + page}>
            <ViewPagerContent
              PAGES={PAGES}
              serviceServiceResponse={serviceServiceResponse}
              serviceParameter={serviceParameter}
              styles={styles}
              _handleSetState={_handleSetState}
              handleServiceImageList={handleServiceImageList}
              _handleViewHeightSetState={_handleViewHeightSetState}
              locationPermission={locationPermission}
              view1={view1}
              view2={view2}
              view3={view3}
              view4={view4}
              currentLocation={currentLocation}
              _handleMapPress={_handleMapPress}
              handleCreateService={handleCreateService}
              handleSetStateQuestion={handleSetStateQuestion}
              handleNumericMaxMinRegex={handleNumericMaxMinRegex}
              handleDatePickerMaxMinValue={handleDatePickerMaxMinValue}
              page={page}
              handleSetStateContract={handleSetStateContract}
              handleContractOpen={handleContractOpen}
              serviceCreateDataResult={serviceCreateDataResult}
              _handleSetInitialState={_handleSetInitialState}
            />
          </Tab>
        ))}
      </Tabs>
    </View>
  );
};

export default ViewPager;
