const TimeEstimationService = require('../services/TimeEstimationService');

class TimeEstimationController {
  constructor(noOfVehicles, maxSpeed, maxCarriableWeight) {
    this.noOfVehicles = noOfVehicles;
    this.maxSpeed = maxSpeed;
    this.maxCarriableWeight = maxCarriableWeight;
  }

  estimateTime(packages, pkgId) {
    const timeEstimationService = new TimeEstimationService(this.noOfVehicles, this.maxSpeed, this.maxCarriableWeight);
    return timeEstimationService.calculateDeliveryTime(packages, pkgId);
  }
}

module.exports = TimeEstimationController;
