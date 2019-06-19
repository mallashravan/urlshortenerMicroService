const mongo = require('mongodb');
const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://malla_shravan:08121989@cluster0-shgf3.mongodb.net/test?retryWrites=true&w=majority');
mongoose
    .connect('mongodb+srv://malla_shravan:08121989@cluster0-shgf3.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;

module.exports = db