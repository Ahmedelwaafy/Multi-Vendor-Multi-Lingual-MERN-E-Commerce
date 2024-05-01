import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserData, IVendorData } from "@/types";
import Cookies from "js-cookie";

interface AuthenticationState {
  userSession: string | null;
  userData: IUserData | null;
  vendorSession: string | null;
  vendorData: IUserData | null;
  showLoginPopUp: boolean;
}
const initialState: AuthenticationState = {
  userSession: Cookies.get("UT") || null,
  userData: JSON.parse(localStorage.getItem("UD") as object) || null,
  vendorSession: Cookies.get("VT") || null,
  vendorData: JSON.parse(localStorage.getItem("VD") as object) || null,
  showLoginPopUp: false,
};
export const AuthorizedSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<string | null>) => {
      state.userSession = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUserData | null>) => {
      state.userData = action.payload;
    },
    setVendorSession: (state, action: PayloadAction<string | null>) => {
      state.vendorSession = action.payload;
    },
    setVendorData: (state, action: PayloadAction<IVendorData | null>) => {
      state.vendorData = action.payload;
    },
    setShowLoginPopUp: (state, action: PayloadAction<boolean>) => {
      state.showLoginPopUp = action.payload;
    },
  },
});

export default AuthorizedSlice.reducer;
export const {
  setUserData,
  setUserSession,
  setVendorData,
  setVendorSession,
  setShowLoginPopUp,
} = AuthorizedSlice.actions;
export const userSession = (state: RootState) =>
  state.Authentication.userSession;
export const userData = (state: RootState) => state.Authentication.userData;
export const vendorSession = (state: RootState) =>
  state.Authentication.vendorSession;
export const vendorData = (state: RootState) => state.Authentication.vendorData;
export const showLoginPopUp = (state: RootState) =>
  state.Authentication.showLoginPopUp;
