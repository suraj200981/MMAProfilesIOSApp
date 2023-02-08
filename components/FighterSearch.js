import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function FighterSearch(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [searchSpinner, setSpinner] = useState(false);
  const [allNames, setAllNames] = useState([]);

  let jsonVal = [];

  //function to get all names from api
  function getAllNames() {
    fetch(
      "https://mma-fighter-profile-api-appdev.herokuapp.com/api/allNames"
    ).then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
          setAllNames(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //get text
  function getText() {
    if (text != null) {
      return text;
    }
  }

  const handleButtonClick = async () => {
    getAllNames();

    if (text.match(/^\s*$/)) {
      Alert.alert("Please enter a fighter");
      setText("");
    } else {
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
    }
  };

  function checkNames(newText) {
    setText(newText);
    let closestMatch = "";
    let closestMatchDistance = 100;
    let currentMatchDistance = 0;
    let currentMatch = "";
    let currentName = "";
    let currentNameArray = [];
    let textArray = newText.toLowerCase().split("");

    let x = 0;
    while (true) {
      for (let j = 0; j < text.length; j++) {
        if (allNames[x] == textArray[j]) {
          console.log(String(allNames[x]) + " and " + textArray[j]);
          console.log("match");
          currentMatchDistance++;
        } else {
          x++;
          break;
        }
      }

      if (currentMatchDistance < closestMatchDistance) {
        closestMatch = currentName;

        closestMatchDistance = currentMatchDistance;
        break;
      }

      currentMatchDistance = 0;
    }

    console.log("Closest match: ", closestMatch);
  }

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
        autoCorrect={false}
        onChangeText={checkNames}
        defaultValue={text}
      />
      <Button
        title="Search"
        color="blue"
        onPress={handleButtonClick}
        buttonStyle={styles.searchButton}
        titleStyle={styles.searchButtonTitle}
      ></Button>
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
