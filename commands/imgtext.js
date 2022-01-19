const tesseract = require('tesseract.js');
const Jimp = require("jimp");

module.exports = {
    data: {
        name: 'imgtext',
        description: 'Gets the text from an image'
    },
    async execute(message, args, client) {
        if (message.attachments.size > 0) {
            message.attachments.forEach(async (attachment) => {
                let channel = client.channels.cache.get('880833129500262441')
                
                //gets the image url from the chat 
                const imageLink = attachment.proxyURL;
                //checks if it exists
                if (!imageLink) return;
                if (!args[0]) {
                    tesseract.recognize(imageLink, 'eng', { logger: m => console.log(m) })
                        .then(({ data: { text } }) => {
                        channel.send(text)
                    })
                }else if (args[0] === "isWhiteText"){
                    //Jimp is a library that performs preprocessing on images
                    const image = await Jimp.read(imageLink)
                    //checks if the image exists
                    if (!image) return
                    //inverts the image
                    image.invert()
                    buffer = await image.getBufferAsync('image/png')
                    //tesseract retrieves the file and performs the text recognition
            
                    tesseract.recognize(buffer, 'eng', { logger: m => console.log(m) })
                        .then(({ data: { text } }) => {
                        channel.send(text)
                    })
        
                }
                
             });
        }
        
    }

}