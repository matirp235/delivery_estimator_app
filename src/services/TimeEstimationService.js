//Service for calculating delivery time.
class TimeEstimationService {
    constructor(noOfVehicles, maxSpeed, maxCarriableWeight) {
      this.noOfVehicles = noOfVehicles;
      this.maxSpeed = maxSpeed;
      this.maxCarriableWeight = maxCarriableWeight;
    }
  
    calculateDeliveryTime(packages, pkgId) {
      const sortedPackages = packages.sort((a, b) => {
        if (a.weight === b.weight) {
          return a.distance - b.distance;
        }
        return b.weight - a.weight;
      });
  
      let time = 0;
      let remainingPackages = [...sortedPackages];
      const vehicleCapacity = this.maxCarriableWeight;
  
      while (remainingPackages.length > 0) {
        let currentLoad = 0;
        let currentPackages = [];
  
        for (const pkg of remainingPackages) {
          if (currentLoad + pkg.weight <= vehicleCapacity) {
            currentLoad += pkg.weight;
            currentPackages.push(pkg);
          }
        }
  
        remainingPackages = remainingPackages.filter(pkg => !currentPackages.includes(pkg));
  
        if (currentPackages.some(pkg => pkg.pkgId === pkgId)) {
          const distance = currentPackages.find(pkg => pkg.pkgId === pkgId).distance;
          time += (distance / this.maxSpeed) * 2;
          break;
        } else {
          const distance = Math.max(...currentPackages.map(pkg => pkg.distance));
          time += (distance / this.maxSpeed) * 2;
        }
      }
  
      return time;
    }
  }
  
  module.exports = TimeEstimationService;
  