import { createCustomerController } from "../controllers/createCustomer";
import { getCustomerController } from "../controllers/getCustomer";
import { getCustomersController } from "../controllers/getCustomers";

// setting up the infrastructure for customer routes
const express = require('express');

const router = express.Router(); 

console.log('customer route'); 

router.get('/', getCustomersController);
router.post('/', createCustomerController);
router.get('/:id', getCustomerController);

module.exports = router; 