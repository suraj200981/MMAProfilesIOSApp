import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, paddingBottom: 60, paddingTop: 80 }}>
        Search for fighter
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <TextInput
          style={{
            flex: 1,
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            maxWidth: 250,
            minWidth: 200,
          }}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <Button
          style={{ backgroundColor: "blue", color: "blue" }}
          title="Search"
          onPress={handleButtonClick}
        ></Button>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <Text key={index}>
                {item.name} {item.nickname}
              </Text>
            ))
          ) : (
            <Text>No data</Text>
          )}
        </Text>
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
});
