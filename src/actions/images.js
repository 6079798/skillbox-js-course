import { getImagesByPage } from "../services/imageService";
import { likeImage, unlikeImage } from "../services/likeService";
import { addShortId, extractDataFromResponse } from "../utils";

export const REQUEST_IMAGES = "REQUEST_IMAGES";
const requestImages = () => ({
  type: REQUEST_IMAGES
});

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
const receiveImages = (images, lastPage) => ({
  type: RECEIVE_IMAGES,
  images,
  lastPage
});

export const SET_LIKE = "SET_LIKE";
export const setLike = imageId => async dispatch => {
  dispatch({
    type: SET_LIKE,
    imageId
  });
  try {
    await likeImage(imageId);
  } catch (error) {}
};

export const DELETE_LIKE = "DELETE_LIKE";
export const deleteLike = imageId => async dispatch => {
  dispatch({
    type: DELETE_LIKE,
    imageId
  });
  try {
    await unlikeImage(imageId);
  } catch (error) {}
};

export const fetchImages = page => async dispatch => {
  dispatch(requestImages());
  try {
    const { data, headers } = await getImagesByPage(page);
    const images = addShortId(extractDataFromResponse(data));
    const lastPage = Math.round(headers["x-total"] / 10);
    return dispatch(receiveImages(images, lastPage));
  } catch (error) {}
};
