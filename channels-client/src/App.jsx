import './App.css'
import {Container} from "react-bootstrap";
import {ChannelsList} from "./widgets/channels/channelsList.jsx";

function App() {
    return (
        <Container>
            <ChannelsList></ChannelsList>
        </Container>
    )
}

export default App
