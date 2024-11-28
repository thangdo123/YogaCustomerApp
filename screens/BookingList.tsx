import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllYogaCourse } from "../store/slices/YogaCourse";
import { getAllBookings } from "../store/slices/AllBookings";

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookingList } = useSelector(
    (state: RootState) => state.allBookingsState
  );
  const [popupDetail, setPopUpDetail] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleViewDetails = (item: any) => {
    setSelectedItem(item); // Set the selected item for the modal
    setPopUpDetail(true); // Show the modal
  };

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <View className="h-full px-4 py-2">
      <Text className="text-xl font-bold mb-2">List Of Booked Classes</Text>
      <FlatList
        className="max-h-[700px]"
        data={bookingList}
        renderItem={({ item, index }) => (
          <View className="flex flex-col border rounded-lg border-black mb-4 p-4 bg-[#c912b7ad]">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-white">
                Order {index + 1}
              </Text>
              <View className="flex flex-col justify-center items-end">
                <Text className="text-lg font-bold text-white mb-2">
                  {new Date(item.bookedAt).toLocaleString()}
                </Text>
                <TouchableOpacity onPress={() => handleViewDetails(item)}>
                  <Text className="font-bold">View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {selectedItem && (
        <Modal
          animationType="none"
          transparent={true}
          visible={popupDetail}
          onRequestClose={() => setPopUpDetail(false)}
        >
          <View className="flex flex-col justify-center items-center h-full">
            <View className="bg-white p-4 min-w-[300px] rounded-lg">
              <Text className="text-lg font-bold mb-2">
                Details of Order {bookingList.indexOf(selectedItem) + 1}
              </Text>
              <Text>
                <Text className="font-bold">Total Price:</Text> {"$"}
                {selectedItem.items.reduce(
                  (total: number, item: any) =>
                    total + Number(item.course.price),
                  0
                )}
              </Text>
              <Text>
                <Text className="font-bold">Booked At:</Text>{" "}
                {new Date(selectedItem.bookedAt).toLocaleString()}
              </Text>
              <Text className="font-bold">Purchased classes:</Text>
              <FlatList
                className="max-h-72"
                data={selectedItem.items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View className="bg-gray-200 p-4 rounded-lg mb-4">
                    <Text className="text-sm mb-2">Date: {item.date}</Text>
                    <Text className="text-sm mb-2">
                      Teacher: {item.teacher}
                    </Text>
                    <Text className="text-sm mb-2">
                      Comments: {item.comments || "No comments"}
                    </Text>
                    <Text className="text-sm mb-2">
                      Class Type: {item.course.typeOfClass}
                    </Text>
                    <Text className="text-sm mb-2">
                      Day: {item.course.dayOfTheWeek}
                    </Text>
                    <Text className="text-sm mb-2">
                      Time: {item.course.time}
                    </Text>
                    <Text className="text-sm mb-2">
                      Price: ${item.course.price}
                    </Text>
                  </View>
                )}
              />
              <TouchableOpacity onPress={() => setPopUpDetail(false)}>
                <Text className="text-blue-500 mt-4">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
