import {Button, Card, Stack} from "react-bootstrap";
import React from "react";
import {Channel} from "../../entities/channel/channel.jsx";

export const ChannelsList = () => {

    return (
        <Stack>
            <>
                <Channel id={1} name={"test"}></Channel>
                <Button>Edit</Button>
            </>
            <Channel id={2} name={"test"}></Channel>
        </Stack>
    )
}