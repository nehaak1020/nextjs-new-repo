'use client';

import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Button,
} from '@mui/material';

interface CreateFormProps {
  formData: any;
  errors: { [key: string]: boolean };
  loading: boolean;
  onChange: (e: any) => void;
  onSubmit: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Order Name"
          name="orderName"
          value={formData.orderName}
          onChange={onChange}
          fullWidth
          required
          error={errors.orderName}
          helperText={errors.orderName && 'Required'}
        />
        <TextField
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={onChange}
          fullWidth
          required
          error={errors.customerName}
          helperText={errors.customerName && 'Required'}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth required error={errors.workType}>
          <InputLabel>Work Type</InputLabel>
          <Select
            name="workType"
            value={formData.workType}
            label="Work Type"
            onChange={onChange}
          >
            <MenuItem value="Repair">Repair</MenuItem>
            <MenuItem value="Installation">Installation</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required error={errors.priority}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={formData.priority}
            label="Priority"
            onChange={onChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={onChange}
          fullWidth
          required
          error={errors.startDate}
          helperText={errors.startDate && 'Required'}
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.dueDate}
          onChange={onChange}
          fullWidth
          required
          error={errors.dueDate}
          helperText={errors.dueDate && 'Required'}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          fullWidth
          multiline
          rows={2}
          required
          error={errors.description}
          helperText={errors.description && 'Required'}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Submit'}
        </Button>
      </Box>
    </>
  );
};

export default CreateForm;