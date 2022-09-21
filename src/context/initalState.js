import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();


export const initialState = {
  user: null,
  foodItems: null,
  cartShow: false,

};