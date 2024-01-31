const axios = require("axios");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

/* replace the url with the url of the website you want to scrape
    I have used the website https://www.financialnotices.com/a-class-bank.html to scrape the data 
    of all the banks of A-class in Nepal
*/

const url = "https://www.financialnotices.com/a-class-bank.html";

let bankInfo = [];

async function extractLinks(url) {
    const response = await axios.get(url);
	const $ = cheerio.load(response.data);

	// Select the div with class "shorts clearfix"
	const shortsDiv = $(".shorts.clearfix");

	// Find all h2 elements within the selected div
	const h2Elements = shortsDiv.find("h2");

	// Array to store the results
	const links = [];

	// Iterate through each h2 element
	h2Elements.each((index, h2) => {
		// Extract the URL and link text from the hyperlink within the h2
		const hyperlink = $(h2).find("a");
		const linkUrl = hyperlink.attr("href");
		const linkText = hyperlink.text().trim();

		links.push({ url: linkUrl, text: linkText });
	});

	let branchLocationUrl = "";
	for(const link of links) {
		const containsBranchLocations = /Branch(?:es|s)? Location(?:s|es)?/i.test(
			link?.text || ""
		);
		if(containsBranchLocations) {
			branchLocationUrl = link?.url;
		} 
	};
	if(branchLocationUrl === "") {
			return links[2]?.url ?? links[1]?.url ?? links[0]?.url ?? "";
	} else {
		return branchLocationUrl;
	}
    
};

async function getBankNamesWithUrl(url) {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		const shortsDiv = $(".shorts.clearfix");
        const h2Elements = shortsDiv.find("h2");
        
        let index = 0;
        for (const h2 of h2Elements) { 
            const hyperlink = $(h2).find("a");
            const hrefUrl = hyperlink.attr("href");
            const linkUrl = await extractLinks(hrefUrl);
            console.log("🚀 ~ getBankNamesWithUrl ~ linkUrl:", linkUrl)
            const linkText = hyperlink.text().trim();

            console.log(`URL ${index + 1}: ${linkUrl}`);
            console.log(`Link Text ${index + 1}: ${linkText}`);
            console.log("---");

            const bankInfoWithUrl = {
                bankName: linkText,
                url: linkUrl,
            };

            bankInfo.push(bankInfoWithUrl);
            index++;
        }

		return bankInfo;
	} catch (error) {
		console.error(`Error fetching data: ${error.message}`);
		throw error; // Re-throw the error to propagate it further
	}
}

async function getBankNames() {
	try {
		const bankNamesWithUrl = await getBankNamesWithUrl(url);
		return bankNamesWithUrl;
	} catch (error) {
		console.error("Error in getBankNames", error);
		throw error;
	}
}

async function scrapData(bankNamesWithUrl, worksheet) {
	const { bankName, url } = bankNamesWithUrl;
	try {
		console.log("Inside scrapData");
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		const table = $("table");
		const headers = [];
		table.find("thead th").each((index, th) => {
			headers.push($(th).text().trim());
		});

		worksheet.addRow([...headers, "Bank Name"]);

		table.find("tbody tr").each((index, row) => {
			const rowData = [];
			const columns = $(row).find("td");
			columns.each((colIndex, col) => {
				rowData.push($(col).text().trim());
			});

			rowData.push(bankName);
			worksheet.addRow(rowData);
		});
		console.log(`Data for ${bankName} has been added to the worksheet`);
	} catch (error) {
		console.error(`Error fetching data for ${bankName}: ${error.message}`);
		throw error;
	}
}

async function scrapeAllData() {
	try {
		const bankNamesWithUrl = await getBankNames();
		console.log("🚀 ~ scrapeAllData ~ bankNamesWithUrl:", bankNamesWithUrl);

		// Create a new workbook and add a worksheet with bankName
		const workbook = new ExcelJS.Workbook();

		for (const bankNameWithUrl of bankNamesWithUrl) {
			const worksheet = workbook.addWorksheet(bankNameWithUrl.bankName);
			await scrapData(bankNameWithUrl, worksheet);
		}

		// Save the workbook to a file
		const excelFileName = `scraped_data.xlsx`;
		await workbook.xlsx.writeFile(excelFileName);
		console.log(`All data has been written to ${excelFileName}`);
	} catch (error) {
		console.error("Error in scrapeAllData", error);
	}
}

scrapeAllData();
