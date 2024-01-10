const Surrevey = require("../Model/Surrevey.js");
const Form = require("../Model/Form.js");

class SurreveyController {
  async findAll(req, res) {
    try {
      let surrevey = await Form.find({});
      res.send({ status: true, data: surrevey });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async create(req, res) {
    try {
      let surrevey = new Form(req.body);
      await surrevey.save();
      res.send({ status: true, data: surrevey });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async delete(req, res) {
    try {
      let surrevey = await Form.findByIdAndDelete(req.params.id);
      if (!surrevey) {
        return res.status(404).send({ message: "Surrevey not found" });
      }
      res.send({ message: "Surrevey deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const updatedSurrevey = await Form.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedSurrevey);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new SurreveyController();
