import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Card, Spin } from 'antd';
import './CardBody.css';
import { useCard } from '../Context/CardContext';

const { Meta } = Card;

const CardBody = () => {
  const { users, loading } = useCard();

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="card-containers grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

const UserCard = ({ user }) => {
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDeleteClick = () => {
    setDeleted(true);
  };

  if (deleted) {
    return null; // Don't render the card if it's marked as deleted
  }

  return (
    <Card
      style={{
        margin: '16px',
      }}
      cover={
        <img
          alt="User Avatar"
          src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
        />
      }
      actions={[
        <HeartOutlined 
          key="like" 
          onClick={handleLikeClick} 
          style={{ color: liked ? 'red' : undefined }} 
        />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" onClick={handleDeleteClick} />,
      ]}
    >
      <Meta
        title={user.name}
        description={
          <>
            <span className='card-item'><MailOutlined /><p>{user.email}</p></span>
            <span className='card-item'><PhoneOutlined /><p>{user.phone}</p></span>
            <span className='card-item'><GlobalOutlined /><p>{user.website}</p></span>          
          </>
        }
      />
    </Card>
  );
};

export default CardBody;
