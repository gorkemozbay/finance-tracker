import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
    getExpenses,
    getTotalBetween,
    deleteExpense,
} from '../api/api';

import ExpenseCard from '../components/ExpenseCard';
import { Expense } from '../types/Expense';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DashboardScreen() {
    const navigation = useNavigation<NavigationProp>();

    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);

            const now = new Date();

            const start = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            const end = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                1
            );

            const [expenseData, totalData] = await Promise.all([
                getExpenses(),
                getTotalBetween(
                    start.toISOString().slice(0, 19),
                    end.toISOString().slice(0, 19)
                ),
            ]);

            setExpenses(expenseData);
            setMonthlyTotal(Number(totalData));
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not load expenses.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const handleDelete = (id: number) => {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteExpense(id);

                            setExpenses((current) =>
                                current.filter((expense) => expense.id !== id)
                            );

                            loadData();
                        } catch (error) {
                            console.error(error);
                            Alert.alert(
                                'Error',
                                'Could not delete expense.'
                            );
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Monthly total */}
                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>
                        This Month
                    </Text>

                    <Text style={styles.totalAmount}>
                        ₺{monthlyTotal.toFixed(2)}
                    </Text>
                </View>

                {/* Expenses */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Recent Expenses
                    </Text>

                    <Text style={styles.expenseCount}>
                        {expenses.length}
                    </Text>
                </View>

                {expenses.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No expenses yet
                        </Text>

                        <Text style={styles.emptyText}>
                            Add your first expense to start tracking.
                        </Text>
                    </View>
                ) : (
                    expenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            onEdit={() =>
                                navigation.navigate('EditExpense', {
                                    expense,
                                })
                            }
                            onDelete={() =>
                                handleDelete(expense.id)
                            }
                        />
                    ))
                )}
            </ScrollView>

            {/* Fixed footer */}
            <View style={styles.footer}>
                <Pressable style={styles.footerItem}>
                    <Text style={styles.footerIcon}>⌂</Text>
                    <Text style={styles.footerLabel}>
                        Home
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.addButton}
                    onPress={() =>
                        navigation.navigate('AddExpense')
                    }
                >
                    <Text style={styles.addButtonIcon}>
                        ＋
                    </Text>

                    <Text style={styles.addButtonText}>
                        Add
                    </Text>
                </Pressable>

                <Pressable style={styles.footerItem}>
                    <Text style={styles.footerIcon}>◷</Text>
                    <Text style={styles.footerLabel}>
                        History
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    container: {
        padding: 16,
        paddingBottom: 30,
    },

    totalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },

    totalLabel: {
        fontSize: 15,
        color: '#666',
        marginBottom: 6,
    },

    totalAmount: {
        fontSize: 32,
        fontWeight: '700',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
    },

    expenseCount: {
        marginLeft: 8,
        fontSize: 13,
        color: '#666',
        backgroundColor: '#e5e5e5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 50,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },

    emptyText: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 10,
        color: '#666',
    },

    footer: {
        height: 80,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    footerItem: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footerIcon: {
        fontSize: 24,
    },

    footerLabel: {
        fontSize: 12,
        marginTop: 4,
    },

    addButton: {
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonIcon: {
        fontSize: 32,
        fontWeight: '300',
    },

    addButtonText: {
        fontSize: 13,
        fontWeight: '600',
    },
});