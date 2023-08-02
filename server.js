const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const res = require('express/lib/response');

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by the environment or 3000 by default

// Middleware
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

let intervalId = ''

const automation = async () => {
    console.log('call to automation');
}

const setTrigger = async (time) => {

    intervalId = setInterval(async () => {
        console.log('call interval');

        await automation()
    },time)
}

app.post('/start',async (req,res) => {
    console.log('automation start api hit');

    try {
        
        const {interval} = req.body
        console.log(`interval = ${interval}`);
    
        await setTrigger(1000*interval)
    
        return res
            .status(200)
            .send({
                success: true
            })
    } catch (error) {
        console.log(error);
    }
})

app.get('/stop',async (req,res) => {
    console.log('stop auto call hit');
    try {
        console.log('Stopping!');
        clearInterval(intervalId)

        return res
            .status(200)
            .send({
                success: true
            })
    } catch (error) {
        console.log(error);
    }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
