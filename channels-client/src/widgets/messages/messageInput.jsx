import {Button, Col, Form, FormControl, Row, Stack} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addMessage} from "../../features/messages/messageSlice.jsx";
import {useEffect} from "react";

export const MessageInput = ({messages, message, setMessage, setCurrentChannel, currentChannel, isDisabled}) => {
    const dispatch = useDispatch();

    useEffect(() => {
            let found = messages.find(message => message.channelId === currentChannel.id);
            if (found) {
                setMessage(found.text);
            } else {
                setMessage('')
            }
    }, [currentChannel])

    function handleSubmit() {
        event.preventDefault();

        const formData = {
            currentChannel: currentChannel.id,
            message: message,
        }

        dispatch(addMessage(formData))
    }

    return (
        <Col>
            <Form onSubmit={() => {
                handleSubmit()
            }}>
                <Row>
                    <Col xs={3}>
                        <Button onClick={() => {
                            setCurrentChannel(null);
                        }} className={'btn-danger'} disabled={isDisabled}>Закрыть</Button>
                    </Col>
                    <Col xs={6}>
                        <FormControl maxLength={currentChannel?.textLength} value={message} onChange={() => {
                            setMessage(event.target.value)
                        }
                        } placeholder={'Напишите сообщение здесь...'} disabled={isDisabled}></FormControl>
                    </Col>
                    <Col xs={3}>
                        <Button className={'btn-primary'} type='submit' disabled={isDisabled}>Сохранить
                            сообщение</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    )
}