const latestVersion = require("latest-version")


// SCRAPE JAVASCRIPT PACAKGES
const getPackageJson = async (baseUrl, page, packageType) => {
    const response = await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
    let errorMessage = "Not Found"
    let arr = []

    if(response._status == 200){
        const scrapedData = await page.evaluate(() =>{
            const repoPackageTable = document.querySelector('table').innerText
            const repoPackage = JSON.parse(repoPackageTable)
        
            return repoPackage
        })

        const depends = Object.entries(scrapedData.dependencies)

        for(let i=0; i < depends.length; i++ ){
            const latestV = await latestVersion(depends[i][0])
            arr.push([...depends[i],latestV])
        }
    }


    return response._status == 200 ? arr : errorMessage
}




// SCRAPE RUBY PACAKGES
const getGemFile = async (baseUrl, page, packageType) => {
    const response = await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
    let errorMessage = "Not Found"
    let gems;

    console.log({status: response._status})

    if(response._status == 200){
        gems = await page.evaluate(() =>{
            const tableList = document.querySelectorAll('tr')
            const trs = Object.values(tableList).map(tr => tr.innerText.trim())
            const gemsRows = trs.filter(row => row.match(/(?<=gem)(.*)(?=')/gs)).filter(r => !r.includes('source') && !r.includes('#'))

            const gemsData = gemsRows.map(gem => {
                newGem = gem.split(/^(.+?),/)
                return newGem.length == 1 ? newGem : newGem.slice(1)
            })

            return gemsData
        })
    }

    return response._status == 200 ? gems : errorMessage
}



// SCRAPE PYTHON PACKAGES
const getPythonDependencies = async (baseUrl, page, packageType) => {
    const response = await page.goto(`${baseUrl}${packageType.url}`, { waitUntil: 'networkidle2' } );
    let errorMessage = "Not Found"
    let dependencies;

    if(response._status == 200){
        dependencies = await page.evaluate(() =>{
            const tableList = document.querySelector('table').innerText
            const matches = tableList.match(/(?<= = \[\n)(.*?)(?=])/gs)
            const pyDepends = matches.map(s=> s.split(/,\n/).filter(st=> st.trim().length !== 0)).flat().map(s => s.trim())

            depends = pyDepends.map(s => {
                idx = s.search(/[^'\d a-z | A-Z ]\W/)
                return idx == -1 ? [s] : [ s.substring(0,idx),s.substring(idx) ]
            })

            return depends
        })
    }
    
    return response._status == 200 ? dependencies : errorMessage
}



export const languageType = {
    "JavaScript": {url: "/blob/master/package.json", exe: getPackageJson},
    "Ruby": {url: "/blob/master/Gemfile", exe: getGemFile},
    "Python": {url: "/blob/master/setup.py", exe: getPythonDependencies}
}