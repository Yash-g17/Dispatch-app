<<<<<<< HEAD
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const dbService = require("./dbService");
const socket = require("socket.io");

let server = app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});

const io = socket(server);
io.set("origins", "*:*");
dotenv.config();
app.use(cors());
app.use(express.json());

const SerialPort = require("serialport");
const port = new SerialPort("COM3", {
    baudRate: 9600,
});
let resultArray;
// port.on("data", function(data) {
//     console.log(data.toString("utf-8"));
// });
io.sockets.on("connection", (socket) => {
    console.log("Socket connection established " + socket.id);
    // Switches the port into "flowing mode"
    port.on("data", function(data) {
        const product_code = data.toString("utf-8");
        console.log(product_code);

        const db = dbService.getDbServiceInstance();
        const info = db.getAttributes(product_code);
        info
            .then((data) => {
                resultArray = Object.values(JSON.parse(JSON.stringify(data)));
                console.log(resultArray);
                // console.log(resultArray[0].id);

                if (resultArray.length == 0) socket.broadcast.emit("invalid entry");
                if (resultArray.length > 0) {
                    socket.broadcast.emit("product_data", JSON.stringify(resultArray[0]));
                }
            })
            .catch((err) => console.log("error" + err));
        // console.log(Object.values(JSON.parse(JSON.stringify(resultArray))));
        ////////////////////////////////////////
        console.log("code :", product_code);
    });

    // socket.broadcast.emit("code", data);
    socket.on("generate", () => {
        console.log("Generate command recieved");
    });
});
/////////////////////////////////////
app.post("/data", (req, res) => {
    const db = dbService.getDbServiceInstance();
    console.log(req.body);

    let biller_code = req.body.biller_code;
    let product_code_arr = req.body.products_arr;
    console.log(product_code_arr);
    let key;
    for (key in product_code_arr) {
        let obj = product_code_arr[key];
        let key1;
        for (key1 in obj) {
            console.log(key1);
            db.product_dispatched(key1, biller_code);
        }
    }
    res.status(200).end();
});
=======
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const dbService = require("./dbService");
const socket = require("socket.io");

let server = app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});

const io = socket(server);
io.set("origins", "*:*");
dotenv.config();
app.use(cors());
app.use(express.json());

// const SerialPort = require("serialport");
// const port = new SerialPort("COM4", {
//     baudRate: 9600,
// });
let resultArray; {
    io.sockets.on("connection", (socket) => {
        console.log("Socket connection established " + socket.id);
        // Switches the port into "flowing mode"
        port.on("data", function(data) {
            const product_code = data.toString("utf-8");
            const db = dbService.getDbServiceInstance();
            const info = db.getAttributes(product_code);
            info
                .then((data) => {
                    resultArray = Object.values(JSON.parse(JSON.stringify(data)));
                })
                .catch((err) => console.log("error" + err));
            ////////////////////////////////////////

            if (resultArray.length == 0) socket.broadcast.emit("invalid entry");
            if (resultArray.length > 0) {
                socket.broadcast.emit("product type", resultArray.product_code);
                socket.broadcast.emit("weight", resultArray.weight);
                socket, broadcast.emit("id", resultArray.id);
            }

            console.log("code :", product_code);
        });

        // socket.broadcast.emit("code", data);
        socket.on("generate", () => {
            console.log("Generate command recieved");
        });
    });
}
>>>>>>> 2156bf589455dea20b0671d8cc04ead44e07df50
