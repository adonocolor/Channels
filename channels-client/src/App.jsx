import './App.css'
import {Button, Col, Container} from "react-bootstrap";
import {ChannelsList} from "./widgets/channels/channelsList.jsx";
import {useGetChannelsQuery} from "./features/channels/api/apiChannelsSlice.jsx";
import {MessageInput} from "./widgets/messages/messageInput.jsx";
import {useEffect, useState} from "react";
import {HintList} from "./widgets/Hint/hintList.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {useDispatch, useSelector} from "react-redux";


function App() {
    const {
        data : channels,
        isLoading,
        error,
    } = useGetChannelsQuery()

    let [isDisabled, setIsDisabled] = useState(true);
    let [currentChannel, setCurrentChannel] = useState(null);
    const messages = useSelector(store => store.messageSlice);
    const hints = useSelector(store => store.hintSlice);


    useEffect(() => {
        if (currentChannel !== null) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [currentChannel]);

    if (isLoading) return <div>Загрузка...</div>

    if (error) return <div>Кажется, что наш сервер не работает! Попробуйте позже...</div>

    return (
        <Container>
            <ChannelsList setCurrentChannel={setCurrentChannel} channels={channels}></ChannelsList>
            <Col className={'d-flex flex-column'}>
                <MessageInput setCurrentChannel={setCurrentChannel} currentChannel={currentChannel} isDisabled={isDisabled}></MessageInput>
                <HintList currentChannel={currentChannel} isDisabled={isDisabled}></HintList>
                <Button onClick={() => {
                    let obj = {};
                    obj.messages = Object.values(messages);
                    obj.hints = Object.values(hints);
                    console.log(obj);
                }} className={'btn-primary'}>Сохранить конфигурацию</Button>
            </Col>
        </Container>
    )
}

export default App
