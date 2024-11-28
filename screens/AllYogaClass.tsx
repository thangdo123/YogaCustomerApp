import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllYogaClass, searchYogaClass } from "../store/slices/AllYogaClass";
import { addToCart } from "../store/slices/Cart";

export default function YogaClasses() {
  const dispatch = useDispatch<AppDispatch>();
  const { yogaClasses } = useSelector(
    (state: RootState) => state.allYogaClassState
  );
  const { cartItems } = useSelector((state: RootState) => state.cartState);

  const [searchInput, setSearchInput] = useState("");

  const onSearch = (input: string) => {
    setSearchInput(input);
    if (input) {
      dispatch(searchYogaClass(input));
    } else {
      dispatch(getAllYogaClass());
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Warning",
      "The class is already added in cart",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  useEffect(() => {
    dispatch(getAllYogaClass());
  }, []);

  return (
    <View className="h-full px-4 py-2">
      <TextInput
        placeholder="Search by day of the week or time"
        className="border border-black p-2 rounded-lg mb-4"
        value={searchInput}
        onChangeText={onSearch}
      />
      <Text className="text-xl font-bold mb-2">List Of Yoga Classes</Text>
      <FlatList
        className="max-h-[700px]"
        data={yogaClasses}
        renderItem={({ item }) => (
          <View className="flex flex-col border rounded-lg border-black mb-4 p-4 bg-[#9b00be]">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-white">
                {item.teacher}
              </Text>
              <Text className="text-lg font-bold text-white">{item.date}</Text>
            </View>
            <View className="flex flex-row justify-between items-end">
              <View>
                <Text className="text-white">
                  <Text className="font-bold">Type of class:</Text>{" "}
                  {item.course.typeOfClass}
                </Text>
                <Text className="text-white">
                  <Text className="font-bold">Price:</Text> {item.course.price}$
                </Text>
                <Text className="text-white">
                  <Text className="font-bold">Comments:</Text>{" "}
                  {item.comments ? item.comments : "None"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const itemInCart = cartItems.find(
                    (cartItem: any) => cartItem.id === item.id
                  );
                  if (!itemInCart) {
                    dispatch(addToCart(item));
                  } else {
                    showAlert();
                  }
                }}
                className="bg-pink-600 w-fit h-fit py-2 px-8 rounded-md"
              >
                <Text className="text-white font-bold text-md">Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
