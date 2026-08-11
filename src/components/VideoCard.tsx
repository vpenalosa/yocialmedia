import MuxPlayer from "@mux/mux-player-react";
import { Box, Card, Inset, Text} from "@radix-ui/themes";

interface VideoProps {
    playbackId: string;
    videoId: string;
    videoTitle: string;
    viewerUserId: string;
    description: string;
    // tags: [string];
}

function VideoCard(props : VideoProps) {
    return (
            <Box maxWidth={"240px"}>
                <Card size={"2"}>
                    <Inset clip={"padding-box"} side={"top"} pb={"current"}>
                        <MuxPlayer
                            playbackId={props.playbackId}
                            metadata={{
                                video_id: props.videoId,
                                video_title: props.videoTitle,
                                viewer_user_id: props.viewerUserId
                            }}
                        />
                        <Text as={"p"} size={"3"}>{props.description}</Text>
                    </Inset>
                </Card>
            </Box>
    )
}

export default VideoCard;