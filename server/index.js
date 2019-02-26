const AWS 		= require('aws-sdk'); 
const dotenv	= require('dotenv');
const fs 		= require('fs');
const path 		= require('path'); 
const athena 	= require("athena-client");
const promise	= require('promise');
const express	= require("express");
const app		= express();
const axios		= require('axios'); 
const mocker 	= require('mocker-data-generator').default
const baseUrl	= process.env.BASE_URI;
 
dotenv.config();
const port		= process.env.PORT || 4500;
const awsConfig	= {  
		region: process.env.REGION, 
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY
    };

AWS.config.update(awsConfig);
const s3 			= new AWS.S3();
const params 		= { Bucket: process.env.BUCKET, Key: 'sample/' };
const urlParams 	= { Bucket: process.env.BUCKET, Key: 'sample/', Expires: 10000 };
const clientConfig 	= { bucketUri: process.env.BUCKET_URI };
const client 		= athena.createClient(clientConfig, awsConfig);

/* client.execute('SELECT * FROM "tradedb"."tmx1108" limit 2')
			.toPromise()
			.then(function(data) {
				console.log(data.records);
				return data.records;
			})
			.catch(function(err) {
				console.error(err)
			}); */
			
let bucketName = process.env.BUCKET;
function emptyBucket(bucketName, callback){
	var params = {
					Bucket: bucketName,
					Prefix: 'sample'
				}
	s3.listObjects(params, function(err, data) {
		if (err) return callback(err);
		console.log("Removing Cache and Metadat file form S3 Bucket ", data);
		if (data.Contents.length == 0) callback(); 
		
		const deleteParams = {
			Bucket: bucketName,
			Delete: { Objects: [] }
		}; 

		data.Contents.forEach(function(content) {
			deleteParams.Delete.Objects.push({ Key: content.Key });
		});
		
		console.log("deleteParams ", params);

		s3.deleteObjects(deleteParams, function(err, data) {
		  if (err) return callback(err);
		  if(data.IsTruncated)emptyBucket(bucketName, callback);
		  else callback();
		});
	});
}


var user = {
	avatar: { 
		faker: 'image.avatar'
	},
	fullName: {
		faker: 'name.findName'
	}, 
    country: {
        faker: 'address.country'
    },
	_username: {
		faker: 'internet.userName'
	},
	password_: {
		faker: 'internet.password'
	},
	'email.address': {
		faker: 'internet.email'
	},
	phone_number: {
		faker: 'phone.phoneNumber'
	},
	address: {
		city: {
			faker: 'address.city'
		},
		state: {
			faker: 'address.state'
		},
		country: {
			faker: 'address.country'
		}
	},
	url: { faker: 'internet.url'},
	isMarried: { faker: 'random.boolean' },
	_id: { faker:  'random.uuid' },
	actions: { faker: 'random.boolean' } 
}  
  
             
  
app.get('/s3buckettrade', function(req, res){
	axios.get(process.env.BASE_URI)
		  .then(function (response) { 
			emptyBucket(bucketName, function(data){
				client.execute('SELECT * FROM "tradedb"."tmx1108" limit 100')
					.toPromise()
					.then(function(data) {
						console.log("Fetching data from AWS Glu ",data.records); 
						res.status(200).json(data.records);
					})
					.catch(function(err) {
						console.error(err)
					});
			});
		  })
		  .catch(function (error) {
			console.log(error);
			res.status(404).json({"error": error});
		  });
});


app.get('/trade/:numResults', function(req, res){
	if(+req.params.numResults <= 1500){
		mocker()
		.schema('user', user, +req.params.numResults)  
		.build() 
		.then(
			data => { 
				res.status(200).json(data.user); 
			},
			err => console.error(err)
		)
	}else{
		res.status(200).json({"message": "Should not more than 1500"});
	}
}); 


app.listen(port, ()=>{
	console.log("Server running on port ", port);
});