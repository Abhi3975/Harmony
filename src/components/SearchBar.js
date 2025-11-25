import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const SearchBar = ({ value, onChangeText, placeholder = "Search movies..." }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
                selectionColor={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 16,
    },
});

export default SearchBar;
