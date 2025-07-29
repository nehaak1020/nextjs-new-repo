'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveOrder } from '@/redux/actions/orderActions';
import { Order } from '@/redux/slices/orderSlice';
import CreateForm from './CreateForm';

const initialForm = {
  orderName: '',
  customerName: '',
  workType: '',
  priority: '',
  startDate: '',
  dueDate: '',
  description: '',
};

const Reports: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
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
      await dispatch(saveOrder(formData as Order) as any);
      setFormData(initialForm);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box  sx={{ mx: 'auto', padding: '39px 16px'}}>
      <Typography variant="h5" mb={3}>
        Create Order
      </Typography>
      <CreateForm
        formData={formData}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Reports;
