// import React, { Component } from "react";
// import AuthNavigation from "./AuthNavigation";
// import AppNavigation from "./AppNavigation";
// import auth from "@react-native-firebase/auth";

// export default class navigator extends Component {
//   subscriber = () => {};
//   componentDidMount() {
//     this.subscriber = auth().onAuthStateChanged(user => {
//       console.log("subscriber", user);
//     });
//   }

//   componentWillUnmount() {
//     this.subscriber();
//   }

//   render() {
//     const { auth: { login: { uid = null } = {} } = {} } = this.props;

//     //  return <AppNavigation {...this.props}></AppNavigation>;
//     console.log("uid", uid);
//     if (uid !== null) {
//       return <AppNavigation {...this.props}></AppNavigation>;
//     }
//     return <AuthNavigation {...this.props}></AuthNavigation>;
//   }
// }

import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";

export default function navigator(props) {
  // Set an initializing state whilst Firebase connects
  const currentUser = auth().currentUser;
  console.log(currentUser);
  const [initializing, setInitializing] = useState(currentUser === null);
  const [user, setUser] = useState(currentUser);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber();
    }; // unsubscribe on unmount
  }, []);

  if (initializing)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (!user) {
    return <AuthNavigation {...props}></AuthNavigation>;
  }
  return <AppNavigation {...props}></AppNavigation>;
}
