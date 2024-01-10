const Image = require('../Model/ImageModel');

const uploadImage = async (req, res) => {
  try {
    const { filename, path } = req.file;

    const newImage = new Image({
      filename,
      filepath: path,
      // Thêm các trường metadata khác tùy ý
    });

    const savedImage = await newImage.save();
    res.send(savedImage._id); // Phản hồi với ID của ảnh đã lưu
  } catch (error) {
    console.log(error);
    res.status(500).send('Error saving the image');
  }
};

module.exports = { uploadImage };