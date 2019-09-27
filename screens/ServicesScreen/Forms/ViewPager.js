import React, { Component } from "react";
import { View, Tabs, Tab } from "native-base";
import i18n from "../../../constants/strings";

import ViewPagerContent from "./ViewPagerContent";

const ViewPager = props => {
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
    headerHeight,
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
    _handleSetInitialState,
    _validate,
    isMapReady,
    onMapLayout,
    serviceCreateLoading
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
              headerHeight={headerHeight}
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
              _validate={_validate}
              isMapReady={isMapReady}
              onMapLayout={onMapLayout}
              serviceCreateLoading={serviceCreateLoading}
            />
          </Tab>
        ))}
      </Tabs>
    </View>
  );
};

export default ViewPager;
