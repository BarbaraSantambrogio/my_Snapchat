import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ListUser({ navigation, route }) {
    const { userToSendTo } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Image envoyée</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
});