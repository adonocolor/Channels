import {Alert, Button, Form, FormControl, FormLabel, FormSelect, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addHint} from "../../features/hints/hintSlice.jsx";

export const AddHintModal = ({currentChannel, modalDisabled, setModalDisabled}) => {

    const dispatch = useDispatch()

    const hints = useSelector(store => store.hintSlice.hints);

    const [text, setText] = useState('');
    const [buttonType, setButtonType] = useState(0);
    const [displayType, setDisplayType] = useState(0);
    const [alertShow, setAlertShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setErrorMessage('');
        setAlertShow(false);
    }, [currentChannel])

    function handleSubmit() {
        if (alertShow) {
            setErrorMessage('');
            setAlertShow(false);
        }

        // Hint validation
        switch (displayType) {
            case 0:
                if (text.length > currentChannel.standardButtonTextLength && currentChannel.standardButtonTextLength !== null) {
                    setErrorMessage('Превышает допустимое количество символов для вида отображаемой клавиауры!');
                    setAlertShow(true);
                    return;
                }

                switch (buttonType) {
                    case 0:
                        const standardButtonCount = hints.map(hint => {
                            if (hint.channelId === currentChannel.id
                                && hint.type === buttonType
                                && hint.displayType === displayType)
                                return hint
                        }).length;

                        if (standardButtonCount > currentChannel.standardButtonCount && currentChannel.standardButtonCount !== null) {
                            setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                                'типа отображения и вида кнопок!');
                            setAlertShow(true);
                            return
                        }
                    case 1:
                        const standardButtonLinkCount = hints.map(hint => {
                            if (hint.channelId === currentChannel.id
                                && hint.type === buttonType
                                && hint.displayType === displayType)
                                return hint
                        }).length;

                        if (standardButtonCount > currentChannel.standardButtonLinkCount && currentChannel.standardButtonLinkCount !== null) {
                            setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                                'типа отображения и вида кнопок!');
                            setAlertShow(true);
                            return
                        }
                }
            case 1:
                if (text.length > currentChannel.inlineButtonTextLength && currentChannel.inlineButtonTextLength !== null) {
                    setErrorMessage('Превышает допустимое количество символов для вида отображаемой клавиауры!');
                    setAlertShow(true);
                    return;
                }

                switch (buttonType) {
                    case 0:
                        const inlineButtonCount = hints.map(hint => {
                            if (hint.channelId === currentChannel.id
                                && hint.type === buttonType
                                && hint.displayType === displayType)
                                return hint
                        }).length;

                        if (inlineButtonCount > currentChannel.inlineButtonCount && currentChannel.inlineButtonCount !== null) {
                            setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                                'типа отображения и вида кнопок!');
                            setAlertShow(true);
                            return
                        }
                    case 1:
                        const inlineButtonLinkCount = hints.map(hint => {
                            if (hint.channelId === currentChannel.id
                                && hint.type === buttonType
                                && hint.displayType === displayType)
                                return hint
                        }).length;

                        if (inlineButtonLinkCount > currentChannel.inlineButtonLinkCount && currentChannel.inlineButtonLinkCount ) {
                            setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                                'типа отображения и вида кнопок!');
                            setAlertShow(true);
                            return
                        }
                }
        }

        if (text.length === 0) {
            setErrorMessage('Введите что-нибудь!');
            setAlertShow(true);
            return;
        }

        const formData = {
            channelId: currentChannel.id,
            text: text,
            type: buttonType,
            displayType: displayType,
        }

        dispatch(addHint(formData));
        setModalDisabled(!modalDisabled);
    }


    return (
        <Modal show={!modalDisabled} onHide={() => setModalDisabled(!modalDisabled)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавление подсказки для {currentChannel?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormLabel className={'mt-2'}>Текст подсказки</FormLabel>
                    <FormControl placeholder={'Текст подсказки'} value={text}
                                 onChange={() => setText(event.target.value)}/>
                    <FormLabel className={'mt-2'}>Тип кнопки</FormLabel>
                    <FormSelect value={buttonType} onChange={() => setButtonType(event.target.value)}>
                        <option value={0}>Обычная кнопка</option>
                        <option value={1}>URL</option>
                    </FormSelect>
                    <FormLabel className={'mt-2'}>Отображение кнопки</FormLabel>
                    <FormSelect value={displayType} onChange={() => setDisplayType(event.target.value)}>
                        <option value={0}>Стандартное отображение</option>
                        <option value={1}>Inline отображение</option>
                    </FormSelect>
                </Form>
                <Alert classname={'fade'} show={alertShow} variant={'danger'} className={'mt-2'}>{errorMessage}</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    handleSubmit()
                }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )}