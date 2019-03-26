import moment from "moment";
import { tokenKey } from "../config.json";

export const dateFormat = date => moment(date).format("DD.MM.YYYY");

export const getTokenFromStorage = () => localStorage[tokenKey];
