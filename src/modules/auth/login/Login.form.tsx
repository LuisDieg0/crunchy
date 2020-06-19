import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { Field, reduxForm } from "redux-form";
import colors from "../../../styles/colors";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "email invalido";
  }

  if (!values.password) {
    errors.password = "requerido";
  }

  return errors;
};

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      passwordSecurity: true
    };
  }

  TexInputForm = props => (
    <View>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          styles.textInput
        ]}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder={props.ph}
          onChangeText={props.input.onChange}
          value={props.input.value}
          keyboardType={props.keyboardType ? props.keyboardType : "default"}
          autoCapitalize="none"
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          onBlur={props.input.onBlur}
        />
        {props.typePassword ? (
          <TouchableOpacity
            style={{
              alignItems: "center",
              padding: Platform.OS === "ios" ? 0 : 10
            }}
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              this.state.passwordSecurity
                ? this.setState({ passwordSecurity: false })
                : this.setState({ passwordSecurity: true });
            }}
          >
            <Image
              source={
                this.state.passwordSecurity
                  ? require("../../../../assets/showPassword.png")
                  : require("../../../../assets/hidePassword.png")
              }
              style={styles.image}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.meta.touched && props.meta.error && (
        <Text style={styles.errors}>{props.meta.error}</Text>
      )}
    </View>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field
          name="email"
          component={this.TexInputForm}
          ph="Correo Electrónico"
          keyboardType="email-address"
        />
        <Field
          name="password"
          component={this.TexInputForm}
          ph="Contraseña"
          secureTextEntry={this.state.passwordSecurity}
          typePassword
        />
        <TouchableOpacity
          onPress={handleSubmit(values => {
            this.props.login(values);
          })}
          style={styles.buttonsGreen}
        >
          <Text style={styles.textWhite}>Ingresar</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.nextScreen("RecoveryPassword");
          }}
          style={styles.buttonsWhite}
        >
          <Text style={styles.textGray}>Recuperar contraseña</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    borderColor: "#D9E6E6E6",
    borderWidth: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: Platform.OS === "ios" ? 12 : 0,
    paddingBottom: Platform.OS === "ios" ? 12 : 0,
    paddingLeft: Platform.OS === "ios" ? 12 : 5,
    paddingRight: Platform.OS === "ios" ? 12 : 5,
    fontSize: 13,
    color: colors.black
  },
  errors: {
    color: "#FF0000",
    fontSize: 10,
    marginTop: -5,
    marginLeft: 5
  },
  buttonsGreen: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: colors.green,
    padding: 10
  },
  buttonsWhite: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
    padding: 10
  },
  buttonsRed: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: colors.red,
    padding: 10
  },
  textGray: {
    color: "#828282"
  },
  textWhite: {
    color: colors.white
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    height: 25,
    width: 25
  }
});

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm);
