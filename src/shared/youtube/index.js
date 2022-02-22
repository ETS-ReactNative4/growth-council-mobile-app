import React, {useState, useCallback, useRef} from 'react';
import {Button, View, Alert, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const CircleIcon = props => {
  const {videoId} = props;
  const controlRef = useRef();

  const [playing, setPlaying] = useState(false);

  const onStateChange = state => {
    if (state === 'ended') {
      setPlaying(false);
    }
    // if (state !== 'playing') {
    //   setPlaying(false);
    // }
  };

  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };

  return (
    <View>
      <YoutubePlayer
        height={210}
        ref={controlRef}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CircleIcon;
