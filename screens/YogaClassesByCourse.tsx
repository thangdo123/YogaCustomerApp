import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllYogaClassByCourse } from "../store/slices/YogaClassByCourse";

export default function YogaClassesByCourse({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) {
  const { courseId } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const { yogaClassesByCourse } = useSelector(
    (state: RootState) => state.allYogaClassByCourseState
  );

  useEffect(() => {
    dispatch(getAllYogaClassByCourse(courseId));
  }, []);

  return (
    <View className="h-full px-4 py-2">
      <Text className="text-xl font-bold mb-2">List Of Yoga Classes</Text>
      <FlatList
        className="max-h-[700px]"
        data={yogaClassesByCourse}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex flex-col border rounded-lg border-black mb-4 p-4 bg-[#9b00be]">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-white">
                {item.teacher}
              </Text>
              <Text className="text-lg font-bold text-white">{item.date}</Text>
            </View>
            <Text className="text-white">
              <Text className="font-bold">Comments:</Text>{" "}
              {item.comments ? item.comments : "None"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
