const urls = [
	{
		bankName: "value1",
		url: "url_link1",
	},
	{
		bankName: "value2",
		url: "url_link2",
	},
	// Add more URL objects as needed
];

// Function to perform web scraping for a given URL object
const scrapeData = async ({ bankName, url }) => {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		// Select the table using its CSS selector
		const table = $("table");

		// Assuming the first row is the header, extract column names
		const headers = [];
		table.find("thead th").each((index, th) => {
			headers.push($(th).text().trim());
		});

		// Create a new workbook and add a worksheet with bankName
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet(bankName);

		// Add header row to worksheet
		worksheet.addRow([...headers, "Bank Name"]);

		// Loop through each row of the table (excluding the header)
		table.find("tbody tr").each((index, row) => {
			// Extract and add data from each cell to the worksheet
			const rowData = [];
			const columns = $(row).find("td");
			columns.each((colIndex, col) => {
				rowData.push($(col).text().trim());
			});

			// Add Bank Name to the row
			rowData.push(bankName);

			worksheet.addRow(rowData);
		});

		// Save the workbook to a file
		const excelFileName = `scraped_data_${bankName.replace(
			/[^a-zA-Z0-9]/g,
			"_"
		)}.xlsx`;
		await workbook.xlsx.writeFile(excelFileName);
		console.log(`Data for ${bankName} has been written to ${excelFileName}`);
	} catch (error) {
		console.error(`Error fetching data for ${bankName}: ${error.message}`);
	}
};

// Loop through each URL object and perform web scraping
for (const urlObject of urls) {
	scrapeData(urlObject);
}
