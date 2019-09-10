import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Body, CheckBox, ListItem } from "native-base";
import i18n from "../../../constants/strings";

const ContractContent = props => {
  const {
    serviceParameter,
    handleSetStateContract,
    handleContractOpen,
    contracts
  } = props;

  return contracts.map((item, index) => {
    if (serviceParameter.Contracts[index]) {
      return (
        <ListItem key={"contract" + item.ID}>
          <CheckBox
            checked={serviceParameter.Contracts[index].Choose}
            onPress={() =>
              handleSetStateContract(
                index,
                !serviceParameter.Contracts[index].Choose
              )
            }
          />
          <Body>
            <TouchableOpacity onPress={() => handleContractOpen(item, index)}>
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

export default ContractContent;
