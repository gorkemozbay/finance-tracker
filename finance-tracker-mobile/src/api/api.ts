import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.3:8080',
});

export interface ExpenseRequest {
    amount: number;
    description: string;
    dateTime: string;
}

export const createExpense = async (
    expense: ExpenseRequest
) => {
    const response = await api.post('/expenses', {
        ...expense,
        categoryId: 1,
    });

    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get('/expenses');
    return response.data;
};

export const getTotalBetween = async (
    start: string,
    end: string
) => {
    const response = await api.get('/expenses/total-between', {
        params: { start, end },
    });

    return response.data;
};

export const deleteExpense = async (id: number) => {
    await api.delete(`/expenses/${id}`);
};

export const updateExpense = async (
    id: number,
    expense: ExpenseRequest
) => {
    const response = await api.put(`/expenses/${id}`, {
        ...expense,
        categoryId: 1,
    });

    return response.data;
};