import React, { useState } from "react";

//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Vibration,
  ActivityIndicator,
} from "react-native";

//import components
import FighterSearch from "./components/FighterSearch";

export default function App() {
  const Tab = createBottomTabNavigator();

  let searchSpinner = false;

  function SearchComponent() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fffaf0",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            paddingBottom: 10,
            paddingTop: 10,
            color: "darkblue",
            fontWeight: "bold",
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
          <FighterSearch sendData={sendData} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
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
                  onPress={() => holdOnFighter(index)}
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
          {searchSpinner ? <ActivityIndicator size="large" /> : false}
        </ScrollView>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Fighter analysis!</Text>
      </View>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            backgroundColor: "#fffaf0",
          },
          borderRadius: 10,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="search" size={size} color={color} />
            ),
          }}
          name="Search"
          component={SearchComponent}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="fitness-center" size={size} color={color} />
            ),
          }}
          name="Breakdown"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    );
  }

  const [data, setData] = useState([]);

  const sendData = (data) => {
    setData(data);
  };

  function holdOnFighter(index) {
    console.log(" ");
    console.log(" ");
    console.log("Name: " + data[index].name);
    console.log("Nickname: " + data[index].nickname);
    console.log("Fighting Out Of: " + data[index].fightingOutOf);
    console.log("Wins: " + data[index].wins);
    console.log("Losses: " + data[index].losses);
    console.log("Weight Class: " + data[index].weightClass);
    Vibration.vibrate();
  }

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
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
