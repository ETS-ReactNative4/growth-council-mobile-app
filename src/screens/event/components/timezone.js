import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TimezoneSelect from 'react-timezone-select'

const timezone = () => {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  return (
    <View>
      <Text>Please make a selection</Text>
      <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />

      <Text>Output:</Text>
      <View
        style={{
          backgroundColor: '#ccc',
          padding: '20px',
          margin: '20px auto',
          borderRadius: '5px',
          maxWidth: '600px',
        }}>
        <Text
          style={{
            margin: '0 20px',
            fontWeight: 500,
            fontFamily: 'monospace',
          }}>
          {JSON.stringify(selectedTimezone, null, 2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default timezone;
