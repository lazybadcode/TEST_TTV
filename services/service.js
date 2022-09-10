const aConnMysql = require("../repo/con_mysql");

async function insertParking(aPakingName, aTotalSlot, callback) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'insert into parking (parking_name, total_slot) values (?,?)';
        pool.query(aSql, [aPakingName, aTotalSlot], function (err, result) {
            if (result) {
                callback(err, result);
            } else {
                if (err)
                    console.warn(`INSERT PARKING ERROR`)
                callback(err, null);
            }
        });
    } catch (err) {
        console.warn(err)
    }
}

async function insertParkingSlot(park_id, is_available, x_pos, y_pos, callback) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'insert into slots (park_id,is_available,x_pos,y_pos ) values (?,?,?,?)';
        pool.query(aSql, [park_id,is_available,x_pos,y_pos], function (err, result) {
            if (result) {
                callback(err, park_id);
            } else {
                if (err)
                    console.warn(`INSERT SLOTS ERROR`)
                callback(err, null);
            }
        });
    } catch (err) {
        console.warn(err)
    }
}

async function getParkingSlot(parking_name, callback) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'select * from parking p inner join slots s on p.parking_id = s.park_id where p.parking_name = ?';
        pool.query(aSql, [parking_name], function (err, result) {
            if (result) {
                callback(err, result);
            } else {
                if (err)
                    console.warn(`GET SLOTS ERROR`)
                callback(err, null);
            }
        });
    } catch (err) {
        console.warn(err)
    }
}


module.exports = {insertParking: insertParking, 
                insertParkingSlot: insertParkingSlot, getParkingSlot:getParkingSlot}

