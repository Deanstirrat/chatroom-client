import { useAuth } from '../components/AuthProvider';
import { useEffect, useState } from 'react';
import { ListGroup, Stack, Button, Form, Container, Col} from 'react-bootstrap';
import styled from 'styled-components';

function RoomsList({currentRoomId, handleRoomChange, handleNewRoom, shouldRefetch}) {
  const { user } = useAuth();
  const [roomList, setRoomList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomName, setNewRoomName] = useState(null);

  const handleNameChange = (e)=> {
    const {value} = e.target;
    setNewRoomName(value);
}

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (user && user.token) {
          const response = await fetch('https://cold-bush-9506.fly.dev/rooms', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            setRoomList(responseData);
          } else {
            setError('Request to protected route failed');
          }
        } else {
          setError('User is not authenticated');
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('An error occurred');
        setLoading(false);
      }
    };

    fetchRooms(); // Call the function when the component mounts
  }, [user, shouldRefetch]); // Include user as a dependency to react to changes in authentication state

  return (
    <RoomListContainer>
      <Col>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {roomList && (
          <ListGroup as="ul">
            {roomList.map((room) => (
              <ListGroup.Item
                action
                key={room._id}
                active={currentRoomId===room._id ? true : false}
                onClick={()=>handleRoomChange(room._id)}
                >
                  {room.name}
              </ListGroup.Item>
          ))}
          </ListGroup>
        )}
        <Stack direction="verical" gap={1} className='mt-5'>
            <Form.Control 
                className="me-auto" 
                type="text" 
                placeholder="name" 
                name='newRoomName'
                onChange={handleNameChange}/>
            <Button 
                variant="secondary"
                onClick={() => handleNewRoom({newRoomName: newRoomName})}
                disabled={newRoomName==null ? true : false}>
                    new room
            </Button>
        </Stack>
      </Col>
    </RoomListContainer>
  );
}

export default RoomsList;

const RoomListContainer = styled(Container)`
padding-left: 5px;
padding-right: 0;
`
