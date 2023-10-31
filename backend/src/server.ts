import expess from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';
import Logging from './library/Logging';
import userRoutes from './routes/User';
import restaurantRoutes from './routes/Restaurant';
import orderRoutes from './routes/Order';
import menuRoutes from './routes/Menu';
import authRoutes from './routes/Auth';

const router = expess();
// Connect to Mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to mongoDb');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });
// Only start server if connected to MongoDb
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the req
        Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the response 
            Logging.info(`Outgoing -> Method: [${req.method}] - Url : [${req.url}] - 
            IP : [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        })
        next();
    });
    router.use(expess.urlencoded({ extended: true }));
    router.use(expess.json());
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
    router.use(authRoutes);
    router.use('/user', userRoutes);
    router.use('/restaurant', restaurantRoutes);
    router.use('/order', orderRoutes);
    router.use('/menu', menuRoutes);

    //test
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // ERORR HANDLER NEAPARAT TREBUIE SA MA APUC SA IL FAC
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message })
    })
    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port [${config.server.port}]`))
}