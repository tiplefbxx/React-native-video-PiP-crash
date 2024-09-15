import React, {useRef, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import Video, {SelectedTrackType} from 'react-native-video';

const Player = ({src, onEnd}) => {
  const videoRef = useRef(null);
  const [isPiPEnabled, setIsPiPEnabled] = useState(false);
  return (
    <>
      <Video
        ref={videoRef}
        source={src}
        style={styles.player}
        onEnd={onEnd}
        controls={true}
        allowsExternalPlayback
        volume={1.0}
        resizeMode="contain"
        enterPictureInPictureOnLeave={true}
        ignoreSilentSwitch="ignore"
        minLoadRetryCount={3}
        playWhenInactive
        fullscreen={false}
        pictureInPicture={isPiPEnabled}
        selectedTextTrack={{
          type: SelectedTrackType.INDEX,
          value: 0,
        }}
        playInBackground={false}
        onPictureInPictureStatusChanged={({isActive}) => {
          setIsPiPEnabled(isActive);
        }}
      />
      <Button
        title={'Enter PiP'}
        onPress={() => {
          console.log(videoRef.current.enterPictureInPicture);
          videoRef?.current?.enterPictureInPicture();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  player: {
    width: '100%',
    height: 600,
  },
});

export default Player;
