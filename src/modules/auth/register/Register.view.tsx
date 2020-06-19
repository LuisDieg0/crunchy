import React, { Component } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { RegisterProps, LoginState } from "@gotumi-modules/auth";
import { constantes } from "../../../utils/constantes";
import Form from "./Register.form";

export default class LoginView extends Component<RegisterProps, LoginState> {
  apiResponse = (props: RegisterProps) => {
    const actionLogin = props.register.action;
    const messageLogin = props.register.message;

    switch (actionLogin) {
      case props.status.SUCCESS:
        this.props.clearAction();
        this.showAlert(constantes.ALERT_SUCCES, messageLogin);
        break;

      case props.status.SUCCESS:
        this.props.clearAction();
        this.showAlert(-1, messageLogin);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form></Form>
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
          },
        },
      ],
      { cancelable: false }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  buttonLoggin: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
  },
});
