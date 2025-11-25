import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const SectionHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        marginTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SectionHeader;
