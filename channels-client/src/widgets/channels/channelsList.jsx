import {Row, Stack} from "react-bootstrap";
import React from "react";
import {Channel} from "../../entities/channel/channel.jsx";

export const ChannelsList = ({channels, setCurrentChannel, pickedChannels}) => {

    return (
        <Stack>
            {
                channels.map(channel => {
                    return (
                        <Channel key={channel.id} channel={channel} setCurrentChannel={setCurrentChannel}
                                 pickedChannels={pickedChannels}></Channel>
                    )
                })
            }
        </Stack>
    )
}