import { Platform } from "react-native";

const black = "#000";
const grey = "#ECECEC";
const white = "#FFFFFF";
const green = "#16816D";
const skyBlue = "#910729";// Color change
const darkred = "#6C061F"; // chnage by me
const lightBlack = "#313450";
const red = "#CA0000";
const darkBlack = "#333348";
const gradientColor = ["rgba(0,0,0,.7)", "transparent"];

const global = {
  headerColor: white,
  disableColor: "#cecfe3",
  underLayerColor: "#9D9FC7",
  // fontName: Platform.OS === "ios" ? "Raleway-Regular" : "RalewayRegular",
  activeOpacity: 0.9,
  grayBackgroundColor: "rgba(128,128,128,0.5)",
  redBackgroundColor: "rgba(255,0,0,0.3)",
  spinnerColor: "#fff",
  isDarkModeActive: false,
  primary: "#16816d",

  secondary: "#910729",
  ternary: "#30C93A",
  black,
  grey,
  white,
  green,
  skyBlue,
  darkred,
  red,
  lightBlack,
  darkBlack,
  fbColorBackground: "rgb(59, 89, 152)",
  gradientColor,
  fontSize_12: 12,
  fontSize_14: 14,
  fontSize_16: 16,
  fontSize_17: 17,
  fontSize_18: 18,
  fontSize_20: 20,
  fontSize_22: 22,
  fontSize_24: 24,
  fontSize_26: 26
};

export default global;
