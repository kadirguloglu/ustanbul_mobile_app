import LogoutScreen from "../LogoutScreen/LogoutScreen"
import { createDrawerNavigator } from "react-navigation";
const LogoutScreenRouter = createDrawerNavigator(
  {
    Logout: { screen: LogoutScreen }
  }
);
export default LogoutScreenRouter;
