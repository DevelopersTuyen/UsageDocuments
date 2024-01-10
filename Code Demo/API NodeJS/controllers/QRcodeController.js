const QRcode = require("../Model/QRcode.js");

class QRcodeController {
  async findAll(req, res) {
    try {
      let qrcode = await QRcode.find({}).sort({ 'createdAt': -1});
      res.send({ status: true, data: qrcode });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async create(req, res) {
    try {
      let qrcode = new QRcode(req.body);
      await qrcode.save();
      res.send({ status: true, data: qrcode });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async updateClick(req, res) {
    try {
      let qrcode = await QRcode.findById(req.body.id);
      qrcode.click++;
      await qrcode.save();
      res.send({ status: true, data: qrcode });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }
  async updateClick2(req, res) {
    try {
      console.log(req.body.user);
      let qrcode = await QRcode.findOne({user: req.body.user});
      qrcode.click++;
      await qrcode.save();
      res.send({ status: true, data: qrcode });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async delete(req, res) {
    try {
      let qrcode = await QRcode.findByIdAndDelete(req.params.id);
      if (!qrcode) {
        return res.status(404).send({ message: "QRcode not found" });
      }
      res.send({ message: "QRcode deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // async chart(req, res) {
  //   try {
  //     let qrcode = await QRcode.find({}).sort({ 'created_at': -1}).limit(10);
  //     let labels = [];
  //     let data = [];
  //     for(let c of qrcode){
  //       labels.push(c.product_name);
  //       data.push(c.click);
  //     }
  //     res.send({ status: true, data: {labels,data } });
  //   } catch (error) {
  //     res.send({ status: false, data: error });
  //   }
  // }
  async chart(req, res) {
    try {
      let qrcode = await QRcode.find({}).sort({ 'created_at': -1});
      let labels = [];
      let datas = [];
      let clicks = [];
      var temp = [];
      var produce = [];
      for(var i=0;i<qrcode.length;i++){
        if(temp.indexOf(qrcode[i].product_name) == -1){
            temp.push(qrcode[i].product_name);
            var _data = {};
            _data.name = qrcode[i].product_name;
            _data.count = 1;
            _data.click = qrcode[i].click;
            produce.push(_data);
            
        }
        else{
          for(var j=0;j<produce.length;j++){
                 
              if(produce[j].name === qrcode[i].product_name){
                  var _x = parseInt(produce[j].count) + 1;
                  produce[j].count = _x;
                  var _y = parseInt(produce[j].click) + parseInt(qrcode[i].click);
                  produce[j].click = _y;
              }
          }
        }
       
      }
      let labels2 = [];
      let datas2= [];
      let click2= [];
      let color =["Lime","Yellow","Red","Navy","Purple"];
      let keyname =["","","","",""];
      for(let c of produce){
        // labels2.push(c.name.split(' ').slice(0, 2).join(' '));
        labels2.push(c.name);
        datas2.push(c.count);
        click2.push(c.click);
      }
      labels= labels2.slice(0,5);
      datas=datas2.slice(0,5);
      clicks=click2.slice(0,5);
      res.send(
        { 
        status: true,
         data: {labels,datas,color,keyname,clicks}
         }
      );
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async chart2(req, res) {
    try {
      let qrcode = await QRcode.find({}).sort({ 'created_at': -1});
      let labels = [];
      let datas = [];
      let clicks = [];
      var temp = [];
      var produce = [];
      // const startDate = new Date(req.query.startDate);
      // const endDate = new Date(req.query.endDate);  

      for(var i=0;i<qrcode.length;i++){
        if(temp.indexOf(qrcode[i].product_name) == -1){
            temp.push(qrcode[i].product_name);
            var _data = {};
            _data.name = qrcode[i].product_name;
            _data.count = 1;
            _data.click = qrcode[i].click;
            produce.push(_data);
            
        }
        else{
          for(var j=0;j<produce.length;j++){
                 
              if(produce[j].name === qrcode[i].product_name){
                  var _x = parseInt(produce[j].count) + 1;
                  produce[j].count = _x;
                  var _y = parseInt(produce[j].click) + parseInt(qrcode[i].click);
                  produce[j].click = _y;
              }
          }
        }
       
      }
      let labels2 = [];
      let datas2= [];
      let click2= [];
      let color =["Lime","Yellow","Red","Navy","Purple"];
      let keyname =["","","","",""];
      for(let c of produce){
        // labels2.push(c.name.split(' ').slice(0, 2).join(' '));
        labels2.push(c.name);
        datas2.push(c.count);
        click2.push(c.click);
      }
      labels= labels2;
      datas=datas2;
      clicks=click2;
      res.send(
        { 
        status: true,
         data: {labels,datas,color,keyname,clicks}
         }
      );
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async GetDataDate(req, res) {
    try {
      // console.log("2222")
      const start = new Date(req.params.time_start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(req.params.time_stop);
      end.setHours(23, 59, 59, 999);
      // console.log(end);

      let qrcode = await QRcode.find({
        createdAt:
        {
          $gte: start,
          $lt: end
        }
      });
      // console.log(qrcode)
      res.send({ status: true, data: qrcode });
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

  async chart3(req, res) {
    try {
      const start = new Date(req.params.time_start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(req.params.time_stop);
      end.setHours(23, 59, 59, 999);

      let qrcode = await QRcode.find({
        createdAt:
        {
          $gte: start,
          $lt: end
        }
      }).sort({ 'created_at': -1});
      
      let labels = [];
      let datas = [];
      let clicks = [];
      var temp = [];
      var produce = [];
      // const startDate = new Date(req.query.startDate);
      // const endDate = new Date(req.query.endDate);  

      for(var i=0;i<qrcode.length;i++){
        if(temp.indexOf(qrcode[i].product_name) == -1){
            temp.push(qrcode[i].product_name);
            var _data = {};
            _data.name = qrcode[i].product_name;
            _data.count = 1;
            _data.click = qrcode[i].click;
            produce.push(_data);
            
        }
        else{
          for(var j=0;j<produce.length;j++){
                 
              if(produce[j].name === qrcode[i].product_name){
                  var _x = parseInt(produce[j].count) + 1;
                  produce[j].count = _x;
                  var _y = parseInt(produce[j].click) + parseInt(qrcode[i].click);
                  produce[j].click = _y;
              }
          }
        }
       
      }
      let labels2 = [];
      let datas2= [];
      let click2= [];
      let color =["Lime","Yellow","Red","Navy","Purple"];
      let keyname =["","","","",""];
      for(let c of produce){
        // labels2.push(c.name.split(' ').slice(0, 2).join(' '));
        labels2.push(c.name);
        datas2.push(c.count);
        click2.push(c.click);
      }
      labels= labels2;
      datas=datas2;
      clicks=click2;
      res.send(
        { 
        status: true,
         data: {labels,datas,color,keyname,clicks}
         }
      );
    } catch (error) {
      res.send({ status: false, data: error });
    }
  }

}

module.exports = new QRcodeController();
