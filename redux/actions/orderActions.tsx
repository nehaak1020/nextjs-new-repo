import { Order } from '../slices/orderSlice';
import { AppDispatch, RootState } from '../store';
import { setOrders, addOrder, updateOrder, deleteOrders } from '../slices/orderSlice';

const getNextOrderId = (): number => {
  const current = localStorage.getItem('nextOrderId');
  const nextId = current ? parseInt(current, 10) + 1 : 1;
  localStorage.setItem('nextOrderId', nextId.toString());
  return nextId;
};

export const loadOrders = () => {
  return (dispatch: AppDispatch) => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      dispatch(setOrders(JSON.parse(storedOrders)));
    }
  };
};

export const saveOrder = (order: Order) => (dispatch: AppDispatch, getState: () => RootState) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      let newOrder = order;
      if (!order.id) {
        newOrder = { ...order, id: getNextOrderId() };
        dispatch(addOrder(newOrder));
      } else {
        dispatch(updateOrder(order));
      }
      const updatedOrders = getState().orders.orders;
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      resolve();
    }, 300);
  });
};

export const deleteOrdersAction = (ids: number[]) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(deleteOrders(ids));
    const updatedOrders = getState().orders.orders;
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };
};
