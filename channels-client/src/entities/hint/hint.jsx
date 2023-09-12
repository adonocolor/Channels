import {Button} from "react-bootstrap";

export const Hint = ({hint, setMessage}) => {
    let width;
    let text;

    if (hint.text.length > 20) {
        text = hint.text.slice(0, 20) + '...'
    } else {
        text = hint.text;
    }

    switch (hint?.displayType) {
        case 1:
            width = "200px";
    }

    if (Number(hint.type) === 0)
        return (
            <Button variant={"light"} style={{width: width}}
                    onClick={() => setMessage(hint.text)}>{text}</Button>
        )
    if (Number(hint.type) === 1)
        return (
        <Button variant={"success"} onClick={() => window.location.replace(hint.text)}>{text}</Button>
    )
}