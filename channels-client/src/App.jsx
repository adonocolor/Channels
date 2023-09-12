import './App.css'
import {Alert, Button, Col, Container, Modal} from "react-bootstrap";
import {ChannelsList} from "./widgets/channels/channelsList.jsx";
import {useGetChannelsQuery} from "./features/channels/api/apiChannelsSlice.jsx";
import {MessageInput} from "./widgets/messages/messageInput.jsx";
import {useEffect, useState} from "react";
import {HintList} from "./widgets/Hint/hintList.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {useSelector} from "react-redux";
import {useSaveConfigMutation} from "./features/config /api/apiConfigSlice.jsx";
import {AddHintModal} from "./widgets/Hint/addHintModal.jsx";


function App() {

    const {
        data: channels,
        isLoading,
        error: queryError,
    } = useGetChannelsQuery()

    const [saveConfig, {error: mutationError}] = useSaveConfigMutation();

    let [isDisabled, setIsDisabled] = useState(true);
    let [modalDisabled, setModalDisabled] = useState(true);
    let [currentChannel, setCurrentChannel] = useState(null);
    let [message, setMessage] = useState('');
    let [displayType, setDisplayType] = useState('');
    let [alertMessage, setAlertMessage] = useState('')
    let [alertShow, setAlertShow] = useState(false);

    const messages = useSelector(store => store.messageSlice.messages);
    const hints = useSelector(store => store.hintSlice.hints);
    const pickedChannels = useSelector(state => state.channelSlice.channels);


    useEffect(() => {
        setAlertShow(false);
        setAlertMessage(false);
        setMessage('');
        if (currentChannel !== null) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [currentChannel]);

    if (isLoading) return <div>Загрузка...</div>

    if (queryError) return <div>Кажется, что наш сервер не работает! Попробуйте позже...</div>


    return (
        <Container>
            <ChannelsList pickedChannels={pickedChannels} setCurrentChannel={setCurrentChannel}
                          channels={channels}></ChannelsList>
            <Col className={'d-flex flex-column'}>
                <MessageInput messages={messages} message={message} setMessage={setMessage} setCurrentChannel={setCurrentChannel}
                              currentChannel={currentChannel}
                              isDisabled={isDisabled}></MessageInput>
                <HintList hints={hints} displayType={displayType} message={message} setMessage={setMessage}
                          modalDisabled={modalDisabled} setModalDisabled={setModalDisabled}
                          currentChannel={currentChannel} isDisabled={isDisabled}></HintList>
                <AddHintModal currentChannel={currentChannel} modalDisabled={modalDisabled}
                              setModalDisabled={setModalDisabled}></AddHintModal>
                <Col>
                    <Button onClick={() => {
                        let obj = {
                            messages: messages.filter(message => pickedChannels.map(channel => message.channelId === channel)),
                            hints: hints.filter(hint => pickedChannels.map(channel => hint.channelId === channel)),
                        };
                        if (obj.messages.length === 0 && obj.hints.length === 0) {
                            setAlertShow(true);
                            setAlertMessage('В пустой конфигурации нету смысла 😁');
                            return;
                        }
                        setAlertShow(true);
                        setAlertMessage('Конфигурация была успешно сохранена в базу данных!');
                        saveConfig(obj);
                    }
                    } className={'btn-primary'}>Сохранить конфигурацию</Button>
                </Col>
                <Alert show={alertShow} variant={'info'}>{alertMessage}</Alert>
            </Col>
        </Container>
    )
}

export default App
