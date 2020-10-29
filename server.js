const express = require("express")
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//Server 
const app = express();

// Port
var PORT = process.env.PORT || 3306;
// app.listen(PORT, function() {
//     console.log("listening on port:",PORT)
// })
// middleware
app.use((req ,res,next)=>{
    console.log (req.url);

    next();
});
// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


// route
app.get('/',(req , res ) =>{
    res.send('got you!')
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

// Listen
app.listen(PORT,()=>{
    console.log(`Server started on http:localhost:${PORT}`);
}) 
