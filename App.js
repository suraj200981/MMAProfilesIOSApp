import React, { useState } from "react";

//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Vibration,
  ActivityIndicator,
  Modal,
} from "react-native";

//import components
import FighterSearch from "./components/FighterSearch";

export default function App() {
  const [searchSpinner, setSearchSpinner] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [searchData, setData] = useState([]);
  const [profile, setProfile] = useState([]);

  const Tab = createBottomTabNavigator();

  function sendSearchSpinner(spinner) {
    setSearchSpinner(spinner);
  }

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
          <FighterSearch
            sendData={sendData}
            sendSearchSpinner={sendSearchSpinner}
          />
          {searchSpinner && <ActivityIndicator size="large" color="#0000ff" />}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {searchData.length != 0 ? (
            searchData.map((item, index) => (
              <View key={index}>
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
          ) : searchSpinner == false ? (
            <Text>No Fighters Found</Text>
          ) : (
            <Text>Searching for fighter</Text>
          )}
        </ScrollView>
        {showPopup && (
          <View style={styles.popupContainer}>
            {/* Display the fighter's information here */}

            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <Text
                style={{
                  textAlign: "right",
                  paddingRight: 15,
                  paddingTop: 10,
                  fontWeight: "bold",
                }}
              >
                <FontAwesome5 name="window-close" size={40} color="#434343" />
              </Text>

              <Text style={styles.popUpModalText}>Name: {profile.name}</Text>
              <Text style={styles.popUpModalText}>
                Nickname: {profile.nickname ? profile.nickname : "N/A"}
              </Text>
              <Text style={styles.popUpModalText}>
                Height: {profile.height ? profile.height : "N/A"}
              </Text>
              <Text style={styles.popUpModalText}>
                Weight: {profile.weight ? profile.weight : "N/A"}
              </Text>
              <Text style={styles.popUpModalText}>
                Wins: {profile.wins ? profile.wins : "N/A"}
              </Text>
              <Text style={styles.popUpModalText}>
                Losses: {profile.losses ? profile.losses : "N/A"}
              </Text>
              <Text style={styles.popUpModalText}>
                Country:{" "}
                <Image
                  source={{ uri: profile.flag }}
                  style={{ width: 50, height: 30 }}
                />
              </Text>
            </TouchableOpacity>
          </View>
        )}
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

  const sendData = (searchData) => {
    setData(searchData);
  };

  function holdOnFighter(index) {
    setShowPopup(true);
    setProfile(searchData[index]);
    console.log(" ");
    console.log(" ");
    console.log("Name: " + searchData[index].name);
    console.log("Nickname: " + searchData[index].nickname);
    console.log("Fighting Out Of: " + searchData[index].fightingOutOf);
    console.log("Wins: " + searchData[index].wins);
    console.log("Losses: " + searchData[index].losses);
    console.log("Weight Class: " + searchData[index].weightClass);
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
  popupContainer: {
    //width 300 and 500 height background color grey
    width: 300,
    height: 550,
    backgroundColor: "rgba(238, 252, 255, 0.985)",
    borderRadius: 10,
    position: "absolute",
    bottom: 50,
    top: 150,
  },
  popUpModalText: {
    fontSize: 17,
    fontWeight: "200",
    paddingBottom: 10,
  },
});
