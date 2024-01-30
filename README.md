# Web Scraping Bank and Branch Information using Node.js

## Overview

This Node.js script is designed to scrape bank and branch information from the [Financial Notices] website. It leverages Axios for making HTTP requests, Cheerio for parsing HTML, and ExcelJS for handling Excel files.

## Tech

Some of the tech and packages I have used are:

- [Node.js] - For the backend
- [Axios]   - Making HTTP requests!
- [Cheerio] - Awesome parsing HTML tool
- [ExcelJS] - Manipulating and handling excel file.

And of course this repo is open source with a [git-repo-url] on GitHub. So, feel free to contribute

## Installation

The project requires [Node.js] v10+ to run.

Install the dependencies and devDependencies and run the js file.
1) Node.js: Ensure that you have Node.js installed on your machine. You can download it from [here][Node.js].
2) Clone the Repository:
    ```bash
    git clone <repository-url>
    ```
3) Install Dependencies:
    ```cmd
    npm install
    ```
## Usage
Run the script by executing the following command in your terminal:

```bash
node <filename>.js
```
Replace <filename<filename>> with the name of the file where your code resides.

#### Example:
```bash
node src/index.js
```

## List of apis for differnet financial institutions in Nepal

Replace the url value in code line 10 of [src/index.js][git-repo-url] file with the url of the website you want to scrape.

Here are the list of apis for differnet financial institutions in Nepal according to [Financial Notices]:

| Financial Institutions Type | Links (URL) |
| ------ | ------ |
| CENTRAL BANK OF NEPAL | [https://www.financialnotices.com/central-bank-of-nepal.html](https://www.financialnotices.com/central-bank-of-nepal.html) |
| A CLASS COMMERCIAL BANK | [https://www.financialnotices.com/a-class-bank.html](https://www.financialnotices.com/a-class-bank.html) |
| B CLASS DEVELOPMENT BANK | [https://www.financialnotices.com/b-class-development-bank.html](https://www.financialnotices.com/b-class-development-bank.html) |
| C CLASS FINANCE COMPANIES | [https://www.financialnotices.com/class-c-finance-companies.html](https://www.financialnotices.com/class-c-finance-companies.html) |
| D CLASS MICROFINANCE COMPANIES | [https://www.financialnotices.com/class-d-micro-credit-development-banks.html](https://www.financialnotices.com/class-d-micro-credit-development-banks.html) |
| INSURANCE COMPANIES IN NEPAL | [https://www.financialnotices.com/insurance-companies-in-nepal.html](https://www.financialnotices.com/insurance-companies-in-nepal.html) |
| MERCHANT BANK | [https://www.financialnotices.com/merchant-banker.html](https://www.financialnotices.com/merchant-banker.html) |
| INFRASTRUCTURE DEVELOPMENT BANK | [https://www.financialnotices.com/infrastructure-development-bank.html](https://www.financialnotices.com/infrastructure-development-bank.html) |

## Development

Ready to sprinkle some magic🪄 on this code? Contributions are open, and we'd love to have your coding flair added to the mix. Whether you're a seasoned developer or just starting out, your skills are more than welcome here.

No need for a grand speech; just fork, code, and submit a pull request. Let's make this project even more awesome together!😉

**Code freedom, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Financial Notices]: <https://www.financialnotices.com/>
   [Axios]:<https://www.npmjs.com/package/axios>
   [Cheerio]:<https://www.npmjs.com/package/cheerio>
   [node.js]: <http://nodejs.org>
   [ExcelJS]:<https://www.npmjs.com/package/exceljs>
   [git-repo-url]: <https://github.com/Aayushbasnet/web-scrap-all-the-bank-and-branch-names-of-nepal/tree/master>
