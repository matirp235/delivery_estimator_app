//Entry point for the application
const inquirer = require('inquirer');
const DeliveryController = require('./src/controllers/DeliveryController');
const TimeEstimationController = require('./src/controllers/TimeEstimationController');

const main = async () => {
  const { baseCost, noOfPackages, noOfVehicles, maxSpeed, maxCarriableWeight } = await inquirer.prompt([
    { type: 'number', name: 'baseCost', message: 'base_delivery_cost :' },
    { type: 'number', name: 'noOfPackages', message: 'no_of_packges :' },
    { type: 'number', name: 'noOfVehicles', message: 'no_of_vehicles :' },
    { type: 'number', name: 'maxSpeed', message: 'max_speed :' },
    { type: 'number', name: 'maxCarriableWeight', message: 'max_carriable_weight :' }
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
  const timeEstimationController = new TimeEstimationController(noOfVehicles, maxSpeed, maxCarriableWeight);


  packages.forEach(pkg => {
    const costResult = deliveryController.calculateCost(baseCost, pkg);
    const timeResult = timeEstimationController.estimateTime(packages, pkg.pkgId);
    console.log(`pkg_id: ${costResult.pkgId}, discount: ${costResult.discount.toFixed(2)}, total_cost: ${costResult.totalCost.toFixed(2)}, estimated_delivery_time_in_hours: ${timeResult.toFixed(2)} hours`);
  });
};

main();
