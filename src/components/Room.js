import { useState, useRef, useEffect} from 'react';
import { Container, Col, Row, Stack, Form, Button } from 'react-bootstrap';
import Message from './Message';
import styled from 'styled-components';

function Room({name, messages, handleNewMessge}) {

    const [newMessge, setNewMessage] = useState(null);
    const chatContainerRef = useRef(null);

    // Function to scroll to the bottom of the chat container
    const scrollToBottom = () => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };
  
    // Use useEffect to scroll to the bottom whenever new messages are received
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleTextChange = (e)=> {
        const {value} = e.target;
        setNewMessage(value);
    }

  return (
    <>
        <RoomName>{name}</RoomName>
        <RoomContainer ref={chatContainerRef}>
            <ChatContainer>
                <Row>
                    <Col>
                        {messages.map((message) =>(<Message key={message._id} message={message}/>))}
                    </Col>
                </Row>
            </ChatContainer>
        </RoomContainer>
        <Stack direction="horizontal" gap={3}>
            <Form.Control 
                className="me-auto" 
                type="text" 
                placeholder="say something..." 
                id='messageTextBox'
                name='newMessage'
                onChange={handleTextChange}/>
            <Button 
                variant="secondary"
                onClick={() => {handleNewMessge({newMessage: newMessge}); document.getElementById('messageTextBox').value="";}}
                disabled={newMessge==null ? true : false}>
                    Submit
            </Button>
        </Stack>
    </>
  );
}

export default Room;


const RoomName = styled.div`
text-align: left;
font-family: Arial, Helvetica, sans-serif;
font-size: 30px;
letter-spacing: 0px;
word-spacing: 0px;
color: #000000;
font-weight: 700;
text-decoration: none solid rgb(68, 68, 68);
font-style: normal;
font-variant: normal;
text-transform: none;
`

const RoomContainer = styled.div`
padding: 0;
height: 60%;
overflow: scroll;
background-color: rgb(163 163 163 / 0.1);
`

const ChatContainer = styled(Container)`
padding: 0;
`
