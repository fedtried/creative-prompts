import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        modals: modalSlice.reducer,
        auth: authSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector