const request = require('request');

class NotificationController {
    // get all 
    getAll(req, res) {
        let options = {
            'method': 'GET',
            // 'url': 'https://onesignal.com/api/v1/notifications?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=20&offset=' + req.body.page*20,
            'url': 'https://onesignal.com/api/v1/notifications?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&offset=' + req.body.page*20,
            'headers': {
                'Authorization': 'Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2',
                'accept': 'text/plain'
            },
        };
        request(options, function (error, response) {
            if (error) {
                res.send({ "status": false, "data": error });
            }
            else {
                let body = JSON.parse(response.body);
                let notifications = [];
                let time = new Date();
                for (let notification of body.notifications) {
                    let send_after = new Date(notification.send_after * 1000);
                    let month = (time.getFullYear() - send_after.getFullYear()) * 12 + time.getMonth() - send_after.getMonth();
                    notifications.push({ id: notification.id, contents: notification.contents, successful: notification.successful, send_after: notification.send_after, converted: notification.converted, date: month, canceled: notification.canceled });
                }
                res.send({ "status": false, "data": { notifications, "total_count": body.total_count } });
            }
        })
    }

    create(req, res) {
        req.body.app_id = "32fccb23-feb5-4663-87ab-c2ada6618795";
        const options = {
            'method': 'POST',
            'url': 'https://onesignal.com/api/v1/notifications',
            'headers': {
                'accept': 'application/json',
                'Authorization': 'Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2',
                'content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        };   
        request(options, function (error, response) {
            if (error) {
                console.log(error);
                res.send({ "status": false, "data": error });
            }
            else {
                
                let body = JSON.parse(response.body);
                if(body.errors!= null) res.send({ "status": true, "data": body });
                else res.send({ "status": false, "data": body.errors });
            }
        })
        
    }

    cancel(req, res) {
        const options = {
            'method': 'DELETE',
            'url': 'https://onesignal.com/api/v1/notifications/'+req.body.id+'?app_id=32fccb23-feb5-4663-87ab-c2ada6618795',
            'headers': {
                'accept': 'application/json',
                'Authorization': 'Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2',
            }
        };
        request(options, function (error, response) {
            if (error) {
                res.send({ "status": false, "data": error });
            }
            else {
                let body = JSON.parse(response.body);
                res.send({ "status": true, "data": response });
            }
        })
    }
    
}
module.exports = new NotificationController;
