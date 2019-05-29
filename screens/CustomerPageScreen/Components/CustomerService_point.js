import React from "react";
import { View, Text, Spinner, Icon } from "native-base";
import { TouchableHighlight, StyleSheet, ScrollView } from "react-native";

import { ThemeColor } from "../../../src/functions";

const Point = props => {
  const {
    companyServiceRateData,
    customerServiceIsPointData,
    customerServiceOldPointData,
    servicePointListData,
    _handleSetInitialState,
    selectRateCount,
    _handleSendServicePoint
  } = props;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {customerServiceIsPointData ? (
          <View padder>
            <Text>
              Hizmetinizi daha önce puanlamışsınız. Verdiğiniz puanlar hizmet
              kalitemiz için çok önemlidir.
            </Text>
          </View>
        ) : (
          <View padder>
            <Text>
              Firma daha önce puanlanmamış hemen firma hakkındaki görüşlerinizi
              müşterilerimiz ile paylaşarak hizmet kalitemizi arttırmamıza
              yardımcı olun.
            </Text>
          </View>
        )}
        {customerServiceIsPointData
          ? customerServiceOldPointData.map((elem, index) => {
              return (
                <View
                  padder
                  style={[
                    styles.view1,
                    { backgroundColor: index % 2 === 0 ? "#dedede" : "#fff" }
                  ]}
                  key={"servicePointListData-" + elem.ID}
                >
                  <Text>{elem.Name}</Text>
                  <View style={styles.view2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                      return (
                        <View key={"icon-" + item} style={{ marginLeft: 5 }}>
                          <Icon
                            name={`ios-star${
                              item <= elem.Rate ? "" : "-outline"
                            }`}
                            style={{
                              color: ThemeColor
                            }}
                          />
                        </View>
                      );
                    })}
                    <Text style={{ marginLeft: 5 }}>{elem.Rate}</Text>
                  </View>
                </View>
              );
            })
          : null}
        {customerServiceIsPointData ? null : (
          <View>
            {servicePointListData ? (
              servicePointListData.map((elem, index) => {
                let oldValue = selectRateCount.find(
                  item => item.ID === elem.ID
                );
                if (!oldValue) {
                  oldValue = {
                    ID: elem.ID,
                    Rate: 1
                  };
                  selectRateCount.push(oldValue);
                }
                return (
                  <View
                    padder
                    style={[
                      styles.view1,
                      { backgroundColor: index % 2 === 0 ? "#dedede" : "#fff" }
                    ]}
                    key={"servicePointListData-" + elem.ID}
                  >
                    <Text>{elem.Name}</Text>
                    <View style={styles.view2}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                        return (
                          <View key={"icon-" + item} style={{ marginLeft: 5 }}>
                            <TouchableHighlight
                              onPress={() => {
                                selectRateCount.find(
                                  item => item.ID === elem.ID
                                ).Rate = item;
                                _handleSetInitialState(
                                  "selectRateCount",
                                  selectRateCount
                                );
                              }}
                            >
                              <Icon
                                name={`ios-star${
                                  item <= oldValue.Rate ? "" : "-outline"
                                }`}
                                style={{
                                  color: ThemeColor
                                }}
                              />
                            </TouchableHighlight>
                          </View>
                        );
                      })}
                      <Text style={{ marginLeft: 5 }}>{oldValue.Rate}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Spinner />
            )}
          </View>
        )}
      </ScrollView>
      {customerServiceIsPointData ? null : (
        <View>
          <MyButton press={_handleSendServicePoint} text="Gönder" full={true} />
        </View>
      )}
    </View>
  );
};

export default Point;

const styles = StyleSheet.create({
  view1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 5,
    paddingBottom: 5
  },
  view2: {
    flexDirection: "row",
    alignItems: "center"
  }
});
