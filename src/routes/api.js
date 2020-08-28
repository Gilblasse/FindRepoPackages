// import express from 'express'
// import puppeteer from 'puppeteer'
// import { languageType } from '../app/EvalRepo.mjs'

const express = require('express');
const puppeteer = require('puppeteer');
const languageType = require('../app/EvalRepo');

const router = express.Router();

// Front-End Gets Repo Language through rest: https://api.github.com/repos/:owner/:repo  and sends info via Body parser
router.post('/repo-packages-info', async (req, res) => {

    const owner = req.body.owner
    const repo = req.body.repo
    const language = req.body.language

    const baseUrl = `https://github.com/${owner}/${repo}`
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox']
      });
      
    const page = await browser.newPage();
    const packageType = languageType[language]

    let data = packageType ? await packageType.exe(baseUrl, page, packageType) : "Not Found"

    browser.close();
    res.send({data})
});


module.exports = router
// export default router;