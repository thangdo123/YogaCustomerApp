import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import YogaClassesByCourse from "../screens/YogaClassesByCourse";
import SignIn from "../screens/SignIn";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Home from "../screens/Home";
import YogaClasses from "../screens/AllYogaClass";
import { getToken } from "../utils/token.utils";
import { useEffect, useState } from "react";
import { getAllYogaCourse } from "../store/slices/YogaCourse";
import SignUp from "../screens/SignUp";
import { signOut } from "../store/slices/auth";
import Cart from "../screens/Cart";
import BookingList from "../screens/BookingList";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserProvider() {
  const [hasToken, setHasToken] = useState(false);
  const { isSignedIn, isSignedOut } = useSelector(
    (state: RootState) => state.authState
  );

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        console.log("HIT");
        setHasToken(true);
      } else {
        console.log("HIT no token");
        setHasToken(false);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    console.log("Sign in state:" + isSignedIn);
    if (isSignedIn) {
      setHasToken(true);
    }
  }, [isSignedIn]);

  useEffect(() => {
    console.log("Sign out state:" + isSignedOut);
    if (isSignedOut) {
      setHasToken(false);
    }
  }, [isSignedOut]);
  return (
    <>
      {hasToken ? (
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="YogaClassesByCourse"
            component={YogaClassesByCourse}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </>
  );
}

function MyTabs() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
        component={Home}
      />
      <Tab.Screen
        name="All Yoga Class"
        options={{
          tabBarIcon: () => <Entypo name="list" size={24} color="black" />,
        }}
        component={YogaClasses}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
        component={Cart}
      />
      <Tab.Screen
        name="Bookings"
        options={{
          tabBarIcon: () => <AntDesign name="book" size={24} color="black" />,
        }}
        component={BookingList}
      />
      <Tab.Screen
        name="Logout"
        options={{
          tabBarIcon: () => <AntDesign name="logout" size={24} color="black" />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(signOut()); // Dispatch the logout action
          },
        }}
      >
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
