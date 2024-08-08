import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import axios from 'axios';

const CardEdit = ({ user, onUpdate, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append('id', user._id);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('website', values.website);
        
        const response = await axios.post('http://localhost:3000/user/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          onUpdate(response.data.data); // Update user in the context
          onClose();
          message.success('User updated successfully!');
        } else {
          message.error('Failed to update user.');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter the phone number' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please enter the website' }]}>
        <Input />
      </Form.Item>
      <div className="flex gap-4 items-center">
        <Button type="primary" onClick={handleOk}>
          Save
        </Button>
        <Button type="default" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default CardEdit;
