import {Button, Col, Row, Stack} from "react-bootstrap";

export const HintList = ({isDisabled, currentChannel}) => {
    let hintList = (<></>);
    if (isDisabled) return (
        <Col className={'p-2'}>
            <Stack style={{height: "200px"}}>
            </Stack>
            <Row>
                <Button style={{visibility: "hidden"}} className={'btn-secondary'}>Добавить еще одну подсказку?</Button>
            </Row>
        </Col>
    )
    if (!isDisabled) {
        return (
            <Col className={'p-2'}>
                <Stack style={{height: "200px"}}>
                    <div>Сейчас выбран канал с идентификатором: {currentChannel?.id}</div>
                </Stack>
                <Row>
                    <Button className={'btn-secondary'}>Добавить еще одну подсказку?</Button>
                </Row>
            </Col>
        )
    }

    return hintList;
}