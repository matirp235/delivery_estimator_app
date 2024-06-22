//Calculates the cost of delivery.
class CostService {
    calculateDeliveryCost(baseCost, weight, distance) {
      return baseCost + (weight * 10) + (distance * 5);
    }
  }
  
  module.exports = CostService;
  