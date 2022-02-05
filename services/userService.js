const User = require("../schema/user");

exports.storeTokenInDb = async (userId, subscription, onSuccess, onError) => {
  User.findByIdAndUpdate(
    userId,
    {
      subscriptionToken: subscription,
    },
    (err, res) => {
      if (err) {
        onError(err);
        console.log("storeTokenInDb error", err);
      } else {
        onSuccess(res);
        console.log("storeTokenInDb res", res);
      }
    }
  );
};

exports.getAll = async () => {
  return await User.find();
};
