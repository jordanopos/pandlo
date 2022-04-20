import { Router } from "express";
import multer from "multer";
import path from "path";



const storageRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split(".").pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
    }
})


const upload = multer({ dest: "./storage", storage: storage })

storageRouter.get("/:filename", (req, res) => {
    let filename = req.params.filename;
    return res.sendFile(path.join(__dirname + `../../../storage/${filename}`))
})

storageRouter.post('/upload', upload.array('images', 5), function (req, res, next) {
    var sub_array: string[] = [];

    var myfiles = JSON.parse(JSON.stringify(req.files))
    myfiles.map(function (item: Express.Multer.File, index: number) {
        sub_array.push(item.path.replace("\\", "/"));
    })


    var finalData = JSON.stringify({ "links": sub_array })

    return res.send(finalData)
})

export default storageRouter