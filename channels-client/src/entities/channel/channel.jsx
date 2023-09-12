import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import React from "react";
import {addChannel, removeChannel} from "../../features/channels/channelSlice.jsx";
import {useDispatch, useSelector} from "react-redux";

export const Channel = ({channel, setCurrentChannel, pickedChannels}) => {
    const dispatch = useDispatch();

    function handleChange(checked, value) {
        let found = pickedChannels.includes(value);

        if (checked && !found) {
            dispatch(addChannel(value))
        }
        if (!checked && found) {
            dispatch(removeChannel(value))
        }
    }

    return (
        <Row>
            <Col xs={3}>
                <input className={'form-check-input'} onChange={(e) => {
                    handleChange(e.target.checked, e.target.value)
                }} value={channel.id} type={'checkbox'}></input>
            </Col>
            <Col xs={6}>
                <p>{channel.name}</p>
            </Col>
            <Col xs={3}>
                <Button
                    onClick={() => {
                        setCurrentChannel(channel)
                    }}>
                    Редактировать
                </Button>
            </Col>
        </Row>
    )
}