class TimeEstimationService {
  constructor(noOfVehicles, maxSpeed, maxCarriableWeight) {
    this.noOfVehicles = noOfVehicles;
    this.maxSpeed = maxSpeed;
    this.maxCarriableWeight = maxCarriableWeight;
    this.vehicles = Array(noOfVehicles).fill(0); // Initialize vehicle availability times
  }

  calculateDeliveryTime(packages, targetPkgId) {
    // Sort packages by weight (descending). If weights are the same, sort by distance (ascending).
    packages.sort((a, b) => {
      if (a.weight === b.weight) {
        return a.distance - b.distance;
      }
      return b.weight - a.weight;
    });

    let remainingPackages = [...packages];
    let currentTime = 0;

    while (remainingPackages.length > 0) {
      const availableVehicleIndex = this.vehicles.indexOf(Math.min(...this.vehicles));
      currentTime = this.vehicles[availableVehicleIndex];

      let currentLoad = 0;
      const currentTripPackages = [];

      for (let i = 0; i < remainingPackages.length; i++) {
        if (currentLoad + remainingPackages[i].weight <= this.maxCarriableWeight) {
          currentLoad += remainingPackages[i].weight;
          currentTripPackages.push(remainingPackages[i]);
        }
      }

      // Filter out the packages that have been assigned to the current trip
      remainingPackages = remainingPackages.filter(pkg =>
        !currentTripPackages.some(tripPkg => tripPkg.pkgId === pkg.pkgId)
      );

      const maxDistance = Math.max(...currentTripPackages.map(pkg => pkg.distance));
      const tripTime = (maxDistance / this.maxSpeed) * 2; // Round trip time

      this.vehicles[availableVehicleIndex] += tripTime;

      // Check if the target package is in the current trip
      const targetPackage = currentTripPackages.find(pkg => pkg.pkgId === targetPkgId);
      if (targetPackage) {
        return currentTime + (targetPackage.distance / this.maxSpeed);
      }
    }

    return 0; // Return 0 if the package was not found
  }
}

module.exports = TimeEstimationService;
