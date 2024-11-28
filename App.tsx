import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import { Provider } from "react-redux";
import store from "./store";
import UserProvider from "./provider/UserProvider";
import { removeToken } from "./utils/token.utils";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <UserProvider />
      </Provider>
    </NavigationContainer>
  );
}
