import { Grid, Theme } from "@radix-ui/themes";
import VideoCard from "./VideoCard";

function TrickGrid() {
    return(
        <Theme hasBackground={false}>
            <Grid columns={"5"} gap={"3"} rows={"repeat(2, 230px)"} width={"auto"}>
                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick0"}
                    videoTitle={"king of nothing"}
                    viewerUserId={"warachnid"}
                    description={"cool trick i made for my music appreciation class type type type type "}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />

                <VideoCard 
                    playbackId={"0"}
                    videoId={"trick1"}
                    videoTitle={"pov autopilot"}
                    viewerUserId={"warachnid"}
                    description={"lil autopilot that i've been spamming a lot"}
                />
            </Grid>

        </Theme>
    )
}

export default TrickGrid;