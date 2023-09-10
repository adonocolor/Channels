import {Card} from "react-bootstrap";

export const Channel = ({id, name}) => {

    return (
        <Card key={id}>
            <Card.Title>{name}</Card.Title>
        </Card>
    )

}