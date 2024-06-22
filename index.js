//Entry point for the application
const inquirer = require('inquirer');
const DeliveryController = require('./src/controllers/DeliveryController');

const main = async () => {
  const { baseCost, noOfPackages } = await inquirer.prompt([
    { type: 'number', name: 'baseCost', message: 'base_delivery_cost :' },
    { type: 'number', name: 'noOfPackages', message: 'no_of_packges :' }
  ]);

  const packages = [];
  for (let i = 0; i < noOfPackages; i++) {
    const pkg = await inquirer.prompt([
      { type: 'input', name: 'pkgId', message: `pkg_id${i + 1}:` },
      { type: 'number', name: 'weight', message: 'pkg_weight(kg):' },
      { type: 'number', name: 'distance', message: 'distance_in_km:' },
      { type: 'input', name: 'offerCode', message: 'offer_code (if any):' }
    ]);
    packages.push(pkg);
  }

  const deliveryController = new DeliveryController();
  packages.forEach(pkg => {
    const result = deliveryController.calculateCost(baseCost, pkg);
    console.log(`pkg_id: ${result.pkgId}, discount: ${result.discount.toFixed(2)}, total_cost: ${result.totalCost.toFixed(2)}`);
  });
};

main();
