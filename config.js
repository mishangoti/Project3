const path = require('path');
const dotenv = require('dotenv');

console.log(`Mode : ${process.env.DZ_MODE}`);

if (process.env.DZ_MODE == 'production') {
    dotenv.load({ path: '.env-prod' });
} else {
    //   dotenv.load({ path: '.env-dev' });
    dotenv.config({ path: './.env-dev' });
}

// console.log(process.env);
module.exports = {
    appName: process.env.DZ_APP_NAME,
    logPath: process.env.DZ_LOG_PATH,
    port: process.env.DZ_PORT,
    mode: process.env.DZ_MODE || 'development',
    databaseInfo: {
        mongodbUrl: process.env.MONGODB_URI,
        userName: process.env.DZ_DB_USERNAME,
        password: process.env.DZ_DB_PASSWORD,
        databaseName: process.env.DZ_DB_NAME,
        host: process.env.DZ_LOG_PATH,
    },
    filePaths: {
        parentDir: __dirname,
        filesDir: path.join(__dirname, 'files'),
    },
    insta: {
        client_id: process.env.INSTA_CLIENT_ID,
        client_secret: process.env.INSTA_CLIENT_SECRET,
        redirect_url: process.env.INSTA_REDIRECT_URI,
        auth_url: 'https://api.instagram.com/oauth/authorize/?client_id=' + process.env.INSTA_CLIENT_ID + '&redirect_uri=' + process.env.INSTA_REDIRECT_URI + '&response_type=code'
    },
    stackoverflow: {
        key: process.env.STACKOVERFLOW_KEY,
        secret: process.env.STACKOVERFLOW_SECRET,
    },
    facebook: {
        app_key: process.env.FACEBOOK_APP_KEY,
        secret_key: process.env.FACEBOOK_SECRET_KEY,
        redirect_url: process.env.FACEBOOK_REDIRECT_URL,
        data_redirect_url: process.env.FACEBOOK_DATA_REDIRECT_URL
    },
    github: {
        client_key: process.env.GITHUB_CLIENT_KEY,
        client_secret_key: process.env.GITHUB_CLIENT_SECRET_KEY
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret_key: process.env.GOOGLE_CLIENT_SECRET,
        client_redirect_url: process.env.GOOGLE_CLIENT_REDIRECT_URL
    }
};
