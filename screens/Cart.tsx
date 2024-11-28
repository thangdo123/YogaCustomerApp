import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { checkOut, clearCart, removeCartItem } from "../store/slices/Cart";
import { getAllBookings } from "../store/slices/AllBookings";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cartState);

  return (
    <View className="h-full px-4 py-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-xl font-bold mb-2">Items List</Text>
        <TouchableOpacity
          onPress={() => dispatch(clearCart())}
          className="flex flex-row items-center"
        >
          <Text>Clear cart</Text>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        className="max-h-[600px] h-full"
        data={cartItems}
        renderItem={({ item }) => (
          <View className="flex flex-col border rounded-lg border-black mb-4 p-4">
            <View className="flex flex-row justify-between">
              <View>
                <Text className="text-lg font-bold mb-2">
                  {item.course.typeOfClass}
                </Text>
                <View>
                  <Text className="">
                    <Text className="font-bold">Teacher:</Text> {item.teacher}
                  </Text>
                  <Text className="">
                    <Text className="font-bold">Date:</Text> {item.date}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-4">
                <Text className="text-lg font-bold ">{item.course.price}$</Text>
                <AntDesign
                  onPress={() => dispatch(removeCartItem(item.id))}
                  name="delete"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>
        )}
      />
      <View className="flex flex-row justify-end mt-4">
        {cartItems.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              dispatch(checkOut(cartItems)).then((data) => {
                Alert.alert(
                  "Success",
                  data.payload.message,
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
                dispatch(getAllBookings());
                dispatch(clearCart());
              });
            }}
            className="p-4 bg-green-500 rounded-lg"
          >
            <Text className="font-bold text-white text-lg">Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
