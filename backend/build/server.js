"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const User_1 = __importDefault(require("./routes/User"));
const Restaurant_1 = __importDefault(require("./routes/Restaurant"));
const Order_1 = __importDefault(require("./routes/Order"));
const Menu_1 = __importDefault(require("./routes/Menu"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const router = (0, express_1.default)();
// Connect to Mongo
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Connected to mongoDb');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('Unable to connect');
    Logging_1.default.error(error);
});
// Only start server if connected to MongoDb
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the req
        Logging_1.default.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // Log the response 
            Logging_1.default.info(`Outgoing -> Method: [${req.method}] - Url : [${req.url}] - 
            IP : [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    // Rules of our API 
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    //Routes
    router.use(Auth_1.default);
    router.use('/user', User_1.default);
    router.use('/restaurant', Restaurant_1.default);
    router.use('/order', Order_1.default);
    router.use('/menu', Menu_1.default);
    //test
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    // ERORR HANDLER NEAPARAT TREBUIE SA MA APUC SA IL FAC
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port [${config_1.config.server.port}]`));
};
