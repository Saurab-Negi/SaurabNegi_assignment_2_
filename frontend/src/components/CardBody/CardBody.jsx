import { useState } from 'react';
import { EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import './CardBody.css';
import { useCard } from '../Context/CardContext';
import CardEdit from '../CardEdit/CardEdit'; // Import CardEdit component
import Loader from '../Loader/Loader';

const { Meta } = Card;

const CardBody = () => {
  const { users, loading, setUsers } = useCard(); // Destructure setUsers to update the state

  if (loading) {
    return <Loader/>;
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  return (
    <div className="card-containers grid grid-cols-1 my-10 mx-4 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} onUpdate={handleUserUpdate} />
      ))}
    </div>
  );
};

const UserCard = ({ user, onUpdate }) => {
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
    return null; // Don't render the card if it's marked as deleted
  }

  return (
    <>
      <Card
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
      <Modal title="Edit User" open={isModalOpen} onCancel={handleCancel}>
        <CardEdit user={user} onUpdate={onUpdate} onClose={handleCancel} />
      </Modal>
    </>
  );
};

export default CardBody;
