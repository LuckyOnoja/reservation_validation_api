const fs = require('fs');

function loadInventory() {
    return JSON.parse(fs.readFileSync('inventory_data.json', 'utf8'));
}

function processReservation(requestedQuantity){
    const inventory = loadInventory();
    console.log(`Attempting Reservation for quantity: ${requestedQuantity}`);
    console.log(`Current Stock Before: ${inventory.availableStock}`);

    if(typeof requestedQuantity !== 'number' || isNaN(requestedQuantity) ){
        console.log("REJECTED: Quantity must be a valid number.");
        return false;
    }

    if(requestedQuantity <= 0){
        console.log("REJECTED: Quantity must be greater than zero."); 
        return false;
    }

    if(requestedQuantity > inventory.availableStock){
        console.log("REJECTED: Requested Quantity exceeds available stock.");
        return false;
    }

    inventory.availableStock -= requestedQuantity;

    fs.writeFileSync('inventory_data.json', JSON.stringify(inventory, null, 2));

    console.log(`APPROVED: Stock Successfully updated. Remaining : ${inventory.availableStock}`);
    return true;

}

console.log("Running Endpoint Reservation Tests");
processReservation(-5);
processReservation(50);
processReservation(3);

console.log("Final Inventory Status:");
console.log(loadInventory());