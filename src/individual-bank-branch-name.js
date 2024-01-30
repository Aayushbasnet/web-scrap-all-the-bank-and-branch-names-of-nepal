const axios = require("axios");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

const url =
	"https://www.financialnotices.com/everest-bank-branch-locations.html";

axios
	.get(url)
	.then((response) => {
		const $ = cheerio.load(response.data);

		// Select the table using its CSS selector
		const table = $("table");

		// Assuming the first row is the header, extract column names
		const headers = [];
		table.find("thead th").each((index, th) => {
			headers.push($(th).text().trim());
		});

		// Create a new workbook and add a worksheet
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Sheet 1");

		// Add header row to worksheet
		worksheet.addRow(headers);

		// Loop through each row of the table (excluding the header)
		table.find("tbody tr").each((index, row) => {
			// Extract and add data from each cell to the worksheet
			const rowData = [];
			const columns = $(row).find("td");
			columns.each((colIndex, col) => {
				rowData.push($(col).text().trim());
			});

			worksheet.addRow(rowData);
		});

		// Save the workbook to a file
		const excelFileName = "scraped_data.xlsx";
		workbook.xlsx
			.writeFile(excelFileName)
			.then(() => {
				console.log(`Data has been written to ${excelFileName}`);
			})
			.catch((error) => {
				console.error(`Error writing Excel file: ${error.message}`);
			});
	})
	.catch((error) => {
		console.error(`Error fetching data: ${error.message}`);
	});
