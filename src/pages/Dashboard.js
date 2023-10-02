import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { Container, Col, Row} from 'react-bootstrap';
import Room from '../components/Room';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

function Dashboard() {
  const { user } = useAuth();
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [currentRoomData, setCurrentRoomData] = useState(null);
  const [initial, setInitial] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const updateRoom = async () => {
      try{
        if (user && user.token) {
          const response = await fetch('https://cold-bush-9506.fly.dev/rooms/'+currentRoomId, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const responseData = await response.json();
            setCurrentRoomData(responseData);
          } else {
            setError('Request to protected route failed');
          }
        } else {
          setError('User is not authenticated');
        }
      }catch(error) {
        console.log(error);
        setError('An error occurred');
      }
    }
    if(currentRoomId) updateRoom()
  },[shouldRefetch, user, currentRoomId]);

  const handleRoomChange = (newRoomId) => {
    setInitial(false);
    setCurrentRoomId(newRoomId);
    setShouldRefetch(!shouldRefetch)
  }

  const handleNewMessge = async ({newMessage}) => {
    try{
      if (user && user.token) {
        const response = await fetch('https://cold-bush-9506.fly.dev/rooms/'+currentRoomId, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage,
            postedBy: user.userId,
          })
        });
        if (response.ok) {
          setShouldRefetch(!shouldRefetch);
        } else {
          setError('Request to protected route failed');
        }
      } else {
        setError('User is not authenticated');
      }
    }catch(error) {
      console.log(error);
      setError('An error occurred');
    }
  }

  const handleNewRoom = async ({newRoomName}) => {
    try{
      if (user && user.token) {
        const response = await fetch('https://cold-bush-9506.fly.dev/rooms', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newRoomName,
            creator: user.userId,
          })
        });
        if (response.ok) {
          //set should refresh to new value to trigger useEffect and refetch
          setShouldRefetch(!shouldRefetch);
        } else {
          setError('Request to protected route failed');
        }
      } else {
        setError('User is not authenticated');
      }
    }catch(error) {
      console.log(error);
      setError('An error occurred');
    }
  }

  return (
    <DashboardContainer>
      <Row><h1>Dean's Chatrooms</h1></Row>
      <Row>
        <RoomListCol xs={3}>
            <SideBar currentRoomId={currentRoomId} handleRoomChange={handleRoomChange} handleNewRoom={handleNewRoom} shouldRefetch={shouldRefetch}/>
        </RoomListCol>
        <RoomCol>
          {initial && <p>Select a room</p>}
          {error && <p>Error: {error}</p>}
          {currentRoomData && <Room name={currentRoomData.name} messages={currentRoomData.messages} handleNewMessge={handleNewMessge} shouldRefetch={shouldRefetch}/>}
        </RoomCol>
      </Row>
    </DashboardContainer>
  );
}

export default Dashboard;

const DashboardContainer = styled(Container)`
padding: 0;
`

const RoomListCol = styled(Col)`
padding:0;
margin-right: 5px;
`

const RoomCol = styled(Col)`
padding:0;
`
