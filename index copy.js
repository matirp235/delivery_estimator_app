const inquirer = require('inquirer');
const DeliveryController = require('./src/controllers/DeliveryController');

const main = async () => {
  const { baseCost, noOfPackages } = await inquirer.prompt([
    { type: 'number', name: 'baseCost', message: 'Enter base delivery cost:' },
    { type: 'number', name: 'noOfPackages', message: 'Enter number of packages:' }
  ]);

  const packages = [];
  for (let i = 0; i < noOfPackages; i++) {
    const pkg = await inquirer.prompt([
      { type: 'input', name: 'pkgId', message: `Enter package ID for package ${i + 1}:` },
      { type: 'number', name: 'weight', message: 'Enter package weight (kg):' },
      { type: 'number', name: 'distance', message: 'Enter distance to destination (km):' },
      { type: 'input', name: 'offerCode', message: 'Enter offer code (if any):' }
    ]);
    packages.push(pkg);
  }

  const deliveryController = new DeliveryController();
  packages.forEach(pkg => {
    const result = deliveryController.calculateCost(baseCost, pkg);
    console.log(`Package ID: ${result.pkgId}, Discount: ${result.discount.toFixed(2)}, Total Cost: ${result.totalCost.toFixed(2)}`);
  });
};

main();
