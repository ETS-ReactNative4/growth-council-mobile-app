import React, {useState, useCallback, useRef} from "react";
import {Button, View, Alert, StyleSheet} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const CircleIcon = (props) => {

    const {videoId} = props;

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
            />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying}/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CircleIcon;
