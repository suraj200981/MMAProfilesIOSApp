import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FighterSearch(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [searchSpinner, setSpinner] = useState(false);
  const [allNames1, setAllNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let jsonVal = [];

  // useEffect(() => {
  //   //this will only get names with every search request
  //   setAllNames(JSON.stringify(AsyncStorage.getItem("allNames")));

  //   // console.log(props.opponentSearch, "in child");
  // }, []);

  //check if opponentSearch is not empty

  useEffect(() => {
    setText(props.opponentSearch);
  }, [props.opponentSearch]);

  function Dropdown({ names, onPress }) {
    return (
      <View>
        {text.length > 0 ? (
          <FlatList
            style={{ height: 100 }}
            data={names}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onPress(item)}>
                <Text style={styles.dropdown}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        ) : null}
      </View>
    );
  }

  //Dynamic filtering of names based on user input and console log the names
  // function filterNames(newText) {
  //   setText(newText);
  //   //filter all names based on user input
  //   let filteredNames = allNames1.filter((name) => {
  //     return name.toLowerCase().startsWith(newText.toLowerCase());
  //   });
  //   console.log(filteredNames, "filtered names array");
  //   setFilteredNames(filteredNames);
  //   setShowDropdown(true);
  // }

  async function filterNames(newText) {
    setText(newText);
    const allNames = await AsyncStorage.getItem("allNames");
    console.log(allNames, "all names");

    const parsedNames = JSON.parse(allNames);
    console.log(parsedNames, "parsed names");
    let filteredNames = parsedNames.filter((name) => {
      return name.toLowerCase().startsWith(newText.toLowerCase());
    });
    console.log(filteredNames, "filtered names array");
    setFilteredNames(filteredNames);
    setShowDropdown(true);
  }

  //function to get all names from api
  function getAllNames() {
    const storedAllNames = JSON.stringify(AsyncStorage.getItem("allNames"));
    if (storedAllNames) {
      setAllNames(storedAllNames);
      setIsLoading(false);
    } else {
      fetch(
        "https://mma-fighter-profile-api-appdev.herokuapp.com/api/allNames"
      ).then((response) => {
        response
          .json()
          .then((data) => {
            console.log(data, "all names");
            setAllNames(data);
            setIsLoading(false);
            AsyncStorage.setItem("allNames", JSON.stringify(data));
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      });
    }
  }

  function handleItemPress(item) {
    setText(item);
    handleButtonClick();
    setShowDropdown(false);
  }

  const handleButtonClick = async () => {
    // setText(props.opponentSearch);
    getAllNames();
    console.log(text);
    setIsLoading(true);
    if (!text) {
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
        props.opponentSearch = "";
        setText("");
      } catch (error) {
        console.log(error);
        setSpinner(false);
        props.sendSearchSpinner(false);
      }
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          width: "100%",
        }}
      >
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
          onChangeText={filterNames}
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

      {showDropdown && (
        <View style={{ maxHeight: 70 }}>
          <Dropdown names={filteredNames} onPress={handleItemPress} />
        </View>
      )}
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 10,
    paddingTop: 20,
  },
  searchButtonTitle: {
    color: "white",
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "white",
    //curve the edges
    paddingHorizontal: 15,
    elevation: 10,
    paddingTop: 10,
    paddingBottom: 12,
    color: "black",
    fontWeight: "bold",
    width: 250,
    borderCurve: 20,
    lineHeight: 10,
  },
});
