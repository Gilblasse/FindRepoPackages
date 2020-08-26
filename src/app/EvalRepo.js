import latestVersion from 'latest-version'


const getPackageJson = () => {
    const repoPackageTable = document.querySelector('table').innerText
    const repoPackage = JSON.parse(repoPackageTable)
    
    // const packageVersion = await latestVersion('@testing-library/jest-dom')
    return repoPackage
}


const getGemFile = () => {
    // Scrape Gem file
}



export const languageType = {
    "JavaScript": {url: "/blob/master/package.json", exe: getPackageJson},
    "Ruby": {url: "/blob/master/GemFile", exe: getGemFile}
}