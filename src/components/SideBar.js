import { Tabs, Tab} from 'react-bootstrap';
import RoomsList from './RoomsList';
import UsersList from './UsersList';
import Profile from './Profile';
// import styled from 'styled-components';

function SideBar({currentRoomId, handleRoomChange, handleNewRoom, shouldRefetch}) {

  return (
         <Tabs
            defaultActiveKey="rooms"
            id="uncontrolled-tab-example"
            className="mb-3">
            <Tab eventKey="rooms" title="Rooms">
              <RoomsList currentRoomId={currentRoomId} handleRoomChange={handleRoomChange} handleNewRoom={handleNewRoom} shouldRefetch={shouldRefetch}/>
            </Tab>
            <Tab eventKey="users" title="Users">
              <UsersList/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
              <Profile/>
            </Tab>
          </Tabs>
  );
}

export default SideBar;

