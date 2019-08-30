var Queue = require('bull');

try {
    const channels = [
        "https://www.youtube.com/channel/UCBNcq7Kdw1F9LQ1zRpjeeWw",
    ]

    const youtubeChannelsProcess = new Queue('youtube-channels-process', 'redis://redis:6379')
    const youtubeChannelsResult = new Queue('youtube-channels-result', 'redis://redis:6379')

    const results = []

    youtubeChannelsResult.process(async (job, done) => {
        console.log(`manager:result`)
        console.log(job.data)
        results.push(job.data)
    })

    var i = 0
    channels.forEach(function(channel) {

        console.log(`adding channel ${channel} to queue...`)

        youtubeChannelsProcess.add({
            url: channel,
            seq: ++i
        })
    })

    setTimeout(function() {
        console.log(results)
    }, 3000)

} catch (ex) {
    console.error(ex)
}
