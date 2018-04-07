var fs = require("fs");
var base64ToImage = require('base64-to-image');
var AWS = require('aws-sdk');
AWS.config.update({ 

    accessKeyId: 'AKIAJXBLKRCTZOUPJ4FQ', 
    secretAccessKey: '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',

    region: 'us-east-1' 
});
var s3 = new AWS.S3();
var s3Bucket = new AWS.S3( { params: {Bucket: 's3.csye6225-spring2018-jiaxi.me'} } )

class ImageController {

    async imageStore(ctx) {
        var {
            image,
            user,
        } = ctx.request.body
        image = image.split(' ').join('+');

        var path ='./server/';
        var optionalObj = {'fileName': 'imagetest', 'type':'png'};
                     
        var imageInfo = base64ToImage(image,path,optionalObj);

        fs.readFile('./server/imagetest.png', function (err, data) {
            if (err) {
               return console.error(err);
            }

            var img = {Key: user, Body: data};
            s3Bucket.putObject(img, function(err, data2){
              if (err) 
                { console.log('Error uploading data: ', data2); 
                } else {
                  console.log('succesfully upload the image!');
                }
            });

        });

        fs.writeFile('./server/text.txt', image, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        if (image) {
        	ctx.body = "FUCK!"
            console.log("SHIT!");        
        }
        else {
        	ctx.body = "Sign up successfull!"
            console.log("Sign up successfull!");
        }
    }

    async imageRead(ctx) {
        var {
            user,
        } = ctx.request.body

        var urlParams = {Bucket: 's3.csye6225-spring2018-jiaxi.me', Key: user};
        ctx.body=s3Bucket.getSignedUrl('getObject', urlParams);
    }

    async imageDelete(ctx) {
        const user = ctx.params.user

        console.log(user)

        var params = {Bucket: "s3.csye6225-spring2018-jiaxi.me", Key: user};
        s3.deleteObject(params, function(err, data) {
           if (err) console.log(err, err.stack); // an error occurred
           else     console.log(data);           // successful response
           
        });

        try {
          var stats = fs.statSync('./server/imagetest.png');
          console.log('./server/imagetest.png');
          fs.unlinkSync('./server/imagetest.png');

          ctx.body = "delete successfully!"
        }
        catch(err) {
            ctx.body = "you dont have picture yet!"
            console.log('it does not exist');
        }

        fs.writeFile('./server/text.txt', '', function(){
            console.log('done')
        })
        //ctx.body = "delete successfully!"
    }

}

export default new ImageController()
