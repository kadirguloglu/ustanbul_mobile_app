import React from "react";
import { View, Text } from "native-base";

import styles from "../styles";

const HeaderHello = props => {
  const { activeUser } = props;
  return (
    <View style={styles.view3}>
      <Text style={styles.text1}>Hoşgeldin</Text>
      {activeUser.Id != 0 ? (
        activeUser.IsCompany ? (
          <Text style={styles.text2}>
            {activeUser.Companys.AuthorizedPersonName}
          </Text>
        ) : activeUser.Customers ? (
          <Text style={styles.text3}>
            {activeUser.Customers.Name} {activeUser.Customers.Surname}
          </Text>
        ) : null
      ) : null}
    </View>
  );
};

export default HeaderHello;
