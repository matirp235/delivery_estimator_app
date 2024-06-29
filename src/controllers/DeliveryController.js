const OfferService = require('../services/OfferService');
const CostService = require('../services/CostService');

class DeliveryController {
  calculateCost(baseCost, pkg) {
    const offerService = new OfferService();
    const costService = new CostService();
    
    const deliveryCost = costService.calculateDeliveryCost(baseCost, pkg.weight, pkg.distance);
    const discount = offerService.calculateDiscount(pkg.offerCode, deliveryCost, pkg.weight, pkg.distance);
    const totalCost = deliveryCost - discount;
    
    return {
      pkgId: pkg.pkgId,
      discount,
      totalCost
    };
  }
}

module.exports = DeliveryController;
