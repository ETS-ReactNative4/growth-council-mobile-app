import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from "react-native-modal";

const menuModal = () => {
  return (
	<View>
	   <Modal isVisible={true}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
	</View>
  );
};

export default menuModal;

const styles = StyleSheet.create({});

