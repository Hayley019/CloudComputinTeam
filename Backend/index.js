const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares


// Routes

//Starting the server
app.listen(app.get('port'), () => {
    console.log('El server inicio en el puerto ', app.get('port'));
});