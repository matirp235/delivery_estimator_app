//Handles offer code validations and calculations.
const offers = require('../data/offers');

class OfferService {
  calculateDiscount(offerCode, deliveryCost, weight, distance) {
    const offer = offers[offerCode];
    if (!offer) return 0;

    const { discount, weightRange, distanceRange } = offer;
    if (weight >= weightRange.min && weight <= weightRange.max && distance >= distanceRange.min && distance <= distanceRange.max) {
      return deliveryCost * discount;
    }

    return 0;
  }
}

module.exports = OfferService;
