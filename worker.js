var Queue = require('bull');

try {
    console.log("blondling:worker@@")

    const channelsProcess = new Queue('youtube-channels-process', 'redis://redis:6379')
    const channelsResult = new Queue('youtube-channels-result', 'redis://redis:6379')

    channelsProcess.process(function(job, done) {

        console.log(`processing channel...`)
        const chuncks = job.data.url.split("/")
        const name = chuncks[chuncks.length - 1]
        channelsResult.add({ name: name })
        done()
    })
} catch (ex) {
    console.error(ex)
}
