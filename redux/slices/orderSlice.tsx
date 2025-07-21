import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  id: number;
  orderName: string;
  customerName: string;
  workType: string;
  priority: string;
  startDate: string;
  dueDate: string;
  description: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrders: (state, action: PayloadAction<number[]>) => {
      state.orders = state.orders.filter(order => !action.payload.includes(order.id));
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrders } = orderSlice.actions;
export default orderSlice.reducer;