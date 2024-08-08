import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

const CardEdit = ({ user, onUpdate, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const updatedUser = { ...user, ...values };
      onUpdate(updatedUser);
      onClose();
    });
  };

  const handleCancel= () =>{
    onClose();
  }

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
