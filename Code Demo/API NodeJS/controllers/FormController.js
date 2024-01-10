const Form = require("../Model/Form.js");

class FormController {
  async findAllForm(req, res) {
    try {
      const forms = await Form.find({});
      res.send(forms);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createForm(req, res) {
    try {
      const { title, link, active } = req.body;
      const form = await Form.create({
        title,
        link,
        active,
      });
      res.status(201).send(form);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteForm(req, res) {
    try {
      const form = await Form.findByIdAndDelete(req.params._id);
      if (!form) {
        return res.status(404).send({ message: "Form not found" });
      }
      res.send({ message: "Form deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new FormController();
