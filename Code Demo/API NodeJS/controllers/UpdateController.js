const request = require('request');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const storeShopify = require("../Model/storeShopify.js");
//face 2 account 
const Mail = require("../Model/Mail.js");

var productsStatusUpdateHistory = [];
const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'phamvantuyengynd99@gmail.com',
        pass: 'qnqymbnxztfglsfv'
    }
});
class UpdateController {
// get all product 
productsstatusdraft(req, res) {
    let options = {
        'method': 'GET',
        'url': 'https://j-grab.myshopify.com/admin/api/2023-07/products.json?status=draft',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
    };
    request(options, function (error, response) {
        if (error) {
            res.send({ "status": false, "data": error });
        }
        else {
            let body = JSON.parse(response.body);
            res.send({ "status": true, "data": body.products });
            for (let product of body.products) {
                let i = 0;
                for (let productHistory of productsStatusUpdateHistory) {
                    if (product.id == productHistory.id) {
                        productsStatusUpdateHistory.splice(i, 1);
                        break;
                    }
                    i++;
                }
            }
        }
    })
}

productstatusupdatehistory(req, res) {
    res.send({ status: true, data: productsStatusUpdateHistory });
}

async updateproductsstatus(req, res) {
    let option = {
        'method': 'GET',
        'url': 'https://j-grab.myshopify.com/admin/api/2023-07/products/' + req.body.id + '/metafields.json',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
    };
    var body;
    console.log("123");
    await request(option, function (error, responses) {
        if (error) {
            console.log("1231");
            console.log(error);
            
            let time_active = new Date();
            let product = { id: req.body.id, time: null, time_active: time_active, title: req.body.title, handle: req.body.handle, email: null, emailed: false };
            productsStatusUpdateHistory.unshift(product);
            res.send(updateProductsStatus(req.body.id, "active"));
        }
        else {
            console.log("1234");
            body = JSON.parse(responses.body);
            for (let metafield of body.metafields) {
                if (metafield.key == 'email_user') {
                    let time_active = new Date();
                    let product = { id: req.body.id, time: null, time_active: time_active, title: req.body.title, handle: req.body.handle, email: metafield.value, emailed: false };
                    productsStatusUpdateHistory.unshift(product);
                    res.send(updateProductsStatus(req.body.id, "active"));
                    break;
                }
            }
        }
    });
}

turnonschedule (req, res) {
    for (let product of productsStatusUpdateHistory) {
        if (product.id == req.body.id) {
            product.time = req.body.time;
            break;
        }
    }
    res.send({ status: true, data: "ok" });
}

deleteproductstatusupdatehistory(req, res) {
    let i = 0;
    for (product of productsStatusUpdateHistory) {
        if (product.id == req.body.id) {
            productsStatusUpdateHistory.splice(i, 1);
            break;
        }
        i++;
    }
    res.send({ status: true, data: "ok" });
}
//active account face 2 
async findAllAccount(req, res) {
    try {
      let mail = await Mail.find({});
      res.send({ status: true, data: mail });
    } catch (error) {
      res.send({ status: false, data: error });
    }
}
async updateAccount(req, res) {
    try {
      const mail = await Mail.findById(req.params.id);
      if (mail == null) {
        return res.status(404).json({ message: "not founded banner" });
      }
      mail.active = req.body.active;
      const updatedMail = await mail.save();
      res.json(updatedMail);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
} 
async updatePasswordAccount(req, res) {
    try {
      const mail = await Mail.findById(req.params.id);
      if (mail == null) {
        return res.status(404).json({ message: "not founded banner" });
      }
      mail.password = req.body.password;
      const updatedMail = await mail.save();
      res.json(updatedMail);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}
async sendMailAccountCode(req, res) {
    const mail = await Mail.findById(req.params.id);
    if (mail.active  == "1" ){
    var mail2 = mail.mail;
    var subject2 = "【送付】J-grab mallメール認証コード \n";
    // var text2 = "Code :"+ mail.code ;
    var text2=
    mail.lastName + "様 \n"+

  " お世話になっております。\n"
  +
  "J-grab mallをご利用いただき、誠にありがとうございます。\n"
  + "\n"+
  " アカウントのセキュリティを強化するために、認証コードを発行いたします。以下に認証コードを記載しておりますので、ご確認いただき、登録画面内にあります「認証コード」にご入力いただき、お手続きを進めていただければと思います。\n"
  +"\n"+
  "認証コード: " +"[" +mail.code +  " ] "+ "\n" 
  +"\n"+
  "セキュリティのため、この認証コードはお客様のみにご案内いたします。第三者に知られないよう、十分ご注意ください。また、この認証コードはパスワードの再設定にも必要となりますので、大切に保管していただきますようお願い申し上げます。\n"
  +"\n"+
  "もし、ご自身が認証コードの要求をしていない場合や、不審な点がございましたら、直ちに弊社までお知らせください。\n"
  +"\n"+
  "お客様のアカウントのセキュリティを重視しておりますので、ご協力いただきますようお願い申し上げます。\n"
  +"\n"+
  "今後もより安全で快適なサービスを提供できるよう、努めてまいります。\n"
  +
  "何かご不明な点やご質問がございましたら、お気軽にお問い合わせください。\n"
  +
  "    --------------------------------------------------------------------------- \n"
  +
  "j-Grab Mall ヘルプデスク担当：斎藤直子、石崎良太郎、櫻井智実 \n"
  +
  "  Mail：helpdesk-jgrabmall@j-grab.co.jp \n"  
  +
  "j-Grab Mall：https://www.j-grab.com";
    sendMailCommon( mail2,subject2,text2);
    }
   
}  
async sendMailAccountPassword(req, res) {
    const mail = await Mail.findById(req.params.id);
     var mail2 = mail.mail;
    var subject2 = "【送付】J-grab mallログイン情報 \n";
    // var text2 = "Account :"+ mail.mail + "+ \n PassWord:" + mail.password ;
    var text2=
    mail.lastName + "様 \n"+
    "\n"+
  " お世話になっております。\n"
  +
  "J-grab mallをご利用いただき、誠にありがとうございます。\n"
  + 
  "事務局での確認が完了いたしましたので\n"
  +"\n"+
  "【メールアドレス】:"+ mail.mail +"\n" 
  +
  "【パスワード】:   " + mail.password + "\n" 
  +"\n"+
  "また、以下のURLからログインしていただけます。商品情報の登録をお願いいたします。：\n"
  +
  "https://jgmall-portal.j-grab.net/ \n"
  +"\n"+
  "これらの情報は大切に保管していただきますようお願い申し上げます。パスワードは定期。\n"
  +
  "的に変更することで、セキュリティの維持に役立つことをご留意ください。\n"
  +"\n"+
  "何かご不明な点やご質問がございましたら、お気軽にお問い合わせください。\n"
  +"\n"+
  "引き続きJ-grab mallをよろしくお願いいたします。\n"
  +
  "    --------------------------------------------------------------------------- \n"
  +
  "j-Grab Mall ヘルプデスク担当：斎藤直子、石崎良太郎、櫻井智実 \n"
  +
  "  Mail：helpdesk-jgrabmall@j-grab.co.jp \n"  
  +
  "j-Grab Mall：https://www.j-grab.com"
    sendMailCommon( mail2,subject2,text2);
}
createAccount(req, res){
    try {
        let mail = new Mail(req.body);
        // this.sendMailAccountPassword(req, res);
        mail.save();
        res.send({ status: true, data: mail });
      } catch (error) {
        res.send({ status: false, data: error });
      }
}
findOneAccount(req, res){
    // console.log("12"+req.params.mail);
    // try {
     Mail.find({ mail: req.params.mail }).then((data) => {
        if (data == "") {
          res.json("1")
        }
        else {
          res.json(data)
        }
    
        return {
          data: {
            'mail': data,
          }
        };
      })
    .catch(function (err) {
        console.error('productApi::createCart error: ', err);
    });
}
async deleteAccount(req ,res) {

    console.log(req.params.email);
    try {
        storeShopify
        
        let mail = await Mail.findByIdAndDelete(req.params.id);
        await storeShopify.findOneAndRemove(
        {
            email: {$gte:req.params.email} 
        });
        if (!mail) {
            
          return res.status(404).send({ message: "Mail not found" });
        }
        res.send({ message: "Mail deleted successfully" });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
}

module.exports = new UpdateController;

cron.schedule('* * * * *', () => {
    let time = new Date();
    let products = [];
    let i = 0;
    for (let product of productsStatusUpdateHistory) {
        if (product.time != null && product.email != null && product.emailed == false) {
            let t = product.time_active;
            t.setHours(t.getHours() + product.time);
            product.point = i;
            if (t <= time) products.push(product);
        }
        i++;
    }
    products.sort((a, b) => {
        let a_email = a.email.toLowerCase(),
            b_email = b.email.toLowerCase();

        if (a_email < b_email) {
            return -1;
        }
        if (a_email > b_email) {
            return 1;
        }
        return 0;
    });
    
    // var mainOptions = {
    //     from: 'J-Grab',
    //     to: null,
    //     bcc:'jgrabmall-product-registration@j-grab.co.jp',
    //     subject: 'Active Product',
    //     text: 'You recieved message from ',
    //     html: null
    // }

    // Cấu hình SendGrid với khóa API
    const API_KEY = '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';
    sgMail.setApiKey(API_KEY);
    
    // Tạo đối tượng email
    const mainOptions = {
        from: 'jgrabmall-product-registration@j-grab.co.jp',
        to: null,
        // bcc: null,
        subject: 'Active Product',
        text: 'You recieved message from ',
        html: null
    };

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        if (i == 0) {
            mainOptions.to = product.email;
            // mainOptions.bcc = product.email;
            mainOptions.html =
                "<p>You have got a new message</b>"
                + "<ul>"
                + "<li>Product title:" + product.title + "</li>"
                + "<li>Product handle:" + "https://j-grab.myshopify.com/products/" + product.handle + "</li>";
           
        // var mail2 = product.email;
        // var subject2 = "You have got a new message \n";
        // var text2 = "Product title: :"+product.title + "+ \n Product handle:"+"https://j-grab.myshopify.com/products/"  + product.handle ;
        // sendMailCommon( mail2,subject2,text2);
        }
        else if (product.email != products[i - 1].email) {
            mainOptions.to = product.email;
            // mainOptions.bcc = product.email;
            mainOptions.html =
                "<p>You have got a new message</p>"
                + "<ul>"
                + "<li>Product title:" + product.title + "</li>"
                + "<li>Product handle:" + "https://j-grab.myshopify.com/products/" + product.handle + "</li>";
            // var mail2 = product.email;
            // var subject2 = "You have got a new message \n";
            // var text2 = "Product title: :"+product.title + "+ \n Product handle:"+"https://j-grab.myshopify.com/products/"  + product.handle ;
            // sendMailCommon( mail2,subject2,text2);
        }
        else {
            mainOptions.html += "<li>Product title:" + product.title + "</li>"
                + "<li>Product handle:" + "https://j-grab.myshopify.com/products/" + product.handle + "</li>";
        }
        if (i == products.length - 1) {
            mainOptions.html += "</ul>";
            // transporter.sendMail(mainOptions, function (err, info) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         for (let j = i; j >= 0; j--) {
            //             if (products[j].email == product.email) {
            //                 console.log('Message sent: ' + products[j].id);
            //                 productsStatusUpdateHistory[products[j].point].emailed = true;
            //             }
            //             else break
            //         }
            //     }
            // });
            sgMail.send(mainOptions)
                .then(() => {
                    for (let j = i; j >= 0; j--) {
                        if (products[j].email == product.email) {
                            console.log('Message sent: ' + products[j].id);
                            productsStatusUpdateHistory[products[j].point].emailed = true;
                        }
                        else break
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            mainOptions.to = null;
            // mainOptions.bcc = null;
            mainOptions.html = null;
        }
        else if (product.email != products[i + 1].email) {
            mainOptions.html += "</ul>";
            sgMail.send(mainOptions)
                .then(() => {
                    for (let j = i; j >= 0; j--) {
                        if (products[j].email == product.email) {
                            console.log('Message sent: ' + products[j].id);
                            productsStatusUpdateHistory[products[j].point].emailed = true;
                        }
                        else break
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            // transporter.sendMail(mainOptions, function (err, info) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         for (let j = i; j >= 0; j--) {
            //             if (products[j].email == product.email) {
            //                 console.log('Message sent: ' + products[j].id);
            //                 productsStatusUpdateHistory[products[j].point].emailed = true;
            //             }
            //             else break
            //         }
            //     }
            // });
            mainOptions.to = null;
            // mainOptions.bcc = null;
            mainOptions.html = null;
        }
    }
});


async function updateProductsStatus(id, status) {
    let product = {
        "id": id,
        "status": status
    }
    let option = {
        'method': 'PUT',
        'url': 'https://j-grab.myshopify.com/admin/api/2023-07/products/' + id + '.json',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
        body: JSON.stringify({ "product": product })
    };
    var res = { status: true, data: "ok" };
    await request(option, function (error, _responses) {
        if (error) {
            res.status = false;
            res.data = error;
        }
    });
    return res;
}
 // var mail = req.body.mail;
 //  var subject = "Account";
 //  var text = "Account :"+ req.body.mail + "+ \n PassWord:" + req.body.password ;
 //  sendMailCommon( mail,subject,text);

async function sendMailCommon(mail,subject,text){
  // Đặt khóa API SendGrid của bạn (SMTP)
const SMTP_API_KEY = 'SG.C-23p_8-Quy1OTn5yLe_A.NBH8-jNoeho2dVbVwaaCLGf0xHEV8v8erXMjk38EOso';

// Cấu hình SendGrid với khóa API
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

// Tạo đối tượng email
const msg = {
  to: mail,
  from: 'jgrabmall-product-registration@j-grab.co.jp',
  subject: subject,
  text: text,
};

// Gửi email
sgMail.send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
}

