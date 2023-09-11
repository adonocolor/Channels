import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "../../features/messages/messageSlice.jsx";

export const MessageInput = ({messages, setCurrentChannel, currentChannel, isDisabled}) => {
    const dispatch = useDispatch();
    let [message, setMessage] = useState('');

    function handleSubmit() {
        event.preventDefault();

        const formData = {
            currentChannel: currentChannel.id,
            message: message,
        }

        dispatch(addMessage(formData))
        setMessage('');
    }

    return (
        <Row>
            <Form onSubmit={() => {
                handleSubmit()
            }}>
                <Row>
                    <Col>
                        <Button onClick={() => {
                            setCurrentChannel(null);
                        }} className={'btn-danger'} disabled={isDisabled}>Закрыть</Button>
                    </Col>
                    <Col>
                        <FormControl maxLength={currentChannel?.textLength} value={message} onChange={() => {
                            setMessage(event.target.value)
                        }
                        } placeholder={'Напишите сообщение здесь...'} disabled={isDisabled}></FormControl>
                    </Col>
                    <Col>
                        <Button className={'btn-primary'} type='submit' disabled={isDisabled}>Сохранить
                            сообщение</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}