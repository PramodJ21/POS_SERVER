const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

const storeSalesController = (req, res) => {
    const transactionsFile = path.join(__dirname,'..' ,'model' , 'salesTransactions.json'); // Assuming transactions are stored in a JSON file

    // Step 1: Read existing transactions
    let transactions = []
    if (fs.existsSync(transactionsFile)) {
        const rawData = fs.readFileSync(transactionsFile);
        transactions = JSON.parse(rawData);
    }

    // Step 2: Determine the last index
    let lastIndex = 0;
    if (transactions.length > 0) {
        const lastTransaction = transactions[transactions.length - 1];
        const lastInvoiceNo = lastTransaction.invoiceNo;
        const lastInvoiceIndex = parseInt(lastInvoiceNo.split('/')[1], 10);
        lastIndex = isNaN(lastInvoiceIndex) ? 0 : lastInvoiceIndex;
    }

    // Step 3: Create new transactions with incremented indices
    const { items, customer, date } = req.body;
    items.forEach((item, index) => {
        const invoiceNo = `INV/${lastIndex + index + 1}/${date}`;
        const { name, quantity, price } = item;
        const transaction = {
            "invoiceNo": invoiceNo,
            "date": date,
            "customerName": customer.name,
            "productName": name,
            "productQty": quantity,
            "productTotal": price * quantity
        };
        transactions.push(transaction);
    });
    console.log(transactions)
    // Step 4: Save the updated transactions back to the file
    fsPromises.writeFile(
        transactionsFile,
        JSON.stringify(transactions)
    )
    res.status(201).json({ message: 'Sales transactions recorded successfully.' });
};

module.exports = storeSalesController