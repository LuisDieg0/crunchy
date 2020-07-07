import React from "react";
import { isPortail, isTablet } from "../utils/validations";

const AppContext = React.createContext({
  listenerChangeDimension: {
    addEventListener: (event: any) => {}
  },
  getDimension: () => {
    return () => ({
      window: { height: 0, width: 0 },
      screen: { height: 0, width: 0 },
      isPortail,
      isTablet
    });
  },
  listenerChangeVideo: {
    addEventListener: (event: any) => {}
  },
  changeVideo: () => {
    return (video: any) => {};
  },
  listenerSearch: {
    addEventListener: (event: any) => {}
  },
  onSearch: () => {
    return (text: string) => {};
  }
});
export default AppContext;
