var Queue = require('bull');

try {
    console.log("blondling:manager@@")

    const channels = [
        "https://www.youtube.com/channel/UCBNcq7Kdw1F9LQ1zRpjeeWw",
        "https://www.youtube.com/channel/UCERpgysn81hv0c0FXIjXsTg",
        "https://www.youtube.com/channel/UCZprw7Bxzfh2IysXNnl1S3g",
        "https://www.youtube.com/channel/UCvzoHz_9Vym9HUJ3lNRfCcw",
        "https://www.youtube.com/channel/UCvSJMygwBMDEH6jxIKMdT1Q",
        "https://www.youtube.com/channel/UCek8zsIojbAidIscsWK-vhQ",
        "https://www.youtube.com/channel/UCgKshtw1k7w0Yw8lh41jMMQ",
        "https://www.youtube.com/channel/UCD55o2LYTynwAp5JomjsEow"
    ]

    const youtubeChannelsProcess = new Queue('youtube-channels-process', 'redis://redis:6379')
    const youtubeChannelsResult = new Queue('youtube-channels-result', 'redis://redis:6379')
    

    const results = []

    youtubeChannelsResult.process(function(job, done) {
        results.push(job.data)
        done()
    })

    channels.forEach(function(channel) {

        console.log(`adding channel ${channel} to queue...`)

        youtubeChannelsProcess.add({
            url: channel
        })
    })

    setTimeout(function() {
        console.log(results)
    }, 3000)

} catch (ex) {
    console.error(ex)
}
