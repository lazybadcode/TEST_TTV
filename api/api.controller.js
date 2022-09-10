const Parking = require('../model/parking')
const {rando} = require('@nastyox/rando.js');
const Slot = require('../model/slot');
const service = require("../services/service");




exports.create_parking = async (req, res) => {
    console.log("create_parking api")
    const data = req.body;

    let parkID = rando(0001, 9999)
    let park = new  Parking({parking_id : parkID, name: "Park1", total_slot : 20})
    let row = park.total_slot / 10
    //let datas = []

    await service.insertParking(park.name, park.total_slot,  function (err, result) {
        if(err){
            console.warn(err)
            return res.sendStatus(500);
        }else{
            
            console.log(`result   ${JSON.stringify(result)} `) //insertId
            for(let x = 1; x <= row; x++) {
                for(let y = 1; y <= 10; y++) {
                    //console.log(`x ${x} and y ${y}`)
                    //let slot = new Slot({park_id : park.parking_id, is_available : 'Y', x_pos : x, y_pos : y })
                    //datas.push(slot);
                    if(result){
                            service.insertParkingSlot(result.insertId, 1, x, y, function (err, result) {
                            if(err){
                                console.warn(err)
                                return res.sendStatus(500);
                            }else{
                                return  "OK"
                            }
                        });
                    }
                }
            }

            service.getParkingSlot("Park1", function (err, result) {
                 if(err){
                        console.warn(err)
                        return res.sendStatus(500);
                    }else{
                        return  res.json({ result: result });
                    }
            });
            
           
           // return res.sendStatus(200);
        }
    });

};



exports.park_the_car = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

exports.leave_the_slot = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

exports.get_parking_status = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

exports.get_plate_number_by_car_size = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

exports.get_slot_number_by_car_size = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

