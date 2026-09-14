import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import EditExpenseScreen from '../screens/EditExpenseScreen';
import { Expense
    
 } from '../types/Expense';

export type RootStackParamList = {
    Dashboard: undefined;
    AddExpense: undefined;
    EditExpense: { expense: Expense; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: 'Finance Tracker' }}
            />

            <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{ title: 'Add Expense' }}
            />

            <Stack.Screen
                name="EditExpense"
                component={EditExpenseScreen}
                options={{ title: 'Edit Expense' }}
            />
        </Stack.Navigator>
    );
}