import expess from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('conectat');
    })
    .catch((error) => {
        console.log(config.mongo.url);
    });