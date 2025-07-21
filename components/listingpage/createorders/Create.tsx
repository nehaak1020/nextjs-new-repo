'use client';

import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveOrder } from '@/redux/actions/orderActions';
import { Order } from '@/redux/slices/orderSlice';
import CreateForm from './CreateForm';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const initialForm = {
  orderName: '',
  customerName: '',
  workType: '',
  priority: '',
  startDate: '',
  dueDate: '',
  description: '',
};

interface CreateProps {
  open: boolean;
  onClose: () => void;
  setParentLoading: (loading: boolean) => void;
}


const Create: React.FC<CreateProps> = ({ open, onClose, setParentLoading }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
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
  setParentLoading(true); 

  try {
    await dispatch(saveOrder(formData as Order) as any);
    setFormData(initialForm);
    onClose();
  } catch (error) {
    console.error('Error creating order:', error);
  } finally {
    setLoading(false);
    setParentLoading(false); 
  }
};


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={3}>
          Create Order
        </Typography>
        <CreateForm
          formData={formData}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </Box>
    </Modal>
  );
};

export default Create;
