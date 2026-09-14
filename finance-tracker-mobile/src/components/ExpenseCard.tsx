import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Expense } from '../types/Expense';

type Props = {
    expense: Expense;
    onEdit: () => void;
    onDelete: () => void;
};

export default function ExpenseCard({
    expense,
    onEdit,
    onDelete,
}: Props) {
    return (
        <View style={styles.card}>
            {/* Category icon */}
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>₺</Text>
            </View>

            {/* Expense information */}
            <View style={styles.info}>
                <Text
                    style={styles.description}
                    numberOfLines={1}
                >
                    {expense.description || 'No description'}
                </Text>

                <Text style={styles.meta}>
                    {expense.categoryName || 'Uncategorized'} ·{' '}
                    {new Date(expense.dateTime).toLocaleDateString()}
                </Text>
            </View>

            {/* Amount + actions */}
            <View style={styles.right}>
                <Text style={styles.amount}>
                    ₺{Number(expense.amount).toFixed(2)}
                </Text>

                <View style={styles.actions}>
                    <Pressable
                        style={styles.actionButton}
                        onPress={onEdit}
                    >
                        <Text style={styles.editIcon}>✎</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={onDelete}
                    >
                        <Text style={styles.deleteIcon}>×</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    icon: {
        fontSize: 18,
        fontWeight: '600',
    },

    info: {
        flex: 1,
        marginRight: 8,
    },

    description: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },

    meta: {
        fontSize: 12,
        color: '#777',
    },

    right: {
        alignItems: 'flex-end',
    },

    amount: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
    },

    actions: {
        flexDirection: 'row',
        gap: 6,
    },

    actionButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteButton: {
        backgroundColor: '#f5e8e8',
    },

    editIcon: {
        fontSize: 15,
    },

    deleteIcon: {
        fontSize: 20,
        lineHeight: 20,
    },
});