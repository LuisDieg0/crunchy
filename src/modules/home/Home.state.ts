// Initial state
const initialStateLoading = {
  data: [],
  status: "",
  message: ""
};

// Actions
export const LIST = "@ACTION.LIST_PLAYLIS";
export const VIDEOS_BY_PLAYLIST = "@ACTION.VIDEOS_BY_PLAYLIST";

export const ERROR = "@STATUS.ERROR_LIST_PLAYLIS";
export const SUCCESS = "@STATUS.SUCCESS_LIST_PLAYLIS";
//
export const RESPONSE_LIST = "@ACTION.RESPONSE_LIST_PLAYLIS";
export const RESPONSE_VIDEOS = "@ACTION.RESPONSE_VIDEOS";

// Action creators
export const actionListPlaylist = (object: any) => ({
  type: LIST,
  object
});

export const actionVideos = (object: any) => ({
  type: VIDEOS_BY_PLAYLIST,
  object
});

export const actionResponseListPlaylist = (object: any) => ({
  type: RESPONSE_LIST,
  object
});

export const actionResponseVideos = (object: any) => ({
  type: RESPONSE_VIDEOS,
  object
});

// Reducer
export const list = (state = initialStateLoading, action: any) => {
  switch (action.type) {
    case RESPONSE_LIST:
      return action.object;
    default:
      return state;
  }
};

export const videos = (state = initialStateLoading, action: any) => {
  switch (action.type) {
    case RESPONSE_VIDEOS:
      return action.object;
    default:
      return state;
  }
};
