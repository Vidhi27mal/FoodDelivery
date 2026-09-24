import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Video from "react-native-video";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Video
        source={require("../assets/Foodv.mp4")}
        style={styles.video}
        resizeMode="cover"
        repeat={false}
        controls={false}
        onLoad={() => console.log("VIDEO LOADED")}
        onEnd={() => {
          console.log("VIDEO FINISHED");
          navigation.replace("register");
        }}
        onError={(error) => {
          console.log("VIDEO ERROR:", error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  video: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;