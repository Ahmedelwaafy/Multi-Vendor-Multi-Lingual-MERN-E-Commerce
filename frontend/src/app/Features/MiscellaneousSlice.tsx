import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IProductType } from "@/types/CardsTypes";
type Theme = "dark" | "light";
type showProductQuickViewPopUpProps = {
  visible: boolean;
  product: IProductType | null;
};
interface MiscellaneousState {
  toggleLogOutPopUp: boolean;
  showProductQuickViewPopUp: showProductQuickViewPopUpProps;
  theme: Theme;
  currentUserMenuTab: string;
  currentVendorMenuTab: string;
}
const initialState: MiscellaneousState = {
  toggleLogOutPopUp: false,
  showProductQuickViewPopUp: { visible: false, product: null },
  theme: (localStorage.getItem("theme") as Theme) || null,
  currentUserMenuTab: "",
  currentVendorMenuTab: "",
};

export const MiscellaneousSlice = createSlice({
  name: "Miscellaneous",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setToggleLogOutPopUp: (state, action: PayloadAction<boolean>) => {
      state.toggleLogOutPopUp = action.payload;
    },
    setShowProductQuickViewPopUp: (
      state,
      action: PayloadAction<showProductQuickViewPopUpProps>
    ) => {
      state.showProductQuickViewPopUp = action.payload;
    },

    setCurrentUserMenuTab: (state, action: PayloadAction<string>) => {
      state.currentUserMenuTab = action.payload;
    },
    setCurrentVendorMenuTab: (state, action: PayloadAction<string>) => {
      state.currentVendorMenuTab = action.payload;
    },
  },
});

export default MiscellaneousSlice.reducer;
export const {
  setToggleLogOutPopUp,
  setShowProductQuickViewPopUp,
  setTheme,
  setCurrentUserMenuTab,
  setCurrentVendorMenuTab,
} = MiscellaneousSlice.actions;

export const toggleLogOutPopUp = (state: RootState) =>
  state.Miscellaneous.toggleLogOutPopUp;
export const showProductQuickViewPopUp = (state: RootState) =>
  state.Miscellaneous.showProductQuickViewPopUp;
export const theme = (state: RootState) => state.Miscellaneous.theme;
export const currentUserMenuTab = (state: RootState) =>
  state.Miscellaneous.currentUserMenuTab;
export const currentVendorMenuTab = (state: RootState) =>
  state.Miscellaneous.currentVendorMenuTab;
