import { ConfigDialog } from "@gotumi-components";
// Initial state
const initialStateLoading = {
  visible: false
};

const initialStateDialog = {
  isLoading: false
};

// Actions
export const LOADING = "@ACTION.LOADING";
export const DIALOG = "@ACTION.DIALOG";
export const NAVIGATION = "@ACTION.NAVIGATION";
export const CHANGE_VIDEO = "@ACTION.CHANGE_VIDEO";

// Action creators
export const actionChangeLoading = (status: boolean) => ({
  type: LOADING,
  status
});

export const actionDialog = (visible: boolean, config?: ConfigDialog) => ({
  type: DIALOG,
  object: {
    config,
    visible
  }
});

export const changeNavigation = (object: any) => ({
  type: NAVIGATION,
  object
});

export const actionchangeVideo = (object: any) => ({
  type: CHANGE_VIDEO,
  object
});

// Reducer
export const loading = (state = initialStateLoading, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        isLoading: action.status
      };
    default:
      return state;
  }
};

export const dialog = (state = initialStateDialog, action: any) => {
  switch (action.type) {
    case DIALOG:
      return action.object;
    default:
      return state;
  }
};

export const navigation = (state = { index: 0 }, action: any) => {
  switch (action.type) {
    case NAVIGATION:
      return action.object;
    default:
      return state;
  }
};

export const changeVideo = (state = initialStateDialog, action: any) => {
  switch (action.type) {
    case CHANGE_VIDEO:
      console.log("action", action);
      return action.object;
    default:
      return state;
  }
};
