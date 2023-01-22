import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

//import components
import FighterSearch from "./components/FighterSearch";

export default function App() {
  const [data, setData] = useState([]);

  const sendData = (data) => {
    setData(data);
  };

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
        {/* <FighterSearch /> */}

        <FighterSearch sendData={sendData} />
      </View>
      <ScrollView style={styles.scrollView}>
        {data.length != 0 ? (
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
          <Text>No Fighters Found</Text>
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
