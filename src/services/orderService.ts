export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  categoryId: string;
  categoryName: string;
};

export type OrderPayload = {
  fullName: string;
  address: string;
  email: string;
  items: OrderItem[];
};

export const submitOrder = async (order: OrderPayload): Promise<void> => {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('שגיאה בשליחת ההזמנה');
  }
};
