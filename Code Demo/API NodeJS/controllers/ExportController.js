const request = require("request");
const excelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const Coupon = require("../Model/Coupon.js");
const Scan = require("../Model/QRcode");
const date = require('date-and-time')
class ExportController {
  async exportUser(req, res, next) {
    let page = 0;
    let total_count = 0;
    const workbook = new excelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet("利用レポート"); // New Worksheet
    const path = "./files"; // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.autoFilter = {
      from: 'A1',
      to: 'G1',
    }
    worksheet.columns = [
      { header: "No.", key: "no", width: 5 },
      { header: "id", key: "id", width: 60 },
      // { header: "identifier", key: "identifier", width: 10 },
      // { header: "session_count", key: "session_count", width: 10 },
      
      // { header: "timezone", key: "timezone", width: 10 },
      // { header: "game_version", key: "game_version", width: 10 },
      { header: "デバイスOS", key: "device_os", width: 30 },
      { header: "言語", key: "language", width: 10 },
      // { header: "device_type", key: "device_type", width: 10 },
      // { header: "device_model", key: "device_model", width: 10 },
      // { header: "ad_id", key: "ad_id", width: 10 },
      // { header: "tags", key: "tags", width: 10 },
      { header: "ip", key: "ip", width: 60 },
      { header: "作成日時", key: "created_at", width: 10 },
      { header: "最終アクティブ", key: "last_active", width: 50 },
      // { header: "playtime", key: "playtime", width: 10 },
      // { header: "amount_spent", key: "amount_spent", width: 10 },
      
      // { header: "invalid_identifier", key: "invalid_identifier", width: 10 },
    ];

