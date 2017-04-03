const { Database } = require('sqlite3').verbose();
const db = new Database('bangazon.sqlite', () => console.log('Tables deleted'));

db.run(`DROP TABLE Customers`);
db.run(`DROP TABLE Payment_Options`);
db.run(`DROP TABLE Products`);
db.run(`DROP TABLE Orders`);
db.run(`DROP TABLE Order_Line`);
