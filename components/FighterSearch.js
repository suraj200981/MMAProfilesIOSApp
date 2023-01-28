import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

export default function FighterSearch(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [searchSpinner, setSpinner] = useState(false);

  let jsonVal = [];

  const handleButtonClick = async () => {
    console.log("searching for " + text);
    setSpinner(true);
    props.sendSearchSpinner(true);

    //make send data empty
    setData([]);
    props.sendData([]);

    try {
      const response = await axios.get(
        "https://mma-fighter-profile-api-appdev.herokuapp.com/api/search?name=" +
          text
      );
      jsonVal = response.data;
      setData(jsonVal);
      props.sendData(jsonVal);
      setSpinner(false);
      props.sendSearchSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
      props.sendSearchSpinner(false);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        style={{
          flex: 1,
          height: 30,
          borderColor: "black",
          borderWidth: 1,
          maxWidth: 250,
          minWidth: 200,
          paddingHorizontal: 15,
          borderRadius: 20,
          backgroundColor: "#fff",
        }}
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button
        title="Search"
        color="blue"
        onPress={handleButtonClick}
        buttonStyle={styles.searchButton}
        titleStyle={styles.searchButtonTitle}
      ></Button>
      {/* {searchSpinner && <ActivityIndicator size="large" color="#0000ff" />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 40,
    paddingTop: 20,
  },
  name: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  searchButton: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 10,
    paddingTop: 20,
  },
  searchButtonTitle: {
    color: "white",
    fontWeight: "bold",
  },
});
