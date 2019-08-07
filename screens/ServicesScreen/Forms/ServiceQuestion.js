import React from "react";
import { View, TouchableHighlight, TouchableOpacity } from "react-native";
import {
  Icon,
  Text,
  Input,
  Item,
  DatePicker,
  Picker,
  Body,
  CheckBox,
  ListItem
} from "native-base";

const ServiceQuestion = props => {
  const {
    serviceServiceResponse,
    serviceParameter,
    handleSetStateQuestion,
    viewPager,
    handleNumericMaxMinRegex,
    handleDatePickerMaxMinValue,
    styles,
    questIndex,
    PAGES,
    _handleSetInitialState,
    page,
    handleCreateService
  } = props;
  const item =
    serviceServiceResponse.serviceCreateDataResult.Questions[questIndex - 7];
  const i = questIndex - 7;
  if (item == undefined) {
    return null;
  }
  if (item.QuestionType == 1) {
    return (
      <View key={"renderPage" + questIndex} style={styles.pageTopView}>
        <View>
          <Text style={styles.QuestionTitle}>{item.Question}</Text>
        </View>
        <Item rounded>
          <Input
            onChangeText={value =>
              handleSetStateQuestion(i, value, item.Answers[0].ID)
            }
            value={serviceParameter.Questions[i].Answer}
          />
        </Item>
        <View>
          <Text
            style={
              serviceParameter.Questions[i].Answer.length >
                item.QuestionMinValue &&
              serviceParameter.Questions[i].Answer.length <
                item.QuestionMaxValue
                ? styles.help_block_success
                : styles.help_block_error
            }
          >
            {item.IsRequired ? "** " : ""}
            {serviceParameter.Questions[i].Answer.length} /{" "}
            {item.QuestionMaxValue}{" "}
          </Text>
        </View>
        {page == PAGES.length - 1 ? (
          <View style={styles.buttonContainer}>
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <TouchableHighlight
                onPress={() => handleCreateService()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Tamamla</Text>
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() =>
                _handleSetInitialState("activeViewPagerPage", page)
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        )}
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
                handleSetStateQuestion(i, value, item.Answers[0].ID)
              }
              value={serviceParameter.Questions[i].Answer}
            />
          </Item>
        </View>
        <View>
          {handleNumericMaxMinRegex(
            item.QuestionMaxValue,
            item.QuestionMinValue,
            serviceParameter.Questions[i].Answer
          ) ? (
            <Text />
          ) : (
            <Text style={styles.help_block_error}>
              {item.IsRequired ? "** " : ""}Lütfen geçerli bir değer giriniz. En
              fazla : {item.QuestionMaxValue}, En az : {item.QuestionMinValue}
            </Text>
          )}
        </View>
        {page == PAGES.length - 1 ? (
          <View style={styles.buttonContainer}>
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <TouchableHighlight
                onPress={() => handleCreateService()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Tamamla</Text>
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() =>
                _handleSetInitialState("activeViewPagerPage", page)
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        )}
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
                handleSetStateQuestion(i, value, item.Answers[0].ID)
              }
              value={serviceParameter.Questions[i].Answer}
            />
          </Item>
        </View>
        <View>
          {handleDatePickerMaxMinValue(
            item.QuestionMaxValue,
            item.QuestionMinValue,
            serviceParameter.Questions[i].Answer
          ) ? (
            <Text />
          ) : (
            <Text style={styles.help_block_error}>
              {item.IsRequired ? "** " : ""}Lütfen geçerli bir değer giriniz. En
              fazla : {item.QuestionMaxValue}, En az : {item.QuestionMinValue}
            </Text>
          )}
        </View>
        {page == PAGES.length - 1 ? (
          <View style={styles.buttonContainer}>
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <TouchableHighlight
                onPress={() => handleCreateService()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Tamamla</Text>
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() =>
                _handleSetInitialState("activeViewPagerPage", page)
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        )}
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
                serviceParameter.Questions[i].Answer +
                "~" +
                serviceParameter.Questions[i].AnswerID
              }
              onValueChange={value =>
                handleSetStateQuestion(
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
          {serviceParameter.Questions[i].Answer ? (
            <Text />
          ) : (
            <Text style={styles.help_block_error}>
              {item.IsRequired ? "** " : ""}Lütfen bir seçim yapınız
            </Text>
          )}
        </View>
        {page == PAGES.length - 1 ? (
          <View style={styles.buttonContainer}>
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <TouchableHighlight
                onPress={() => handleCreateService()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Tamamla</Text>
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() =>
                _handleSetInitialState("activeViewPagerPage", page)
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
  if (item.QuestionType == 5) {
    return (
      <View key={"renderPage" + questIndex} style={styles.pageTopView}>
        <View>
          <Text style={styles.QuestionTitle}>{item.Question}</Text>
        </View>
        <View>
          {item.Answers.map((checkbox, ix) => {
            let Checked;
            if (serviceParameter.Questions[i].Answers) {
              if (serviceParameter.Questions[i].Answers.length) {
                const data = serviceParameter.Questions[i].Answers.find(
                  item => item.AnswerIndex == ix
                );
                if (data) {
                  Checked = data.Checked;
                }
              }
            }
            return (
              <ListItem key={"checkbox-" + ix + "-" + checkbox.ID}>
                <CheckBox
                  checked={Checked === undefined ? false : Checked}
                  onPress={value =>
                    handleSetStateQuestion(
                      i,
                      checkbox.AnswerTextOrPlaceHolder,
                      checkbox.ID,
                      Checked === undefined ? true : !Checked,
                      item.QuestionType,
                      ix
                    )
                  }
                />
                <Body>
                  <TouchableOpacity
                    onPress={() =>
                      handleSetStateQuestion(
                        i,
                        checkbox.AnswerTextOrPlaceHolder,
                        checkbox.ID,
                        Checked === undefined ? true : !Checked,
                        item.QuestionType,
                        ix
                      )
                    }
                  >
                    <Text>{checkbox.AnswerTextOrPlaceHolder}</Text>
                  </TouchableOpacity>
                  {/* <Text>{checkbox.AnswerTextOrPlaceHolder}</Text> */}
                </Body>
              </ListItem>
            );
          })}
        </View>
        {item.IsRequired ? (
          <View>
            <Text style={styles.help_block_error}>
              Lütfen bir seçim yapınız
            </Text>
          </View>
        ) : null}
        {page == PAGES.length - 1 ? (
          <View style={styles.buttonContainer}>
            {serviceServiceResponse.serviceCreateLoading ? (
              <Spinner color="blue" />
            ) : (
              <TouchableHighlight
                onPress={() => handleCreateService()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Tamamla</Text>
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() =>
                _handleSetInitialState("activeViewPagerPage", page)
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
  return null;
};

export default ServiceQuestion;
