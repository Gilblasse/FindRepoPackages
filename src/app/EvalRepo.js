import latestVersion from 'latest-version'


const getPackageJson = async (baseUrl, page, packageType) => {
    await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
    
    const data = await page.evaluate(() =>{
        const repoPackageTable = document.querySelector('table').innerText
        const repoPackage = JSON.parse(repoPackageTable)
        
        // const packageVersion = await latestVersion('@testing-library/jest-dom')
        return repoPackage
    })

    return data
}


const getGemFile = async (baseUrl, page, packageType) => {
    await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
    // Scrape Gem file
}



export const languageType = {
    "JavaScript": {url: "/blob/master/package.json", exe: getPackageJson},
    "Ruby": {url: "/blob/master/GemFile", exe: getGemFile}
}