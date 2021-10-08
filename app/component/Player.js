import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import colors from "../config/colors";
import content from "../config/content";
import { Image } from "react-native-expo-image-cache";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import moviegenres from "../config/moviegenres";
import * as Notifications from "expo-notifications";
import YoutubeSearchApi from 'youtube-search-api';

const Player = ({ index, name, desc, rawgenres }) => {
  const [genres, setgenres] = useState([]);
  const [videoId, setVideoId] = useState("");
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const getVideoIByName = (name) => {
    YoutubeSearchApi.GetListByKeyword(name)
         .then((response) => { setVideoId(response.items[0].id) })
  } 

  useEffect(() => {
    getVideoIByName(`${name} trailer`)
    const findgenre = (array) => {
      let l = [];
      array?.map((i) => {
        var index = moviegenres.genres.findIndex((v) => v.id == i);
        l.push(moviegenres.genres[index].name);
        return;
      });
      return setgenres(l);
    };
    findgenre(rawgenres);
  }, []);

  const handle = async (e) => {
    const { granted } = await Notifications.requestPermissionsAsync();
    if (!granted) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: `${e} foi adicionado à sua lista.`,
        sound: true,
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  const [ready, setready] = useState(false);
  return (
    <View style={styles.con}>
      {videoId !== "" && (
        <YoutubePlayer
              width={"100%"}
              height={200}
              play={false}
              videoId={videoId}
              mute={true}
              forceAndroidAutoplay={false}
              initialPlayerParams={{
                loop: false,
                controls: true,
              }}
              startInLoadingState={true}
              renderLoading={() => (
                <Image
                  uri={"../assets/splash.png"}
                  preview={{
                    uri: "https://silicophilic.com/wp-content/uploads/2019/11/Netflix_Thumbnails_not_loading.jpg",
                  }}
                />
              )}
            />
      )}
      <View style={styles.row}>
        <Text
          style={{
            color: colors.textcolor,
            fontSize: content.globalbigfontsize,
            flex: 1,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => (ready ? setready(false) : setready(true))}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 30,
              }}
            >
              {!ready ? (
                <Feather name="bell" size={25} color="white" />
              ) : (
                <LottieView
                  source={require("./../animations/bell.json")}
                  loop={false}
                  autoPlay={true}
                  style={{
                    height: 40,
                  }}
                  onAnimationFinish={() => handle(name)}
                />
              )}
              <Text style={{ color: !ready ? colors.textcolor : colors.red }}>
                Lembrar
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <MaterialCommunityIcons
              name="information-outline"
              size={25}
              color={colors.textcolor}
            />
            <Text style={{ color: colors.textcolor }}>info</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            color: colors.textcolor,
            fontSize: content.globalbigfontsize,
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            color: colors.dark,
            fontSize: content.globalbigfontsize,
          }}
        >
          {desc}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "baseline",

            height: 50,
            top: 20,
          }}
        >
          {genres?.map((i) => (
            <Text
              style={{
                color: colors.textcolor,
                fontSize: content.globalfontsize,
              }}
              key={i}
            >
              {i}
              <Entypo name="dot-single" size={15} color="white" />
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  con: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
    marginVertical: 20,
    paddingHorizontal: 30,
  },
});
