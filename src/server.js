const app = require('./index');

const connect = require('./configs/db');

app.listen(process.env.PORT || 5000, async () => {

    try {

        await connect();
        
        console.log(`listening on port ${process.env.PORT || 5000}`);
    }
    catch (err){
        console.log({ERRR: err.message});
    }
})