const UpdateRouter = require("./update");
const DeviceOfUserRouter = require("./DeviceOfUser");
const AccountRouter = require("./Account");
const NotificationRouter = require("./Notification");
const CouponRouter = require("./Coupon");
const FormRouter = require("./Form");
const QRcodeRouter = require("./QRcode");
const MagentoRouter = require("./Magento");
const Surrevey = require("./Surrevey");
const Banner = require("./Banner");
const Api = require("./Api");
const Ip = require("./Ip");
const StoreImageShopify = require("./StoreImageShopify");
// const uploadRoutes = require('./routes/UploadRoutes');
function route(app) {
  app.use("/banner", Banner);
  app.use("/update", UpdateRouter);
  app.use("/device", DeviceOfUserRouter);
  app.use("/account", AccountRouter);
  app.use("/notification", NotificationRouter);
  app.use("/coupon", CouponRouter);
  app.use("/qrcode", QRcodeRouter);
  app.use("/form", FormRouter);
  app.use("/magento", MagentoRouter);
  app.use("/surrevey", Surrevey);
  app.use("/api", Api);
  app.use("/ip", Ip);
  app.use("/StoreImageShopify", StoreImageShopify);
  // app.use('/upload', uploadRoutes);
  
}

module.exports = route;
