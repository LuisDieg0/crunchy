import React from "react";
import { any } from "prop-types";

const AppContext = React.createContext({
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
