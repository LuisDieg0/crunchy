/* eslint-disable camelcase */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import { TextForm } from "../../../components/forms/TextForm";
import colors from "../../../styles/colors";

const validate = values => {
  const errors = {};

  return errors;
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 8,
      document: "",
      indexSelect: 0
    };
  }

  componentDidMount() {}

  showAlert = message => {
    Alert.alert(
      "",
      message,
      [
        {
          text: "Aceptar",
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.handleSubmit(values => {
            let newValues = { ...values };

            // this.props.register(this.filterData(newValues));
          })}
          style={styles.buttonsGreen}
        >
          <Text style={styles.textWhite}>Registrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  texInput: {
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
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#F0F0F0",
    marginBottom: 10
  },
  buttonsGreen: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: colors.green,
    padding: 10
  },
  textWhite: {
    color: colors.white
  },
  textTitle: {
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.gray,
    fontSize: 14
  }
});

const mapStateToProps = state => ({
  document: state.document
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "RegisterForm",
    validate
  })(RegisterForm)
);
