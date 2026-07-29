//possible inclusions
//interests in user (like other socials)

export const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        tricks: [Trick!]!
        routines: [Routine!]!
        followingList: [User!]!
        followersList: [User!]!
    }

    type Comment {
        id: ID!
        username: String!
        body: String!
        likes: Int!
    }

    type Trick {
        playbackId: ID!
        trickId: ID!
        trickName: String!
        author: User!
        description: String
        tags: [String!]!
        uploadDate: String!
        views: Int!
        likes: Int!
        shares: Int!
        comments: [Comment!]!
    }


    type Routine {
        mp3Id: ID!
    }

    type Query {
        getAllUsers(page: Int!, pageSize: Int): [User!]!
        getAllTricks(page: Int!, pageSize: Int): [Trick!]!
        
        getUserByUsername(username: String!): User
        getTrickById(id: ID!): Trick
        getRoutineById(id: String!): Routine

        getTricksByTag(tags: [String!]!, page: Int!, pageSize: Int): [Trick!]!
    }

    type Mutation {
        uploadTrick(
            playbackId: ID!,
            trickName: String!,
            description: String,
            tags: [String!]!
        ) : Trick!
        editTrick(
            trickId: ID!,
            trickName: String,
            description: String,
            tags: [String!]
        ): Trick!
        deleteTrick(trickId: ID!): Trick!

        uploadRoutine(
            mp3Id: ID!
        ): Routine!
        editRoutine(
            mp3Id: ID!
        ): Routine!
        deleteRoutine(routineID: ID!): Routine!

        viewTrick(trickId: ID!): Trick!
        likeTrick(trickId: ID!): Trick!
        shareTrick(trickId: ID!): Trick!

        addComment(
            username: String!,
            body: String!,
            trickId: ID!
        ): Comment!
        editComment(
            commentId: ID!,
            body: String
        ): Comment!
        likeComment(commentId: ID!): Comment!
        deleteComment(commentId: ID!): Comment!
    }
`