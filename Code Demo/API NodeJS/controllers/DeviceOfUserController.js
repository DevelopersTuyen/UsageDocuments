const request = require("request");

class DeviceOfUserController {
  // get all User
  get_user(req, res) {
    console.log('123');
    if (req.body.page < 0) res.send({ status: false, data: -1 });
    {
      let options = {
        method: "GET",
        // url:
          // "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=20&offset=" +
          // req.body.page * 20,
        url: "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795",
        headers: {
          Authorization:
            "Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2",
          accept: "text/plain",
        },
      };
      request(options, function (error, response) {
        if (error) {
          res.send({ status: false, data: error });
        }
        let body = JSON.parse(response.body);
        let players = [];
        for (let player of body.players) {
          // const createdAtDate1 = new Date(player.created_at *1000);
          // const createdAtDate2 = new Date('2022-10-12');
          // const jan1st2022 = new Date('2022-12-15');
          // const startDate = new Date('2022-10-12');
          // const endDate = new Date('2022-12-15');
          // const createdAtDate = new Date(player.created_at*1000);
  
          // console.log(createdAtDate);
          // if (createdAtDate >= startDate && createdAtDate <= endDate) {
            players.push({
              id: player.id,
              identifier: player.identifier,
              last_active: player.last_active,
              device_model: player.device_model,
              device_os: player.device_os,
              device_type: player.device_type,
              session_count: player.session_count,
              playtime: player.playtime,
              game_version: player.game_version,
              created_at: player.created_at,
              ip: player.ip,
              language: player.language,
            });
          // }
        }
        players.sort(
          (objA, objB) => Number(objB.last_active) - Number(objA.last_active),
        );
        res.send({
          status: true,
          data: { players: players, total_count: body.total_count },
        });
      });
    }
  }

  get_user_date(req, res) {
    
    if (req.body.page < 0) res.send({ status: false, data: -1 });
    {
      let options = {
        method: "GET",
        // url:
          // "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=20&offset=" +
          // req.body.page * 20,
        url: "https://onesignal.com/api/v1/players?app_id=32fccb23-feb5-4663-87ab-c2ada6618795",
        headers: {
          Authorization:
            "Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2",
          accept: "text/plain",
        },
      };
      request(options, function (error, response) {
        if (error) {
          res.send({ status: false, data: error });
        }
        let body = JSON.parse(response.body);
        let players = [];
        for (let player of body.players) {
          // const createdAtDate1 = new Date(player.created_at *1000);
          // const createdAtDate2 = new Date('2022-10-12');
          // const jan1st2022 = new Date('2022-12-15');
          const start = new Date(req.params.time_start);
          // console.log(start);
          start.setHours(0, 0, 0, 0);
          const end = new Date(req.params.time_stop);
          end.setHours(23, 59, 59, 999);
          // const startDate = new Date('2022-10-12');
          // const endDate = new Date('2022-12-15');
          if(req.params.columns == 1){
            const createdAtDate = new Date(player.created_at*1000);
            if (createdAtDate >= start && createdAtDate <= end) {
              players.push({
                id: player.id,
                identifier: player.identifier,
                last_active: player.last_active,
                device_model: player.device_model,
                device_os: player.device_os,
                device_type: player.device_type,
                session_count: player.session_count,
                playtime: player.playtime,
                game_version: player.game_version,
                created_at: player.created_at,
                ip: player.ip,
                language: player.language,
              });
            }
          }
          else{
            const createdAtDate = new Date(player.last_active*1000);
            if (createdAtDate >= start && createdAtDate <= end) {
              players.push({
                id: player.id,
                identifier: player.identifier,
                last_active: player.last_active,
                device_model: player.device_model,
                device_os: player.device_os,
                device_type: player.device_type,
                session_count: player.session_count,
                playtime: player.playtime,
                game_version: player.game_version,
                created_at: player.created_at,
                ip: player.ip,
                language: player.language,
              });
            }
          }
          
  
          // console.log(createdAtDate);
          
        }
        players.sort(
          (objA, objB) => Number(objB.last_active) - Number(objA.last_active),
        );
        res.send({
          status: true,
          data: { players: players, total_count: body.total_count },
        });
      });
    }
  }

  async chart(req, res) {
    let page = 0;
    let total_count = 0;
    let labels = [];
    let android = [];
    let ios = [];
    let time = new Date;
    for (let i = 0; i < 7; i++) {
      let t = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
      labels.push(t);
      android.push(0);
      ios.push(0);
      time.setDate(time.getDate() - 1);
    }

    while (true) {
      let body = JSON.parse(await getDevice(page));
      if (body != undefined) {
        for (let player of body.players) {
          for (let i = 0; i < body.players.length; i++) {
            // let time = new Date(player.created_at * 1000);
            //console.log(time);
            // let t = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
            // if (t == labels[i]) {
              if (player.device_type == 0) ios[i]++;
              else if (player.device_type == 1) android[i]++;
              break;
            // }
          }
        }
        page++;
        if (body.total_count < page * 300) break;
      }
    }
    var totalandroid = android[0];
    var totalios = ios[0];
    console.log(totalios)
    res.send({ status: true, data: { labels,totalandroid,totalios} });
  }

  delete(req, res) {
    if (req.body.page < 0) res.send({ status: false, data: -1 });
    {
      let options = {
        method: "DELETE",
        url:
          `https://onesignal.com/api/v1/players/${req.body.id}?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=20&offset=` +
          req.body.page * 20,
        headers: {
          Authorization:
            "Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2",
          accept: "text/plain",
        },
      };
      request(options, function (error, response) {
        if (error) {
          res.send({ status: false, data: error });
        }    
        res.send({
          status: true,
        });
      });
    }
  }
}

module.exports = new DeviceOfUserController();

async function getDevice(page) {
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