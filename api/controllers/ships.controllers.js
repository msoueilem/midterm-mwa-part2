const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const geoSearch = function(req,res){
    // const offset = parseFloat(req.querry.offset,10)
    // const count = parseFloat(req.querry.count,10)
    const lng = parseFloat(req.query.lng, 10)
    const lat = parseFloat(req.query.lat, 10)
    const dis = parseFloat(req.query.dis, 10)
    const point = {type:"Point",
coordinates: [lng,lat]}
    const querry = {
        "coordinates":{
            $near:{
                $geometry:point,
                $minDistance: 0,
                $maxDistance: dis
            }
        }
    }
    Ship.find(querry).skip(0).limit(5).exec(function(err,ship){
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(ship)
        }
    })
}
const getAll = function (req, res) {
    let counter = parseInt(req.query.counter,10)
    let offset=0
    let skip = parseInt(req.query.offset,10)
    if(skip<0){
        counter=5
        offset=0
    }else{
        counter=5
        offset=skip
    }
    Ship.find().skip(offset).limit(counter).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    geoSearch: geoSearch,
};