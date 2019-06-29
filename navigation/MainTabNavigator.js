import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import UserMenuScreen from "../screens/UserMenuScreen";
import LoginScreen from "../screens/AuthScreen";
import ServicesScreen from "../screens/ServicesScreen";
import CustomerDetailScreen from "../screens/CustomerPageScreen/CustomerDetailScreen";
import CustomerServiceScreen from "../screens/CustomerPageScreen/CustomerServiceScreen";
import SeeProposalScreen from "../screens/CustomerPageScreen/SeeProposalScreen";
import ChatScreen from "../screens/ChatScreen";
import ContactScreen from "../screens/ContactScreen";
import CompanyServiceScreen from "../screens/CompanyPageScreen";
import SeeServiceScreen from "../screens/CompanyPageScreen/SeeServiceScreen";
import SearchScreen from "../screens/SearchScreen";
// import LinksScreen from "../screens/LinksScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// import DepartmentScreen from "../screens/DepartmentScreen";
import SideMenu from "./SideMenu";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Anasayfa",
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home` : "ios-home"}
    />
  )
};

const SearchStack = createStackNavigator({
  Search: SearchScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: "Arama",
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-search` : "ios-search"}
    />
  )
};

const ServiceStack = createStackNavigator({
  ServiceStack: SeeServiceScreen
});

ServiceStack.navigationOptions = {
  tabBarLabel: "Hizmetler",
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-document" : "ios-document"}
    />
  )
};

const UserMenuStack = createStackNavigator({
  UserMenu: UserMenuScreen
});

UserMenuStack.navigationOptions = {
  tabBarLabel: "Profilim",
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "ios-person"}
    />
  )
};

// const LinksStack = createStackNavigator({
//   Links: LinksScreen
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: "Links",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     />
//   )
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Settings",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    ServiceStack,
    UserMenuStack
    // LinksStack,
    // SettingsStack
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

const drawer = createDrawerNavigator(
  {
    Home: { screen: tabNavigator },
    Login: { screen: LoginScreen },
    Service: { screen: ServicesScreen },
    CustomerDetail: { screen: CustomerDetailScreen },
    CustomerService: { screen: CustomerServiceScreen },
    SeeProposal: { screen: SeeProposalScreen },
    Contact: { screen: ContactScreen },
    Chat: { screen: ChatScreen },
    CompanyService: { screen: CompanyServiceScreen },
    SeeService: { screen: SeeServiceScreen }
  },
  {
    contentComponent: SideMenu
  }
);

const StackNavigator = createStackNavigator(
  {
    DrawerNavigator: drawer
  },
  {
    headerMode: "none"
  }
);

export default StackNavigator;
