import {Button, Col, Row} from "react-bootstrap";
import React from "react";

export const Channel = ({channel, setCurrentChannel}) => {

    return (
        <Row>
            <Col>
                <input className={'form-check'} onChange={(e) => {

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