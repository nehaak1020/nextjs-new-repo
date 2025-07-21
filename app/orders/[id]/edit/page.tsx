'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Order } from '@/redux/slices/orderSlice';
import { saveOrder } from '@/redux/actions/orderActions';
import { Box, Typography, Paper } from '@mui/material';
import CreateForm from '@/components/listingpage/createorders/CreateForm';

const EditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const orderId = Number(id);

  const order = useSelector((state: RootState) =>
    state.orders.orders.find((o) => o.id === orderId)
  );

  const [formData, setFormData] = useState<Order | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    for (const key in formData!) {
      if (!formData![key as keyof Order]) {
        newErrors[key] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await dispatch(saveOrder(formData!) as any);
      router.push('/'); // back to listing
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h6" mb={3}>Edit Order</Typography>
      <CreateForm
        formData={formData}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/')}
      />
    </Paper>
  );
};

export default EditPage;
