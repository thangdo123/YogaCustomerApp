import { configureStore } from "@reduxjs/toolkit";
import { allYogaCourseState } from "./slices/YogaCourse";
import { allYogaClassByCourseState } from "./slices/YogaClassByCourse";
import { allYogaClassState } from "./slices/AllYogaClass";
import { authState } from "./slices/auth";
import { cartState } from "./slices/Cart";
import { allBookingsState } from "./slices/AllBookings";

const store = configureStore({
  reducer: {
    [allYogaCourseState.name]: allYogaCourseState.reducer,
    [allYogaClassByCourseState.name]: allYogaClassByCourseState.reducer,
    [allYogaClassState.name]: allYogaClassState.reducer,
    [authState.name]: authState.reducer,
    [cartState.name]: cartState.reducer,
    [allBookingsState.name]: allBookingsState.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
