import styled from 'styled-components'
function Message({message}) {

  return (
    <MessageContainer>
        <NameTime><Username>{message.postedBy.username}</Username><DateTime>{message.formattedDateTime}</DateTime></NameTime>
        <MessageText>{message.message}</MessageText>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
gird-template-rows: 5px 1fr;
padding: 5px;
&:hover {
  background-color: lightblue;
  filter: brightness(0.9);
}
`;

const NameTime = styled.div`
display: flex;
gap: 5px;
`

const Username = styled.p`
justify-self: left;
margin:0;
font-size: .9rem;
font-weight: 700;
`
const DateTime = styled.p`
justify-self: left;
margin:0;
`

const MessageText = styled.p`
text-align: left;
margin:0;
`

