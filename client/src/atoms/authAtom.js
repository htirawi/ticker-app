import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    expiresIn: null,
    username: "",
  },
});
