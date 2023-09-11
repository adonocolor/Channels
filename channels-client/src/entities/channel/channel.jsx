import {Button, Col, Row} from "react-bootstrap";
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
            <Col>
                <input className={'form-check'} onChange={(e) => {
                    handleChange(e.target.checked, e.target.value)
                }} value={channel.id} type={'checkbox'}></input>
            </Col>
            <Col>
                <p>{channel.name}</p>
            </Col>
            <Col>
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