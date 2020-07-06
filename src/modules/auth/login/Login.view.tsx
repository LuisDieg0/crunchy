import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { LoginProps, LoginState } from "@gotumi-modules/auth";
import { constantes } from "../../../utils/constantes";
import { statusBarHeight } from "../../../components/toolbar/ToolBar";
import LoginForm from "./Login.form";
import { createStore, combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { Provider } from "react-redux";

const Store = createStore(
  combineReducers({
    form
  })
);

export default class LoginView extends Component<LoginProps, LoginState> {
  UNSAFE_componentWillReceiveProps(props: LoginProps) {
    console.log("props", props);
    this.apiResponse(props);
  }

  UNSAFE_componentWillMount() {
    this.props.changeLoading(false);
  }

  login = values => {
    this.props.changeLoading(true);
    this.props.callApiLogin(
      Object.assign({}, values, {
        isLoading: true
      })
    );
  };
  apiResponse = (props: LoginProps) => {
    const actionLogin = props.login.action;
    const messageLogin = props.login.message;

    switch (actionLogin) {
      case props.status.SUCCESS:
        this.props.clearAction();
        // this.props.navigation.navigate("$routes.register.dialog", {});
        break;

      case props.status.ERROR:
        this.props.clearAction();
        const dialog = {};
        dialog.message = messageLogin;
        dialog.buttons = [];
        // this.props.navigation.navigate("$routes.register.dialog", dialog);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && (
          <View
            style={{
              backgroundColor: "white",
              height: statusBarHeight,
              width: "100%"
            }}
          />
        )}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={"dark-content"}
          animated
        />

        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View
            style={{
              marginTop: StatusBar.currentHeight
            }}
          ></View>
          <Provider store={Store}>
            {/* <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                marginTop: 10
              }}
            >
              <Image
                style={{ height: 80, width: 200, resizeMode: "contain" }}
                source={require("../../../../assets/ic_logo.png")}
              />
            </View> */}
            <View
              style={{
                padding: 10,
                margin: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#CCCCCC"
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <Text style={{ color: "#005ABA" }}>Iniciar sesión</Text>
              </View>

              <LoginForm login={this.login} />
            </View>
          </Provider>
        </ScrollView>
      </View>
    );
  }

  showAlert = (type: number, message: string) => {
    Alert.alert(
      "",
      message,
      [
        {
          text: "Aceptar",
          onPress: () => {
            switch (type) {
              case constantes.ALERT_DELETE:
                // this.props.deleteConstruction(this.state.dataForm.id);
                break;
              case constantes.ALERT_UPDATE:
                // this.props.navigation.goBack();
                break;
              case constantes.ALERT_SUCCES:
                // this.props.navigation.goBack();
                break;
              default:
                break;
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  linearGradient: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  buttonLoggin: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4C939E",
    borderRadius: 20,
    width: 200
  }
});
