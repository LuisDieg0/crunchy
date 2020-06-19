import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import colors from "../../styles/colors";
// import { TextField } from "react-native-material-textfield";
export default class TextForm extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style,
      title,
      enable,
      ph,
      input,
      keyboardType,
      multiline,
      maxLength,
      meta,
      autoCapitalize = true,
      backgroundColor,
      secureTextEntry
    } = this.props;
    console.log("propsForm", this.props);

    return (
      <View style={[{ marginTop: 10 }, style]}>
        {title && (
          <Text style={{ fontSize: 12, color: colors.gray }}>{title}</Text>
        )}

        <TextInput
          editable={enable}
          style={{
            alignItems: "center",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#4C939E",
            padding: 7,
            margin: 2
          }}
          secureTextEntry={secureTextEntry}
          placeholder={ph}
          value={input.value}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          onChangeText={value => {
            input.onChange(value);
            console.log("onChangeText");
          }}
        ></TextInput>

        {/* <View style={styles.linea} /> */}
        {showError(meta) && (
          <Text style={styles.errors}>{showError(meta)}</Text>
        )}
      </View>
    );
  }
}

const showError = meta => {
  if (meta !== undefined && meta.touched !== undefined && meta.touched) {
    return meta.error;
  }
  return undefined;
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#4C64FF",
    padding: 15,
    width: 200
  },
  textInput: {
    fontSize: 13
  },
  textInputDisable: {
    fontSize: 13,
    color: colors.lightGray
  },
  errors: {
    color: "#FF0000",
    fontSize: 10,
    marginTop: -5,
    marginLeft: 5
  },
  signature: {
    width: 300,
    height: 200,
    borderWidth: 0.5
  },
  signatureContainer: {
    borderColor: "#000033",
    borderWidth: 0.5,
    borderRadius: 20,
    height: 220,
    width: 310,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  buttonsWhite: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10,
    marginLeft: 20,
    marginRight: 20
  },
  buttonGray: {
    alignItems: "center",
    borderRadius: 3,
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10
  },
  buttonsGreen: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: colors.green,
    padding: 10,
    marginLeft: 20,
    marginRight: 20
  },
  textGray: {
    color: colors.gray
  },
  textWhite: {
    color: colors.white
  },
  textTitle: {
    marginTop: 15,
    fontSize: 12
  },
  activeTabTextStyle: {
    backgroundColor: "#DBF1FF",
    borderColor: "#2D8BE0"
  },
  lineSignature: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5
  },
  containerPicker: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  textQuantity: {
    borderRadius: 2,
    marginBottom: 5,
    borderColor: "#D9E6E6E6",
    borderWidth: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
    fontSize: 13
  },
  titleSignature: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10
  }
});
