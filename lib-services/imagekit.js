import ImageKit from "imagekit"

var imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

export const imageUpload = async (file,fileName,folder) => {
    const result = await imageKit.upload({
        file: file,
        fileName: fileName,
        folder,
       
    })

    return result;


}