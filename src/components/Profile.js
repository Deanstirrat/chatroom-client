import { useAuth } from '../components/AuthProvider';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

function Profile() {
const { logout } = useAuth();

  return (
    <ProfileContainer>
        <Button variant='danger' onClick={()=>{logout()}}>Logout</Button>
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
padding-left: 5px;
padding-right: 0;
display: flex;
flex-direction: vertical;
justify-content: center;
`
