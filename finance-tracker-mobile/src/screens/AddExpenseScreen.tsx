import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import { createExpense } from '../api/api';

export default function AddExpenseScreen() {
    const navigation = useNavigation();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const [dateTime, setDateTime] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleSubmit = async () => {
        if (!amount) {
            Alert.alert(
                'Missing information',
                'Amount and category are required.'
            );
            return;
        }

        const numericAmount = Number(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert('Invalid amount', 'Please enter a valid amount.');
            return;
        }

        try {
            await createExpense({
                amount: numericAmount,
                description,
                dateTime: formatDateTime(dateTime),
            });

            Alert.alert('Success', 'Expense added!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not add expense.');
        }
    };

    const handleDateChange = (
        event: any,
        selectedDate?: Date
    ) => {
        if (selectedDate) {
            const updatedDate = new Date(dateTime);

            updatedDate.setFullYear(selectedDate.getFullYear());
            updatedDate.setMonth(selectedDate.getMonth());
            updatedDate.setDate(selectedDate.getDate());

            setDateTime(updatedDate);
        }

        // IMPORTANT:
        // Do NOT close the picker here.
    };

    const handleTimeChange = (
        event: any,
        selectedTime?: Date
    ) => {
        if (selectedTime) {
            const updatedDate = new Date(dateTime);

            updatedDate.setHours(selectedTime.getHours());
            updatedDate.setMinutes(selectedTime.getMinutes());

            setDateTime(updatedDate);
        }

        // IMPORTANT:
        // Do NOT close the picker here.
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
        setShowTimePicker(false);
    };

    const toggleTimePicker = () => {
        setShowTimePicker(prev => !prev);
        setShowDatePicker(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>

                {/* Amount */}
                <Text style={styles.label}>Amount</Text>

                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                />

                {/* Description */}
                <Text style={styles.label}>Description</Text>

                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="e.g. Dinner"
                />


                {/* Date & Time */}
                <Text style={styles.label}>Date & Time</Text>

                <View style={styles.dateTimeRow}>

                    <Pressable
                        style={[
                            styles.dateTimeButton,
                            showDatePicker && styles.activeButton,
                        ]}
                        onPress={toggleDatePicker}
                    >
                        <Text style={styles.dateTimeLabel}>
                            DATE
                        </Text>

                        <Text style={styles.dateTimeText}>
                            {formatDate(dateTime)}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.dateTimeButton,
                            showTimePicker && styles.activeButton,
                        ]}
                        onPress={toggleTimePicker}
                    >
                        <Text style={styles.dateTimeLabel}>
                            TIME
                        </Text>

                        <Text style={styles.dateTimeText}>
                            {formatTime(dateTime)}
                        </Text>
                    </Pressable>

                </View>

                {/* Date Picker */}
                {showDatePicker && (
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={dateTime}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                        />
                    </View>
                )}

                {/* Time Picker */}
                {showTimePicker && (
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={dateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                    </View>
                )}

                {/* Add */}
                <Pressable
                    style={styles.addButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.addButtonText}>
                        Add Expense
                    </Text>
                </Pressable>

            </View>
        </View>
    );
}

function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString([], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    container: {
        padding: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        marginTop: 12,
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },

    dateTimeRow: {
        flexDirection: 'row',
        gap: 10,
    },

    dateTimeButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    activeButton: {
        borderWidth: 1,
        borderColor: '#222',
    },

    dateTimeLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#777',
        marginBottom: 4,
    },

    dateTimeText: {
        fontSize: 16,
        fontWeight: '500',
    },

    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    addButton: {
        backgroundColor: '#222',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 30,
    },

    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});