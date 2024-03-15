import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import favicon from 'express-favicon';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log('🚀 ~ __dirname:', __dirname);

const port = 3001;

const app = express();
app.use(favicon(__dirname + '/dist/favicon.ico'));
app.use(helmet.frameguard());
app.use(helmet.contentSecurityPolicy({
    directives: {
        frameAncestors: ['\'none\''],
    },
}));
app.use('/admin', express.static(path.join(__dirname, 'dist')));
app.get('/admin/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port);
