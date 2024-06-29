const inquirer = require('inquirer');
const DeliveryController = require('./src/controllers/DeliveryController');
const TimeEstimationController = require('./src/controllers/TimeEstimationController');
const Table = require('cli-table3');

const askCommonPackageDetails = async (noOfPackages) => {
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
  return packages;
};

const displayTable = (data, headers) => {
  const table = new Table({ head: headers });
  data.forEach(row => table.push(row));
  console.log(table.toString());
};

const main = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Select the function you want to perform:',
      choices: ['Delivery Cost Estimator', 'Delivery Time Estimator']
    }
  ]);

  if (choice === 'Delivery Cost Estimator') {
    const { baseCost, noOfPackages } = await inquirer.prompt([
      { type: 'number', name: 'baseCost', message: 'base_delivery_cost:' },
      { type: 'number', name: 'noOfPackages', message: 'no_of_packges:' }
    ]);

    const packages = await askCommonPackageDetails(noOfPackages);
    const deliveryController = new DeliveryController();
    const results = [];

    packages.forEach(pkg => {
      const result = deliveryController.calculateCost(baseCost, pkg);
      results.push([result.pkgId, result.discount.toFixed(2), result.totalCost.toFixed(2)]);
    });

    displayTable(results, ['pkg_id', 'discount', 'total_cost']);

  } else if (choice === 'Delivery Time Estimator') {
    const { baseCost, noOfPackages, noOfVehicles, maxSpeed, maxCarriableWeight } = await inquirer.prompt([
      { type: 'number', name: 'baseCost', message: 'base_delivery_cost:' },
      { type: 'number', name: 'noOfPackages', message: 'no_of_packge:' },
      { type: 'number', name: 'noOfVehicles', message: 'no_of_vehicles:' },
      { type: 'number', name: 'maxSpeed', message: 'max_speed:' },
      { type: 'number', name: 'maxCarriableWeight', message: 'max_carriable_weight:' }
    ]);

    if (noOfPackages <= 0) {
      console.log('Nothing to deliver.');
      return;
    }

    
    const packages = await askCommonPackageDetails(noOfPackages);
    const deliveryController = new DeliveryController();
    const timeEstimationController = new TimeEstimationController(noOfVehicles, maxSpeed, maxCarriableWeight);
    const results = [];

    packages.forEach(pkg => {
      const costResult = deliveryController.calculateCost(baseCost, pkg);
      const timeResult = timeEstimationController.estimateTime(packages, pkg.pkgId);
      results.push([costResult.pkgId, costResult.discount.toFixed(2), costResult.totalCost.toFixed(2), timeResult.toFixed(2)]);
    });

    displayTable(results, ['pkg_id', 'discount', 'total_cost', 'estimated_delivery_time_in_hours']);
  }
};

main();
