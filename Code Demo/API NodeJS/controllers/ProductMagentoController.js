const request = require('request');
const Api = require("../Model/Api.js");
class ViewProductMagentoController {
   async get_all_product(req, res, next){
      let api = await Api.findOne({ status: 1 });
      let options = {
         'method': 'GET',
         'url': api.url_website + '/rest/V1/products/?searchCriteria=[all]',
         'headers': {
             'Authorization': 'Bearer '+ api.api_key,
             'Content-Type':'application/json'
         },
     };
     request(options, function (error, response) {
         if (error) {
             res.send({ "status": false, "data": error });
         }
         let body = JSON.parse(response.body);
         let products = [];
         for (let product of body.items) {
          products.push({ id: product.id, thumbnail: 'link image',qty: 'qty', sku: product.sku,visibility:product.visibility,attribute_set_id:product.attribute_set_id,type_id: product.type_id ,name: product.name, price: product.price, created_at: product.created_at, status: product.status });
         }
         // console.log(products);
         res.send({ "status": true, "data": { "product": products} });
     })
          
   }

   async delete_product(req, res){
      let api = await Api.findOne({ status: 1 });
      console.log(req.body.sku);
      let options = {
         'method': 'DELETE',
         'url': api.url_website +'/rest/V1/products/'+req.body.sku,
         'headers': {
             'Authorization': 'Bearer '+api.api_key,
             'Content-Type':'application/json',
             'Cookie': 'PHPSESSID=m35iv1dr59ilggj06vjukul5n4'
         },
     };
     request(options, function (error, response) {
         if (error) {
            res.send({ "status": false, "data": error });
         }
         else {
            let body = JSON.parse(response.body);
            //console.log(body);
            if(body.message == undefined) res.send({ "status": true, "data": body });
            else res.send({ "status": false, "data": body.message });
         }
      })
   }
   
   async create_product(req, res){
      let api = await Api.findOne({ status: 1 });
      let options = {
         'method': 'POST',
         'url': api.url_website +'/rest/V1/products',
         'headers': {
             'Authorization': 'Bearer '+api.api_key,
             'Content-Type':'application/json',
             'Cookie': 'PHPSESSID=m35iv1dr59ilggj06vjukul5n4'
         },
         body: JSON.stringify(req.body)
     };
     //console.log(options);
     request(options, function (error, response) {
         if (error) {
            res.send({ "status": false, "data": error });
         }
         else {
            let body = JSON.parse(response.body);
            if(body.message == undefined) res.send({ "status": true, "data": body });
            else res.send({ "status": false, "data": body.message });
         }
      })
   }

   async get_all_order(req, res, next){
      let api = await Api.findOne({ status: 1 });
      let options = {
         'method': 'GET',
         'url': api.url_website + '/rest/V1/orders/?searchCriteria=[all]',
         'headers': {
             'Authorization': 'Bearer '+ api.api_key,
             'Content-Type':'application/json'
         },
     };
     request(options, function (error, response) {
         if (error) {
             res.send({ "status": false, "data": error });
         }
         let body = JSON.parse(response.body);
         let orders = [];
         // console.log(body);
         for (let order of body.items) {
            for (let order2 of order.items){
               orders.push({ 
                  increment_id: order.increment_id, base_subtotal: order.base_subtotal,
                  sku: order2.sku, created_at: order2.created_at,name: order2.name,price: order2.price,qty_ordered: order2.qty_ordered, quote_item_id: order2.quote_item_id,customer_lastname: order.customer_lastname,customer_email: order.customer_email, customer_firstname: order.customer_firstname,shipping_description: order.shipping_description
               });
               // console.log(order2.sku);
            }
            
         //  products.push({ increment_id: order.increment_id, subtotal: 'link image',qty: 'qty', sku: order.sku,visibility:order.visibility,attribute_set_id:order.attribute_set_id,type_id: order.type_id ,name: order.name, price: order.price, created_at: order.created_at, status: order.status });
         }
         // console.log(products);
         res.send({ "status": true, "data": { "orders": orders} });
     })
          
   }

   async get_all_category(req, res, next){
      let api = await Api.findOne({ status: 1 });
      let options = {
         'method': 'GET',
         'url': api.url_website + '/rest/V1/categories/?searchCriteria=[all]',
         'headers': {
             'Authorization': 'Bearer '+ api.api_key,
             'Content-Type':'application/json'
         },
     };
     request(options, function (error, response) {
         if (error) {
             res.send({ "status": false, "data": error });
         }
         let data = JSON.parse(response.body);
         // let body = response.body;
         // console.log(body);
         let categories = [data];
         var userData = JSON.stringify(response.body);
         let categories2 = [];
         //    for (let i = 0; i < categories.data.length; i++) {
         //       console.log(parsed.data[i].survey_id);
         //   }
         // for (let order of categories) {
            // categories.push({order:order.id})
            // console.log(order["id"]);
            // categories2.push({  
            //    id:order.id,
            // })
            // console.log(categorie);
            // for (let order2 of order.items){
            //    categories.push({ 
            //       increment_id: order.increment_id, base_subtotal: order.base_subtotal,
            //       sku: order2.sku, created_at: order2.created_at,name: order2.name,price: order2.price,qty_ordered: order2.qty_ordered, quote_item_id: order2.quote_item_id,customer_lastname: order.customer_lastname,customer_email: order.customer_email, customer_firstname: order.customer_firstname,shipping_description: order.shipping_description
            //    });
            //    // console.log(order2.sku);
            // }
            
         //  products.push({ increment_id: order.increment_id, subtotal: 'link image',qty: 'qty', sku: order.sku,visibility:order.visibility,attribute_set_id:order.attribute_set_id,type_id: order.type_id ,name: order.name, price: order.price, created_at: order.created_at, status: order.status });
         // }
         // console.log(products);
         res.send({ "status": true, "data": { "categories": categories} });
     })
          
   }

}

module.exports = new ViewProductMagentoController;