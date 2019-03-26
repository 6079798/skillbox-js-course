import { getUser } from "../services/userService";

export const RECEIVE_USER = "RECEIVE_USER";
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const userLoggingIn = () => ({
  type: USER_LOGGING_IN
});

export const fetchUser = () => async dispatch => {
  try {
    const { data: user } = await getUser();
    return dispatch(receiveUser(user));
  } catch (error) {}
};
