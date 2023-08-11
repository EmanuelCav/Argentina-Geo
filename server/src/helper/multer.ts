import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }
})

const formatValid = (mimetype: string, cb: any) => {

    const validPhoto = /jpeg|png|jpg/

    if(validPhoto.test(mimetype)) {
        cb(null, true)
    } else {
        cb("Format file is not valid")
    }

}

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        formatValid(file.mimetype, cb)
    },
    limits: {
        fileSize: 1000000
    }
})