const ImageKit = require("imagekit");
const obj = {
    publicKey : `${process.env.IMAGEKIT_PUBLIC_KEY}`,
    privateKey : `${process.env.IMAGEKIT_PRIVET_KEY}`,
    urlEndpoint : `${process.env.IMAGEKIT_ENDPOINT}`
}
const imagekit = new ImageKit(obj);

module.exports = imagekit