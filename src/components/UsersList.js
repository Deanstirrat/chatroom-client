import { useAuth } from '../components/AuthProvider';
import { useEffect, useState } from 'react';
import { ListGroup, Container, Col} from 'react-bootstrap';
import styled from 'styled-components';

function UsersList() {
  const { user } = useAuth();
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user && user.token) {
          const response = await fetch('https://cold-bush-9506.fly.dev/users', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            setUserList(responseData);
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

    fetchUsers(); // Call the function when the component mounts
  }, [user]); // Include user as a dependency to react to changes in authentication state

  return (
    <UsersListContainer>
      <Col>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {userList && (
          <ListGroup as="ul">
            {userList.map((user) => (
              <ListGroup.Item
                key={user._id}
                variant={user.online ? 'primary' : 'danger'}
                >
                  {user.username}
              </ListGroup.Item>
          ))}
          </ListGroup>
        )}
      </Col>
    </UsersListContainer>
  );
}

export default UsersList;

const UsersListContainer = styled(Container)`
padding-left: 5px;
padding-right: 0;
`
