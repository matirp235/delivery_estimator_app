const inquirer = require('inquirer');
const DeliveryController = require('./src/controllers/DeliveryController');
const TimeEstimationController = require('./src/controllers/TimeEstimationController');

const main = async () => {
  const { baseCost, noOfPackages, noOfVehicles, maxSpeed, maxCarriableWeight } = await inquirer.prompt([
    { type: 'number', name: 'baseCost', message: 'Enter base delivery cost:' },
    { type: 'number', name: 'noOfPackages', message: 'Enter number of packages:' },
    { type: 'number', name: 'noOfVehicles', message: 'Enter number of vehicles:' },
    { type: 'number', name: 'maxSpeed', message: 'Enter max speed of vehicles (km/hr):' },
    { type: 'number', name: 'maxCarriableWeight', message: 'Enter max carriable weight per vehicle (kg):' }
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
  const timeEstimationController = new TimeEstimationController(noOfVehicles, maxSpeed, maxCarriableWeight);

  packages.forEach(pkg => {
    const costResult = deliveryController.calculateCost(baseCost, pkg);
    const timeResult = timeEstimationController.estimateTime(packages, pkg.pkgId);
    console.log(`Package ID: ${costResult.pkgId}, Discount: ${costResult.discount.toFixed(2)}, Total Cost: ${costResult.totalCost.toFixed(2)}, Estimated Delivery Time: ${timeResult.toFixed(2)} hours`);
  });
};

main();
