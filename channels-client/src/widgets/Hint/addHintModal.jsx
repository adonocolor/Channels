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

    useEffect(() => {
        setText('');
        setDisplayType(Number(0));
        setButtonType(Number(0));
        setErrorMessage('');
        setAlertShow(false);
    }, [modalDisabled])

    const urlPatternValidation = (URL) => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(URL);
    };


    function handleSubmit() {

        console.log(currentChannel);
        console.log(buttonType, displayType)

        if (alertShow) {
            setErrorMessage('');
            setAlertShow(false);
        }

        if (text.length === 0) {
            setErrorMessage('Введите что-нибудь!');
            setAlertShow(true);
            return;
        }

        if (Number(buttonType) === 1 && !urlPatternValidation(text)) {
            setErrorMessage('Текст не является ссылкой!');
            setAlertShow(true);
            return;
        }

        // Hint validation

        if (displayType === 0) {
            if (currentChannel.standardButtonTextLength && text.length > currentChannel.standardButtonTextLength) {
                setErrorMessage('Превышает допустимое количество символов для вида отображаемой клавиауры!');
                setAlertShow(true);
                return;
            }

            if (buttonType === 0) {
                const standardButtonCount = hints.map(hint => {
                    if (hint.channelId === currentChannel.id
                        && hint.type === buttonType
                        && hint.displayType === displayType)
                        return hint
                }).length + 1;

                if (currentChannel.standardButtonCount && standardButtonCount >= currentChannel.standardButtonCount) {
                    setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                        'типа отображения и вида кнопок!');
                    setAlertShow(true);
                    return;
                }
            }
            if (buttonType === 1) {
                const standardButtonLinkCount = hints.map(hint => {
                    if (hint.channelId === currentChannel.id
                        && hint.type === buttonType
                        && hint.displayType === displayType)
                        return hint
                }).length;

                if (currentChannel.standardButtonLinkCount && standardButtonLinkCount >= currentChannel.standardButtonLinkCount) {
                    setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                        'типа отображения и вида кнопок!');
                    setAlertShow(true);
                    return
                }
            }
        }

        if (displayType === 1) {
            if (currentChannel.inlineButtonTextLength && text.length > currentChannel.inlineButtonTextLength) {
                setErrorMessage('Превышает допустимое количество символов для вида отображаемой клавиауры!');
                setAlertShow(true);
                return;
            }

            if (buttonType === 0) {
                const inlineButtonCount = hints.filter(hint => {
                    if (hint.channelId === currentChannel.id
                        && hint.type === 0
                        && hint.displayType === 1)
                        return hint
                }).length;

                if (currentChannel.inlineButtonCount && inlineButtonCount >= currentChannel.inlineButtonCount) {
                    setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                        'типа отображения и вида кнопок!');
                    setAlertShow(true);
                    return
                }
            }
            if (buttonType === 1) {
                const inlineButtonLinkCount = hints.map(hint => {
                    if (hint.channelId === currentChannel.id
                        && hint.type === 1
                        && hint.displayType === 1)
                        return hint
                }).length;

                if (currentChannel.inlineButtonLinkCount && inlineButtonLinkCount >= currentChannel.inlineButtonLinkCount) {
                    setErrorMessage('Превышает допустимое количество кнопок для выбранного ' +
                        'типа отображения и вида кнопок!');
                    setAlertShow(true);
                    return
                }
            }
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
                    <FormSelect value={buttonType} onChange={() => setButtonType(Number(event.target.value))}>
                        <option value={0}>Обычная кнопка</option>
                        <option value={1}>URL</option>
                    </FormSelect>
                    <FormLabel className={'mt-2'}>Отображение кнопки</FormLabel>
                    <FormSelect value={displayType} onChange={() => setDisplayType(Number(event.target.value))}>
                        <option value={0}>Стандартное отображение</option>
                        <option value={1}>Inline-отображение</option>
                    </FormSelect>
                </Form>
                <Alert className={'fade mt-2'} show={alertShow} variant={'danger'}>{errorMessage}</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    handleSubmit()
                }}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}