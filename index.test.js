const {sequelize} = require("./db");
const {Channel, Playlist, Video, CommentSection, Comment} = require("./index")

describe('Youtube Database', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create video', async() => {
        const testVideo = await Video.create({name: 'Charlie Bit My Finger'})
        expect(testVideo.name).toEqual('Charlie Bit My Finger')
    })

    test('can create comment section', async() => {
        const testSection = await CommentSection.create({isEnabled: true})
        expect(testSection.isEnabled).toBeTruthy()
    })

    test('can create comment', async() => {
        const testComment = await Comment.create({body: 'Good Video'})
        expect(testComment.body).toEqual('Good Video')
    })

    test('videos have one comment section', async() => {
        const testVideo = await Video.create({name: 'Charlie Bit My Finger'})
        const testSection = await CommentSection.create({numCom: 1000, isEnabled: true})
        await testVideo.setCommentSection(testSection)
        const myCommentSection = await testVideo.getCommentSection();
        expect(myCommentSection).toBeInstanceOf(CommentSection);
    })

    test('comment sections have comments', async() => {
        const testSection = await CommentSection.create({numCom: 1000, isEnabled: true})
        
        const comment1 = await Comment.create({body: 'first comment!'})
        const comment2 = await Comment.create({body: 'LOL'})
        const comment3 = await Comment.create({body: 'good content'})

        await testSection.addComment(comment1)
        await testSection.addComment(comment2)
        await testSection.addComment(comment3)

        const myComments = await testSection.getComments();
        expect(myComments[0].body).toEqual('first comment!')
        expect(myComments[0]).toBeInstanceOf(Comment)
    })

    test('channel has many videos', async() => {
        const GMM = await Channel.create({name: 'Good Mythical Morning', verified: true, numVideos: 2000, numSub: 17000, numViews:70000})
        
        const video1 = await Video.create({name: 'International Desserts Taste Test'})    
        const video2 = await Video.create({name: 'Will it Taquito?'})
        const video3 = await Video.create({name: 'Oven vs Air Fryer Taste Test'})
        

        await GMM.addVideo(video1)
        await GMM.addVideo(video1)
        await GMM.addVideo(video1)

        const myVideos = await GMM.getVideos();
        expect(myVideos[0].name).toEqual('International Desserts Taste Test')
    })

    test('video belongs to channel and playlist', async() => {
        const GMM = await Channel.create({name: 'Good Mythical Morning', verified: true, numVideos: 2000, numSub: 17000, numViews:70000})
        const testPlaylist = await Playlist.create({name: 'Favorite Videos'})

        const video1 = await Video.create({name: 'International Desserts Taste Test'})    
        const video2 = await Video.create({name: 'Will it Taquito?'})
        const video3 = await Video.create({name: 'Oven vs Air Fryer Taste Test'})
        

        await GMM.addVideo(video1)
        await GMM.addVideo(video2)
        await GMM.addVideo(video3)
        await testPlaylist.addVideo(video1)
        await testPlaylist.addVideo(video2)
        await testPlaylist.addVideo(video3)

        const myVideos = await GMM.getVideos();
        expect(myVideos[0].name).toEqual('International Desserts Taste Test')
        const myPlaylist = await testPlaylist.getVideos();
        expect(myPlaylist[1].name).toEqual('Will it Taquito?')
    })

})