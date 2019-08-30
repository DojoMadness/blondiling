const Queue = require('bull');
const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--lang=en',
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        })

        const channelsProcess = new Queue('youtube-channels-process', 'redis://redis:6379')
        const channelsResult = new Queue('youtube-channels-result', 'redis://redis:6379')

/*

    The next step I was working on is to move the code from the t-blondi project to another file and call it like that:

    queue.process(5, './YoutubeProcessor.js');
*/

        channelsProcess.process(async (job, done) => {
    
            const url = job.data.url

            const channelsPage = await browser.newPage()
            await channelsPage.goto(url)

            console.log(`processing channel...${url}`)
            const chuncks = url.split("/")

            const name = chuncks[chuncks.length - 1]
            console.log(`channel id: ${name}`)

            channelsResult.add({ name: name, seq: job.data.seq })
            await channelsPage.screenshot({path: `screenshots/${name}.png`})
            console.log(`screenshots/${name}.png`)
        })
    } catch (ex) {
        console.error(ex)
    }
})()
