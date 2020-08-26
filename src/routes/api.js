import express from 'express'
import puppeteer from 'puppeteer'
import { languageType } from '../app/EvalRepo'

const router = express.Router();

router.post('/repo-packages-info', async (req, res) => {

    const owner = req.body.owner
    const repo = req.body.repo
    const language = req.body.repo

    const baseUrl = `https://github.com/${owner}/${repo}`
    let data = "Not Found"

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const packageType = languageType[language]
    
    if(packageType){
        await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
        data = await page.evaluate(async () => packageType.exe)
    }

    browser.close();
    res.send({data})
});


module.exports = router;