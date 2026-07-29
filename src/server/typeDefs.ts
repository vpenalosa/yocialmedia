//possible inclusions
//interests in user (like other socials)

export const typeDefs = `#graphql
    type User {
        username: String
        tricks: [Trick]
        routines: [Routine]
        following: Int
        followingList: [User]
        followers: Int
        followersList: [User]
    }

    type Comment {
        username: String
        body: String
        likes: Int
    }

    type Trick {
        playbackId: String
        trickId: String
        trickName: String
        author: String
        description: String
        tags: [String]
        uploadDate: String
        views: Int
        likes: Int
        shares: Int
        comments: [Comment]
    }


    type Routine {
        mp3Id: String
    }
`