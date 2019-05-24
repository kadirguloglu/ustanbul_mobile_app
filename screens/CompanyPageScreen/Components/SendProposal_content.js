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
    proposalModel
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
              onChangeText={value => _handleSetInitialState("Price", value)}
              value={proposalModel.Price}
            />
          </Item>
        </View>
        <View>
          <Text>{"* Zorunlu alan"}</Text>
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
                        proposalModel.Questions[index]
                          ? proposalModel.Questions[index].Answer[0].Answer
                          : ""
                      }
                    />
                  </Item>
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
                        : ["tabProposalSendActivePage", index + 2]
                    }
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
                        if (!newValue.Questions) newValue.Questions = [];
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                      value={
                        proposalModel.Questions &&
                        proposalModel.Questions[index]
                          ? proposalModel.Questions[index].Answers.Answer
                          : ""
                      }
                    />
                  </Item>
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
                        : ["tabProposalSendActivePage", index + 2]
                    }
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
                        if (!newValue.Questions) newValue.Questions = [];
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                      value={
                        proposalModel.Questions &&
                        proposalModel.Questions[index]
                          ? proposalModel.Questions[index].Answer[0].Answer
                          : ""
                      }
                    />
                  </Item>
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
                        : ["tabProposalSendActivePage", index + 2]
                    }
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
                        proposalModel.Questions[index]
                          ? proposalModel.Questions[index].Answer[0].Answer
                          : ""
                      }
                      onValueChange={value => {
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
                        if (!newValue.Questions) newValue.Questions = [];
                        newValue.Questions[index] = questions;
                        _handleSetInitialState("proposalModel", newValue);
                      }}
                    >
                      {item.Answers.map(ans => {
                        return (
                          <Picker.Item
                            key={"dropdown" + ans.ID}
                            label={ans.AnswerTextOrPlaceHolder}
                            value={ans.ID}
                          />
                        );
                      })}
                    </Picker>
                  </Item>
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
                        : ["tabProposalSendActivePage", index + 2]
                    }
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
                            proposalModel.Questions &&
                            proposalModel.Questions[index] &&
                            proposalModel.Questions[index].Answers &&
                            proposalModel.Questions[index].Answers[ix]
                              ? true
                              : false
                          }
                          onPress={value => {
                            debugger;
                            const newValue = { ...proposalModel };
                            if (!newValue.Questions) {
                              newValue.Questions = [];
                            } else {
                              if (!newValue.Questions[index]) {
                                delete newValue.Questions[index].Answers[ix];
                              }
                            }
                            if (
                              newValue.Questions[index] &&
                              newValue.Questions[index].Answers
                            ) {
                              delete newValue.Questions[index].Answers[ix];
                            }
                            const questions = {
                              ID: item.ID,
                              Question: item.Question,
                              Answers: []
                            };
                            if (newValue.Questions[index]) {
                              questions = newValue.Questions[index].Answers;
                            }
                            newValue.Questions[index] = questions;
                            if (value) {
                              newValue.Questions[index].Answers[ix] = {
                                ID: checkbox.ID,
                                Answer: value,
                                AnswerTextOrPlaceHolder:
                                  checkbox.AnswerTextOrPlaceHolder
                              };
                            }
                            _handleSetInitialState("proposalModel", newValue);
                          }}
                        />
                        <Body>
                          <TouchableOpacity
                            onPress={value => {
                              const newValue = { ...proposalModel };
                              if (!newValue.Questions) {
                                newValue.Questions = [];
                              } else {
                                if (!newValue.Questions[index].Answers) {
                                  delete newValue.Questions[index].Answers[ix];
                                }
                              }
                              const questions = {
                                ID: item.ID,
                                Question: item.Question,
                                Answers: [...newValue.Questions[index].Answers]
                              };
                              newValue.Questions[index] = questions;
                              if (value) {
                                newValue.Questions[index].Answers[ix] = {
                                  ID: checkbox.ID,
                                  Answer: value,
                                  AnswerTextOrPlaceHolder:
                                    checkbox.AnswerTextOrPlaceHolder
                                };
                              }
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
                  />
                </View>
              </Tab>
            );
          default:
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
  }
});