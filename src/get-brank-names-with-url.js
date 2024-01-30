const axios = require("axios");
const cheerio = require("cheerio");

export class Bank {
	bankInfo = [];
	url = "https://www.financialnotices.com/a-class-bank.html";

	getBankNamesWithUrl(url) {
		axios
			.get(url)
			.then((response) => {
				const $ = cheerio.load(response.data);

				// Select the div with class "shorts clearfix"
				const shortsDiv = $(".shorts.clearfix");

				// Find all h2 elements within the selected div
				const h2Elements = shortsDiv.find("h2");

				// Iterate through each h2 element
				h2Elements.each((index, h2) => {
					// Extract the URL and link text from the hyperlink within the h2
					const hyperlink = $(h2).find("a");
					const linkUrl = hyperlink.attr("href");
					const linkText = hyperlink.text().trim();

					console.log(`URL ${index + 1}: ${linkUrl}`);
					console.log(`Link Text ${index + 1}: ${linkText}`);
					console.log("---");

					const bankInfoWithUrl = {
						bankName: linkText,
						url: linkUrl,
                    };
                    
                    this.bankInfo.push(bankInfoWithUrl);
				});
			})
			.catch((error) => {
				console.error(`Error fetching data: ${error.message}`);
            });
        
        return this.bankInfo;
	}
}

