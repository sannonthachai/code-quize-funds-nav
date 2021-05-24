const axios = require('axios');
const cheerio = require('cheerio');
const args = process.argv.slice(2);

const x = async () => {
    try {
        const instance = axios.create({
            headers:{
                Cookie: "hasCookie=true;"
            }
        })

        const { data } = await instance.get('https://codequiz.azurewebsites.net/')
        const $ = cheerio.load(data)

        let listFundnameAndNAV = []
        let listFundname = []
        let listNAV = []

        $('td:first-child').each(function (index, element) {
            listFundname.push($(element).first().text().trim());
        });
        $('td:nth-child(2)').each(function (index, element) {
            listNAV.push($(element).first().text());
        });

        listFundname.forEach((it, i) => {
            const fund = {
                fundname: it,
                nav: listNAV[i]
            }
            listFundnameAndNAV.push(fund)
        })
        console.log(listFundnameAndNAV.find(it => it.fundname === args[0]).nav)
    } catch (error) {
      console.error(error);
    }
}

(async function() {
    await x();
})();