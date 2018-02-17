var fs = require("fs");

class ImageController {

    async imageStore(ctx) {
        var image = ctx.request.body;
        var abc = Object.keys(image);
        abc[0] = abc[0].split(' ').join('+');
        fs.writeFile('./server/text.txt', abc[0], function(err) {
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
        var text = fs.readFileSync('./server/text.txt','utf8');
        console.log(text);
        if(text.length<1){
            ctx.body = "you dont have picture yet"
        }else{
            ctx.body = text;
        }
    }

    async imageDelete(ctx) {
        fs.writeFile('./server/text.txt', '', function(){console.log('done')})
        ctx.body = "delete successfully!"
    }

}

export default new ImageController()