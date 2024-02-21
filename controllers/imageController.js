const upload = require("../middleware/upload");
const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:3080/api/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);

        console.log("incoming files", req.files);
        if (!req.files.length) {
            return res.send({
                message: "You must select a file.",
            });
        }

        const fileInfo = req.files.map((file) => {
            return {
                name: file.filename,
                id: file.id,
                url: baseUrl + file.filename,
            };
        });
        return res.send({
            message: "File has been uploaded.",
            fileInfo,
        });
    } catch (error) {
        console.log(error);

        return res.send({
            message: "Error when trying upload image: ${error}",
        });
    }
};

const getListFiles = async (req, res) => {
    try {
        await mongoClient.connect();

        const database = mongoClient.db(dbConfig.database);
        const images = database.collection(dbConfig.imgBucket + ".files");

        const cursor = images.find({});

        if ((await cursor.count()) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }

        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
            });
        });

        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

const download = async (req, res) => {
    try {
        await mongoClient.connect();

        const database = mongoClient.db(dbConfig.database);
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.imgBucket,
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res
                .status(404)
                .send({ message: "Cannot download the Image!" });
        });

        downloadStream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

module.exports = {
    uploadFiles,
    getListFiles,
    download,
};
