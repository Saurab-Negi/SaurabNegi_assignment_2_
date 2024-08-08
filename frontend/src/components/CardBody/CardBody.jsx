import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import './CardBody.css';
import { useCard } from '../Context/CardContext';
import CardEdit from '../CardEdit/CardEdit';
import Loader from '../Loader/Loader';

const { Meta } = Card;

const CardBody = () => {
  const { url, users, loading, setUsers } = useCard();

  if (loading) {
    return <Loader />;
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  return (
    <div className="card-containers grid grid-cols-1 my-10 mx-4 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onUpdate={handleUserUpdate} url={url} />
      ))}
    </div>
  );
};

const UserCard = ({ user, onUpdate, url }) => {
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleDeleteClick = () => {
    setDeleted(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (deleted) {
    return null;
  }

  return (
    <>
      <Card
        cover={
          <img
            alt="User Avatar"
            src={`${url}/images/${user.image}`} // Use url here
          />
        }
        actions={[
          <HeartOutlined
            key="like"
            onClick={handleLikeClick}
            style={{ color: liked ? 'red' : undefined }}
          />,
          <EditOutlined key="edit" onClick={handleEditClick} />,
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
      <Modal title="Edit User" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CardEdit user={user} onUpdate={onUpdate} onClose={handleCancel} />
      </Modal>
    </>
  );
};

export default CardBody;
