const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  // Thêm các trường metadata khác tùy ý
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;