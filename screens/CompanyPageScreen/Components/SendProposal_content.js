import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Input,
  Item,
  Tabs,
  Tab,
  Spinner,
  DatePicker,
  Picker,
  Icon,
  ListItem,
  CheckBox,
  Body
} from "native-base";

import MyButton from "../../../components/MyButton";

const SendProposal = props => {
  const {
    masterServiceProposalQuestionPageLoading,
    masterServiceProposalQuestionPageData,
    tabProposalSendActivePage,
    _handleSetInitialState,
    _handleSendNewProposal,
    proposalModel,
    serviceSendProposalLoading
  } = props;

  if (masterServiceProposalQuestionPageLoading) {
    return <Spinner />;
  }
  return (
    <Tabs
      locked={true}
      renderTabBar={() => <View />}
      page={tabProposalSendActivePage}
    >
      <Tab heading={"sendProposalQuestion-0"} style={styles.tabStyle}>
        <View>
          <Text style={styles.questionStyle}>{"Teklifiniz"}</Text>
        </View>
        <View>
          <Item rounded>
            <Input
              keyboardType="numeric"
              onChangeText={value => {
                _handleSetInitialState("proposalModel", {
                  ...proposalModel,
                  Price: value
                });
              }}
              value={proposalModel.Price}
            />
          </Item>
        </View>
        <View>
          <Text style={styles.helperTextWithInput}>{"* Zorunlu alan"}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <MyButton
            full={true}
            text={
              masterServiceProposalQuestionPageData.length ===
              tabProposalSendActivePage
                ? "Tamamla"
                : "İleri"
            }
            press={
              masterServiceProposalQuestionPageData.length ===
              tabProposalSendActivePage
                ? _handleSendNewProposal
                : _handleSetInitialState
            }
            parameters={
              masterServiceProposalQuestionPageData.length ===
              tabProposalSendActivePage
                ? undefined
                : ["tabProposalSendActivePage", 1]
            }
            spinner={serviceSendProposalLoading}
          />
        </View>
      </Tab>
      {masterServiceProposalQuestionPageData.map((item, index) => {
        switch (item.QuestionType) {
          case 1:
            return (
              <Tab
                heading={item.Question}
                key={"proposalQuestionKey-" + index}
                style={styles.tabStyle}
              >
                <View>
                  <Text style={styles.questionStyle}>{item.Question}</Text>
                </View>
                <View>
                  <Item rounded>
                    <Input
                      onChangeText={value => {
                        const newValue = { ...proposalModel };
                        const answer = [
                          {
                            ID: item.Answers[0].ID,
                            Answer: value,
                            AnswerTextOrPlaceHolder:
                              item.Answers[0].AnswerTextOrPlaceHolder
                          }
                        ];
                        const questions = {
                          ID: item.ID,
                          Question: item.Question,
                          Answers: answer
                        };
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                      value={
                        proposalModel.Questions &&
                        proposalModel.Questions[index] &&
                        proposalModel.Questions[index].Answers
                          ? proposalModel.Questions[index].Answers[0].Answer
                          : ""
                      }
                    />
                  </Item>
                </View>
                {item.IsRequired ? (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      * Zorunlu alan. En fazla {item.QuestionMaxValue} karakter.
                      En az {item.QuestionMinValue} karakter giriniz.
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      En fazla {item.QuestionMaxValue} karakter. En az{" "}
                      {item.QuestionMinValue} karakter giriniz.
                    </Text>
                  </View>
                )}
                <View style={styles.buttonStyle}>
                  <MyButton
                    full={true}
                    text={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? "Tamamla"
                        : "İleri"
                    }
                    press={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? _handleSendNewProposal
                        : _handleSetInitialState
                    }
                    parameters={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? undefined
                        : ["tabProposalSendActivePage", index + 2]
                    }
                    spinner={serviceSendProposalLoading}
                  />
                </View>
              </Tab>
            );
          case 2:
            return (
              <Tab
                heading={item.Question}
                key={"proposalQuestionKey-" + index}
                style={styles.tabStyle}
              >
                <View>
                  <Text style={styles.questionStyle}>{item.Question}</Text>
                </View>
                <View>
                  <Item rounded>
                    <Input
                      keyboardType="numeric"
                      onChangeText={value => {
                        const newValue = { ...proposalModel };
                        const answer = [
                          {
                            ID: item.Answers[0].ID,
                            Answer: value,
                            AnswerTextOrPlaceHolder:
                              item.Answers[0].AnswerTextOrPlaceHolder
                          }
                        ];
                        const questions = {
                          ID: item.ID,
                          Question: item.Question,
                          Answers: answer
                        };
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                      value={
                        proposalModel.Questions &&
                        proposalModel.Questions[index] &&
                        proposalModel.Questions[index].Answers
                          ? proposalModel.Questions[index].Answers[0].Answer
                          : ""
                      }
                    />
                  </Item>
                </View>
                {item.IsRequired ? (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      * Zorunlu alan. En fazla {item.QuestionMaxValue}. En az{" "}
                      {item.QuestionMinValue} giriniz.
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      En fazla {item.QuestionMaxValue}. En az{" "}
                      {item.QuestionMinValue} giriniz.
                    </Text>
                  </View>
                )}
                <View style={styles.buttonStyle}>
                  <MyButton
                    full={true}
                    text={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? "Tamamla"
                        : "İleri"
                    }
                    press={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? _handleSendNewProposal
                        : _handleSetInitialState
                    }
                    parameters={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? undefined
                        : ["tabProposalSendActivePage", index + 2]
                    }
                    spinner={serviceSendProposalLoading}
                  />
                </View>
              </Tab>
            );
          case 3:
            return (
              <Tab
                heading={item.Question}
                key={"proposalQuestionKey-" + index}
                style={styles.tabStyle}
              >
                <View>
                  <Text style={styles.questionStyle}>{item.Question}</Text>
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
                      onDateChange={value => {
                        const newValue = { ...proposalModel };
                        const answer = [
                          {
                            ID: item.Answers[0].ID,
                            Answer: value,
                            AnswerTextOrPlaceHolder:
                              item.Answers[0].AnswerTextOrPlaceHolder
                          }
                        ];
                        const questions = {
                          ID: item.ID,
                          Question: item.Question,
                          Answers: answer
                        };
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                      value={
                        proposalModel.Questions &&
                        proposalModel.Questions[index] &&
                        proposalModel.Questions[index].Answer
                          ? proposalModel.Questions[index].Answer[0].Answer
                          : ""
                      }
                    />
                  </Item>
                </View>
                {item.IsRequired ? (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      * Zorunlu alan.
                    </Text>
                  </View>
                ) : null}
                <View style={styles.buttonStyle}>
                  <MyButton
                    full={true}
                    text={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? "Tamamla"
                        : "İleri"
                    }
                    press={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? _handleSendNewProposal
                        : _handleSetInitialState
                    }
                    parameters={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? undefined
                        : ["tabProposalSendActivePage", index + 2]
                    }
                    spinner={serviceSendProposalLoading}
                  />
                </View>
              </Tab>
            );
          case 4:
            return (
              <Tab
                heading={item.Question}
                key={"proposalQuestionKey-" + index}
                style={styles.tabStyle}
              >
                <View>
                  <Text style={styles.questionStyle}>{item.Question}</Text>
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
                        proposalModel.Questions &&
                        proposalModel.Questions[index] &&
                        proposalModel.Questions[index].Answers
                          ? proposalModel.Questions[index].Answers[0].ID
                          : ""
                      }
                      onValueChange={selectedId => {
                        const value = masterServiceProposalQuestionPageData[
                          index
                        ].Answers.find(item => item.ID === selectedId);
                        const newValue = { ...proposalModel };
                        const answer = [{ ...value }];
                        const questions = {
                          ID: item.ID,
                          Question: item.Question,
                          Answers: answer
                        };
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                    >
                      <Picker.Item
                        key={"dropdown--1"}
                        label={"Seçiniz"}
                        value={-1}
                      />
                      {item.Answers.map(ans => {
                        return (
                          <Picker.Item
                            key={"dropdown-" + ans.ID}
                            label={ans.AnswerTextOrPlaceHolder}
                            value={ans.ID}
                          />
                        );
                      })}
                    </Picker>
                  </Item>
                </View>
                {item.IsRequired ? (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      * Zorunlu alan.
                    </Text>
                  </View>
                ) : null}
                <View style={styles.buttonStyle}>
                  <MyButton
                    full={true}
                    text={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? "Tamamla"
                        : "İleri"
                    }
                    press={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? _handleSendNewProposal
                        : _handleSetInitialState
                    }
                    parameters={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? undefined
                        : ["tabProposalSendActivePage", index + 2]
                    }
                    spinner={serviceSendProposalLoading}
                  />
                </View>
              </Tab>
            );
          case 5:
            return (
              <Tab
                heading={item.Question}
                key={"proposalQuestionKey-" + index}
                style={styles.tabStyle}
              >
                <View>
                  <Text style={styles.questionStyle}>{item.Question}</Text>
                </View>
                <View>
                  {item.Answers.map((checkbox, ix) => {
                    return (
                      <ListItem key={"checkbox-" + ix + "-" + checkbox.ID}>
                        <CheckBox
                          checked={
                            proposalModel.Questions[index].Answers[ix].Checked
                              ? true
                              : false
                          }
                          onPress={value => {
                            const newValue = { ...proposalModel };
                            const selectedItem =
                              masterServiceProposalQuestionPageData[index]
                                .Answers[ix];
                            newValue.Questions[index].Answers[ix] = {
                              ID: selectedItem.ID,
                              Answer: selectedItem.AnswerTextOrPlaceHolder,
                              AnswerTextOrPlaceHolder:
                                selectedItem.AnswerTextOrPlaceHolder,
                              Checked: !proposalModel.Questions[index].Answers[
                                ix
                              ].Checked
                            };
                            _handleSetInitialState("proposalModel", newValue);
                          }}
                        />
                        <Body>
                          <TouchableOpacity
                            onPress={value => {
                              const newValue = { ...proposalModel };
                              const selectedItem =
                                masterServiceProposalQuestionPageData[index]
                                  .Answers[ix];
                              newValue.Questions[index].Answers[ix] = {
                                ID: selectedItem.ID,
                                Answer: selectedItem.AnswerTextOrPlaceHolder,
                                AnswerTextOrPlaceHolder:
                                  selectedItem.AnswerTextOrPlaceHolder,
                                Checked: !proposalModel.Questions[index]
                                  .Answers[ix].Checked
                              };
                              _handleSetInitialState("proposalModel", newValue);
                            }}
                          >
                            <Text>{checkbox.AnswerTextOrPlaceHolder}</Text>
                          </TouchableOpacity>
                        </Body>
                      </ListItem>
                    );
                  })}
                </View>
                {item.IsRequired ? (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      * Zorunlu alan. En fazla {item.QuestionMaxValue} seçim. En
                      az {item.QuestionMinValue} seçin yapabilirsiniz.
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.helperTextWithInput}>
                      En fazla {item.QuestionMaxValue}. En fazla{" "}
                      {item.QuestionMaxValue} seçim. En az{" "}
                      {item.QuestionMinValue} seçin yapabilirsiniz.
                    </Text>
                  </View>
                )}
                <View style={styles.buttonStyle}>
                  <MyButton
                    full={true}
                    text={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? "Tamamla"
                        : "İleri"
                    }
                    press={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? _handleSendNewProposal
                        : _handleSetInitialState
                    }
                    parameters={
                      masterServiceProposalQuestionPageData.length ===
                      tabProposalSendActivePage
                        ? undefined
                        : ["tabProposalSendActivePage", index + 2]
                    }
                    spinner={serviceSendProposalLoading}
                  />
                </View>
              </Tab>
            );
          case 6:
            console.log("LOG: --------------------------");
            console.log("LOG: item,index", item, index);
            console.log("LOG: --------------------------");
            return null;
          default:
            console.log("LOG: --------------------------");
            console.log("LOG: item,index", item, index);
            console.log("LOG: --------------------------");
            return null;
        }
      })}
    </Tabs>
  );
};

export default SendProposal;

const styles = StyleSheet.create({
  tabStyle: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  questionStyle: { fontSize: 18, textAlign: "center" },
  buttonStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: -20
  },
  helperTextWithInput: {
    color: "#ff0000",
    textAlign: "right"
  }
});
