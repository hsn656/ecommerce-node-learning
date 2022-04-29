const stripe = require("stripe")(process.env.STRIPE_KEY);
const util = require("util");

stripe.charges.create = util.promisify(stripe.charges.create);

const chargeOrder = async (req, res) => {
  const result = await stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd",
  });

  return result;
};

module.exports.paymentService = { chargeOrder };
