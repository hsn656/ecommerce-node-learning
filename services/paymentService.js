const stripe = require("stripe")(process.env.STRIPE_KEY);

const chargeOrder = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      return { stripeErr, stripeRes };
    }
  );
};

module.exports.paymentService = { chargeOrder };
