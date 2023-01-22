import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import axios from "axios";

export default function App() {
  //states
  const [data, setData] = React.useState([]);
  const [text, setText] = useState("");
  let jsonVal = [];

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "https://mma-fighter-profile-api-appdev.herokuapp.com/api/search?name=" +
          text
      );
      jsonVal = response.data;

      setData(jsonVal);
    } catch (error) {
      console.log(error);
    }
  };

  function holdOnFighter() {
    console.log("hold on fighter");
    Vibration.vibrate();
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fffaf0",
      }}
    >
      <Text
        style={{
          fontSize: 40,
          paddingBottom: 60,
          paddingTop: 80,
          color: "darkblue",
        }}
      >
        Search for fighters
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
          paddingHorizontal: 10,
          paddingTop: 9,
          borderRadius: 10,
          boxShadow: "2px 2px 10px #dcdcdc",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              flex: 1,
              height: 30,
              borderColor: "black",
              borderWidth: 1,
              maxWidth: 250,
              minWidth: 200,
              paddingHorizontal: 10,
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
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <View
              key={index}
              style={{
                paddingBottom: 20,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingBottom: 20,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => holdOnFighter()}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 150, height: 210, borderRadius: 60 / 2 }}
                />
                <Text style={styles.name} key={index}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No data</Text>
        )}
      </ScrollView>
      <StatusBar style="auto" />
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
