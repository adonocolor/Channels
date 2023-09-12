import {Button, Col, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import {Hint} from "../../entities/hint/hint.jsx";
import {useDispatch} from "react-redux";
import {deleteLastHint} from "../../features/hints/hintSlice.jsx";

export const HintList = ({setModalDisabled, isDisabled, currentChannel, hints, setMessage}) => {
    const dispatch = useDispatch();
    let [displayType, setDisplayType] = useState(false);
    let hintList;

    if (!displayType) {
        hintList = (
            <Stack style={{height: "260px"}} className={'overflow-auto'}>
                {
                    hints.map(hint => {
                        if (hint.channelId === currentChannel?.id && Number(hint.displayType) === 0) return (
                            <Hint hint={hint} setMessage={setMessage}></Hint>
                        )
                    })
                }
            </Stack>
        )
    } else {
        hintList = (
            <Stack style={{height: "260px"}} direction={'horizontal'} className={'overflow-x-auto'}>
                {
                    hints.map(hint => {
                        if (hint.channelId === currentChannel?.id && Number(hint.displayType) === 1) return (
                            <Hint hint={hint} setMessage={setMessage}></Hint>
                        )
                    })
                }
            </Stack>
        )
    }

    if (isDisabled) return (
        <Col className={'p-2'}>
            <Stack style={{height: "400px"}}>
                <Row>
                    <Button style={{visibility: "hidden"}} className={'btn-secondary'}>Добавить еще одну
                        подсказку?</Button>
                </Row>
            </Stack>
        </Col>
    )
    else {
        return (
            <Col style={{height: "400px"}}>
                <Row>
                    <Col xs={3}>
                    </Col>
                    <Col xs={6}>
                        <div>Сейчас выбран канал: {currentChannel?.name}</div>
                        <div>Ограничение по кол-ву символов: {currentChannel?.textLength}</div>
                        <Button onClick={() => setDisplayType(!displayType)}>Сменить отображение</Button>
                    </Col>
                    <Col xs={3}>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6} className={'hints'}>
                        {hintList}
                    </Col>
                    <Col xs={3}></Col>
                </Row>
                <Row>
                    <Col xs={3}>
                    </Col>
                    <Col xs={3}>
                        <Button variant={"danger"} onClick={() => dispatch(deleteLastHint(currentChannel.id))}>Удалить
                            последнюю подсказку</Button>
                    </Col>
                    <Col xs={3}>
                        <Button className={'btn-secondary'} onClick={() => setModalDisabled(false)}>Добавить еще
                            одну
                            подсказку?</Button>
                    </Col>
                    <Col xs={3}>
                    </Col>
                </Row>
            </Col>)
    }
}