    while (true) {
      let body = JSON.parse(await getUser(page));
      if (body != undefined) {
        body.players.sort(
          (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
        );
        let i =0;
        for (let player of body.players) {
          // if()
          // last_active = console.log( new Date(player.last_active  * 1000));
          body.players.sort(
            (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
          );

          // worksheet.addRow(player);
          worksheet.addRow({
            no: i += 1,
            id: player.id,
            // identifier: player.identifier,
            // session_count: player.session_count,
           
            // timezone: date.format(new Date(player.timezone *1000),'mm:HH'),
            // game_version: player.game_version,
            device_os: player.device_model + "\n Version " + player.device_os,
            language: player.language,
            ip: player.ip,
            // device_type: player.device_type,
            // device_model: player.device_model,
            // ad_id: player.ad_id,
            // tags: player.tags,
            
            // playtime:  date.format(new Date(player.playtime *1000),'mm:HH'),
            // amount_spent: player.amount_spent,
            created_at: date.format(new Date(player.created_at *1000),'DD/MM/YYYY'),
            last_active: date.format(new Date(player.last_active *1000),'DD/MM/YYYY'),
            // invalid_identifier: player.invalid_identifier,
           
          });
         
        }

        
        page++;
        if (body.total_count < page * 300) break;
      }
     
    }
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    try {
      // fs.unlink("../files/users.xlsx", function (err, data) {
      //   //console.log('Delete file successfully');
      // });
      var filename=  `利用レポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
            fs.unlink("../files/"+filename, function (err, data) {
            console.log('Delete file successfully');
            });
        });
    } catch (err) {
      res.send({
        status: false,
        message: "Something went wrong",
      });
    }
  }

  async exportUser2(req, res, next) {
    let page = 0;
    let total_count = 0;
    const workbook = new excelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet("利用レポート"); // New Worksheet
    const path = "./files"; // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.autoFilter = {
      from: 'A1',
      to: 'G1',
    }
    worksheet.columns = [
      { header: "No.", key: "no", width: 5 },
      { header: "id", key: "id", width: 60 },
      // { header: "identifier", key: "identifier", width: 10 },
      // { header: "session_count", key: "session_count", width: 10 },
      
      // { header: "timezone", key: "timezone", width: 10 },
      // { header: "game_version", key: "game_version", width: 10 },
      { header: "デバイスOS", key: "device_os", width: 30 },
      { header: "言語", key: "language", width: 10 },
      // { header: "device_type", key: "device_type", width: 10 },
      // { header: "device_model", key: "device_model", width: 10 },
      // { header: "ad_id", key: "ad_id", width: 10 },
      // { header: "tags", key: "tags", width: 10 },
      { header: "ip", key: "ip", width: 60 },
      { header: "作成日時", key: "created_at", width: 10 },
      { header: "最終アクティブ", key: "last_active", width: 50 },
      // { header: "playtime", key: "playtime", width: 10 },
      // { header: "amount_spent", key: "amount_spent", width: 10 },
      
      // { header: "invalid_identifier", key: "invalid_identifier", width: 10 },
    ];

    while (true) {
      let body = JSON.parse(await getUser2(page));
      if (body != undefined) {
        body.players.sort(
          (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
        );
        let i =0;
        for (let player of body.players) {
          const start = new Date(req.params.time_start);
          // console.log(start);
          start.setHours(0, 0, 0, 0);
          const end = new Date(req.params.time_stop);
          end.setHours(23, 59, 59, 999);
          

          if(req.params.columns == 1){
            const createdAtDate = new Date(player.created_at*1000);
            if (createdAtDate >= start && createdAtDate <= end) 
            {
              body.players.sort(
                (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
              );
    
              // worksheet.addRow(player);
              worksheet.addRow({
                no: i += 1,
                id: player.id,
                // identifier: player.identifier,
                // session_count: player.session_count,
               
                // timezone: date.format(new Date(player.timezone *1000),'mm:HH'),
                // game_version: player.game_version,
                device_os: player.device_model + "\n Version " + player.device_os,
                language: player.language,
                ip: player.ip,
                // device_type: player.device_type,
                // device_model: player.device_model,
                // ad_id: player.ad_id,
                // tags: player.tags,
                
                // playtime:  date.format(new Date(player.playtime *1000),'mm:HH'),
                // amount_spent: player.amount_spent,
                created_at: date.format(new Date(player.created_at *1000),'DD/MM/YYYY'),
                last_active: date.format(new Date(player.last_active *1000),'DD/MM/YYYY'),
                // invalid_identifier: player.invalid_identifier,
               
              });
            }
          }
          else{
            const createdAtDate = new Date(player.last_active*1000);
            if (createdAtDate >= start && createdAtDate <= end) 
            {
              body.players.sort(
                (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
              );
    
              // worksheet.addRow(player);
              worksheet.addRow({
                no: i += 1,
                id: player.id,
                // identifier: player.identifier,
                // session_count: player.session_count,
               
                // timezone: date.format(new Date(player.timezone *1000),'mm:HH'),
                // game_version: player.game_version,
                device_os: player.device_model + "\n Version " + player.device_os,
                language: player.language,
                ip: player.ip,
                // device_type: player.device_type,
                // device_model: player.device_model,
                // ad_id: player.ad_id,
                // tags: player.tags,
                
                // playtime:  date.format(new Date(player.playtime *1000),'mm:HH'),
                // amount_spent: player.amount_spent,
                created_at: date.format(new Date(player.created_at *1000),'DD/MM/YYYY'),
                last_active: date.format(new Date(player.last_active *1000),'DD/MM/YYYY'),
                // invalid_identifier: player.invalid_identifier,
               
              });
            }
          }
          // if()
          // last_active = console.log( new Date(player.last_active  * 1000));
         
         
        }

        
        page++;
        if (body.total_count < page * 300) break;
      }
     
    }
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    try {
      // fs.unlink("../files/users.xlsx", function (err, data) {
      //   //console.log('Delete file successfully');
      // });
      var filename=  `利用レポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
            fs.unlink("../files/"+filename, function (err, data) {
            console.log('Delete file successfully');
            });
        });
    } catch (err) {
      res.send({
        status: false,
        message: "Something went wrong",
      });
    }
  }

  async exportDevice(req, res, next) {
    let page = 0;
    let total_count = 0;
    const workbook = new excelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet("商品レポート"); // New Worksheet
    const path = "./files"; // Path to download excel
    // Column for data in excel. key must match data key
     worksheet.autoFilter = {
      from: 'A1',
      to: 'G1',
    }
    worksheet.columns = [
      { header: "No.", key: "no", width: 5 },
      { header: "id", key: "id", width: 60 },
      { header: "game_version", key: "game_version", width: 10 },
      { header: "device_os", key: "device_os", width: 10 },
      { header: "device_type", key: "device_type", width: 10 },
      { header: "device_model", key: "device_model", width: 10 },
      { header: "created_at", key: "created_at", width: 10 },
    ];

    while (true) {
      let body = JSON.parse(await getUser(page));
      if (body != undefined) {
        body.players.sort(
          (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
        );
        let i =0;
        for (let player of body.players) {
          body.players.sort(
            (objA, objB) =>   Number(objB.last_active) - Number(objA.last_active),
          );
          // worksheet.addRow(player);
          worksheet.addRow({
            no: i += 1,
            id: player.id,
            game_version: player.game_version,
            device_os: player.device_os,
            device_type: player.device_type,
            device_model: player.device_model,
            created_at: date.format(new Date(player.created_at *1000),'DD/MM/YYYY')
          });
        }
        page++;
        if (body.total_count < page * 300) break;
      }
    }
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    try {
     
      var filename=  `商品レポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
    } catch (err) {
      res.send({
        status: false,
        message: "Something went wrong",
      });
    }
  }

  async exportCoupon(req, res, next) {
    try {
      let coupon = await Coupon.find({}).sort({ 'created_at': -1});
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("クーポンレポート"); // New Worksheet
      const path = "./files"; // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.autoFilter = {
        from: 'A1',
        to: 'H1',
      }
      worksheet.columns = [
        { header: "id", key: "id", width: 10 },
        { header: "クーポンの有効期限", key: "coupon_expiry", width: 10 },
        { header: "クーポンタイトル", key: "coupon_title", width: 10 },
        { header: "クーポン詳細", key: "coupon_detail", width: 10 },
        { header: "クーポンバナー (URL)", key: "coupon_banner", width: 10 },
        { header: "クーポンコード", key: "coupon_code", width: 10 },
        { header: "クリック回数 ", key: "click", width: 10 },
      ];
      for (let c of coupon) {
        worksheet.addRow(c);
      }
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      var filename=  `クーポンレポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async exportScan(req, res, next) {
    try {
      let scan = await Scan.find({}).sort({ 'createdAt': 1});
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("スキャン履歴"); // New Worksheet
      const path = "./files"; // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.autoFilter = {
        from: 'A1',
        to: 'H1',
      }
      worksheet.columns = [
        { header: "No.", key: "no", width: 5 },
        { header: "id", key: "id", width: 10 },
        { header: "商品名", key: "product_name", width: 10 },
        { header: "商品画像", key: "product_image", width: 10 },
        { header: "url", key: "url", width: 10 },
        { header: "日付時刻", key: "date_time", width: 10 },
        { header: "User", key: "user", width: 10 },
        { header: "クリック回数 \n（スキャン履歴から再確認）", key: "click",height:20, width: 60 },
      ];
      let i = 0;
      for (let player of scan ) {
        
        worksheet.addRow({
          no: i += 1,
          id: player.id,
          product_name: player.product_name,
          product_image: player.product_image,
          url: player.url,
          date_time: player.date_time,
          user: player.user,
          click: player.click
        });
      }``
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      var filename=  `スキャン履歴`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async exportScan2(req, res, next) {
    try {
      // let scan = await Scan.find({}).sort({ 'createdAt': 1});
      const start = new Date(req.params.time_start);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.time_stop);
        end.setHours(23, 59, 59, 999);
  
        let scan = await Scan.find({
          createdAt:
          {
            $gte: start,
            $lt: end
          }
        }).sort({ 'created_at': 1});
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("スキャン履歴"); // New Worksheet
      const path = "./files"; // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.autoFilter = {
        from: 'A1',
        to: 'H1',
      }
      worksheet.columns = [
        { header: "No.", key: "no", width: 5 },
        { header: "id", key: "id", width: 10 },
        { header: "商品名", key: "product_name", width: 10 },
        { header: "商品画像", key: "product_image", width: 10 },
        { header: "url", key: "url", width: 10 },
        { header: "日付時刻", key: "date_time", width: 10 },
        { header: "User", key: "user", width: 10 },
        { header: "クリック回数 \n（スキャン履歴から再確認）", key: "click",height:20, width: 60 },
      ];
      let i = 0;
      for (let player of scan ) {
        
        worksheet.addRow({
          no: i += 1,
          id: player.id,
          product_name: player.product_name,
          product_image: player.product_image,
          url: player.url,
          date_time: player.date_time,
          user: player.user,
          click: player.click
        });
      }``
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      var filename=  `スキャン履歴`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async TotalScanProduct(req, res, next){
   
    try {

     
      // if (req.params.time_start ==''){
       let qrcode = await Scan.find({}).sort({ 'createdAt': 1});
      // }
      // else{
      //   const start = new Date(req.params.time_start);
      //   start.setHours(0, 0, 0, 0);
      //   const end = new Date(req.params.time_stop);
      //   end.setHours(23, 59, 59, 999);
  
      //   let qrcode = await Scan.find({
      //     createdAt:
      //     {
      //       $gte: start,
      //       $lt: end
      //     }
      //   }).sort({ 'created_at': -1});
      // }
      
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("スキャン履歴"); // New Worksheet
      const path = "./files"; // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.autoFilter = {
        from: 'A1',
        to: 'D1',
      }
      worksheet.columns = [
        { header: "No.", key: "no", width: 5 },
        { header: "商品名", key: "name", width: 60 },
        { header: "総スキャン回数", key: "count", width: 20 },
        { header: "総クリック回数 （スキャン履歴から再確認）", key: "click", width: 30 },
      ];

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
                  // console.log("t" + qrcode[i].click)
                  // console.log("v" + produce[j].click)
                  var _x = parseInt(produce[j].count) + 1;
                  produce[j].count = _x;
                  var _y = parseInt(produce[j].click) + parseInt(qrcode[i].click);
                  produce[j].click = _y;
              }
          }
        }
       
      }
      // console.log(produce);

      let cou = 0;
      for (let player of produce ) {
        worksheet.addRow({
          no: cou += 1,
          name: player.name,
          count: player.count,
          click: player.click
        });
      }
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      var filename= `商品レポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
      // let labels2 = [];
      // let datas2= [];
      // for(let c of produce){
      //   labels2.push(c.name);
      //   datas2.push(c.count);
      // }

    } catch (error) {
      res.status(400).send({ message: error.message });
    }
    
  }
  async TotalScanProduct2(req, res, next){
   
    try {

     
      // if (req.params.time_start ==''){
      //  let qrcode = await Scan.find({}).sort({ 'createdAt': 1});
      // }
      // else{
        const start = new Date(req.params.time_start);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.time_stop);
        end.setHours(23, 59, 59, 999);
  
        let qrcode = await Scan.find({
          createdAt:
          {
            $gte: start,
            $lt: end
          }
        }).sort({ 'created_at': -1});
      // }
      
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("スキャン履歴"); // New Worksheet
      const path = "./files"; // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.autoFilter = {
        from: 'A1',
        to: 'D1',
      }
      worksheet.columns = [
        { header: "No.", key: "no", width: 5 },
        { header: "商品名", key: "name", width: 60 },
        { header: "総スキャン回数", key: "count", width: 20 },
        { header: "総クリック回数 （スキャン履歴から再確認）", key: "click", width: 30 },
      ];

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
                  // console.log("t" + qrcode[i].click)
                  // console.log("v" + produce[j].click)
                  var _x = parseInt(produce[j].count) + 1;
                  produce[j].count = _x;
                  var _y = parseInt(produce[j].click) + parseInt(qrcode[i].click);
                  produce[j].click = _y;
              }
          }
        }
       
      }
      // console.log(produce);

      let cou = 0;
      for (let player of produce ) {
        worksheet.addRow({
          no: cou += 1,
          name: player.name,
          count: player.count,
          click: player.click
        });
      }
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      var filename= `商品レポート`+date.format(new Date(),'DD-MM-YYYY')+`.xlsx`;
      const data = await workbook.xlsx
        .writeFile(`${path}/`+filename)
        .then(() => {
          //console.log(data);
          res.send({
            status: true,
            message: "file successfully downloaded",
            path: `${path}/`+filename,
          });
          fs.unlink("../files/"+filename, function (err, data) {
            //console.log('Delete file successfully');
          });
        });
      // let labels2 = [];
      // let datas2= [];
      // for(let c of produce){
      //   labels2.push(c.name);
      //   datas2.push(c.count);
      // }

    } catch (error) {
      res.status(400).send({ message: error.message });
    }
    
  }
}



module.exports = new ExportController();

async function getUser(page) {
  let options = {
    method: "GET",
    url:
      "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=300&offset=" +
      page * 300,
    headers: {
      Authorization: "Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2",
      accept: "text/plain",
    },
  };
  return new Promise(function (resolve, reject) {

    
    request(options, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        
        resolve(body);
      } else {
        reject(error);
      }
    });

  });
}

async function getUser2(page) {
  let options = {
    method: "GET",
    url:
      "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=300&offset=" +
      page * 300,
    headers: {
      Authorization: "Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2",
      accept: "text/plain",
    },
  };
  return new Promise(function (resolve, reject) {

    
    request(options, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        
        resolve(body);
      } else {
        reject(error);
      }
    });

  });
}
