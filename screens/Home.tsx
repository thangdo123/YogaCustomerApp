import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllYogaCourse } from "../store/slices/YogaCourse";

export default function Home({ navigation }: { navigation: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { yogaCourses } = useSelector(
    (state: RootState) => state.allYogaCourseState
  );

  useEffect(() => {
    dispatch(getAllYogaCourse());
  }, []);

  return (
    <View className="h-full px-4 py-2">
      <Text className="text-xl font-bold mb-2">List Of Yoga Courses</Text>
      <FlatList
        className="max-h-[700px]"
        data={yogaCourses}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("YogaClassesByCourse", { courseId: item.id })
            }
            className="flex flex-col border rounded-lg border-black mb-4 p-4 bg-[#c912b7ad]"
          >
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-white">
                {item.typeOfClass}
              </Text>
              <Text className="text-lg font-bold text-white">
                {item.dayOfTheWeek}-{item.time}
              </Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-white">
                <Text className="font-bold">Capacity:</Text> {item.capacity}
              </Text>
              <Text className="text-white">
                <Text className="font-bold">Price:</Text> {item.price}$
              </Text>
              <Text className="text-white">
                <Text className="font-bold">Duration:</Text> {item.duration}
              </Text>
              <Text className="text-white">
                <Text className="font-bold">Description:</Text>{" "}
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
