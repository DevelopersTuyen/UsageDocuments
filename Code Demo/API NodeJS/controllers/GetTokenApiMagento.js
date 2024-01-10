const request = require('request');
class GetTokenApiMagento {

   get_token_api(req, res) {
      try {
         let options = {
            'method': 'POST',
            'url': req.body.url_website + '/rest/V1/integration/admin/token',
            'headers': {
               'Content-Type': 'application/json',
               'Cookie': 'PHPSESSID=8v1itms7hvarvk7bfc53d7emqk'
            },
            body: JSON.stringify({
               "username": req.body.user_name,
               "password": req.body.password
            })
         }
         request(options, function (error, response) {
            if (error) {
               res.send({ "status": false, "data": "Website url is not accessible" });
            }
            else {
                  try {
                  let body = JSON.parse(response.body);
                  let token = '';
                  for(let  i =1; i<body.length ; i++){
                     token += body[i];
                  }
                  if (body.message == null) res.send({ "status": true, "data": token});
                  else res.send({ "status": false, "data": body.message });
                  } catch (error) {
                     res.send({ "status": false, "data": "Website url is not accessible" });
                  }
            }
         })
      } catch (error) {
         if (error instanceof SyntaxError) {
            console.error('Invalid JSON:', error.message);
         } else {
            throw error;
         }
         res.send({ "status": false, "data": "Website url is not accessible" });
      }
   }

}

module.exports = new GetTokenApiMagento;