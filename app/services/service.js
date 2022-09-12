const aConnMysql = require("../repo/con_mysql");

async function insertParking(aPakingName, aTotalSlot) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'insert into parking (parking_name, total_slot) values (?,?)';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [aPakingName, aTotalSlot], function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`INSERT PARKING ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function insertParkingSlot(park_id, is_available, x_pos, y_pos) {

    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'insert into slots (park_id,is_available,x_pos,y_pos ) values (?,?,?,?)';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [park_id,is_available,x_pos,y_pos], function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`INSERT PARKING SLOT ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function getParkingSlot(parking_name) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'select p.parking_id, p.parking_name, s.slot_no,  IF(s.is_available = 1, "YES", "NO") is_available, s.x_pos , s.y_pos from parking p inner join slots s on p.parking_id = s.park_id where p.parking_name = ?';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [parking_name], function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`GET SLOTS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function getParkingByName(parking_name) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql =  'select count(*) count from parking p where p.parking_name = ?'
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [parking_name], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`GET Paring ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function getParkingTicket(parking_name) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql =  ` select p.parking_id, p.parking_name, s.slot_no, IF(s.is_available = 1, "YES", "NO") is_available, 
                        s.x_pos , s.y_pos, SQRT( POW ( (0- s.x_pos), 2) +   POW ( (0- s.y_pos), 2) ) distance
                        from parking p inner join slots s on p.parking_id = s.park_id
                        where s.is_available = 1 and  p.parking_name = ? order by distance LIMIT 1; ` 
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [parking_name], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`GET SLOTS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function parkTheCar(obj) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'insert into tickets (car_regist_no, car_type, slot_no, entry_date, exit_date) values (?,?,?,?,?)';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [obj.car_no, obj.car_type, obj.slot_id, obj.entry_date, obj.exit_date], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`INSERT TICKET ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function changeSlotStatus(obj) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'update slots set is_available = 0 where slot_no = ?';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [obj.slot_id], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`UPDATE SLOTS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function getTicketIdByCarNo(carNo) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = 'select  min(t.ticket_no) ticket_no , car_regist_no, count(*) count from tickets t WHERE  t.car_regist_no = ? and  t.exit_date is null group by car_regist_no';
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [carNo], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`GET TICKETS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function leaveTheCar(ticketNo) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = `update tickets t inner join slots s on t.slot_no = s.slot_no 
        set t.exit_date = sysdate(), s.is_available = 1 
        where t.ticket_no = ?`
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [ticketNo], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`UPDATE TICKETS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function getInfoByTicketId(ticket_no) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = `select * from tickets t inner join slots s on t.slot_no = s.slot_no inner join parking p on p.parking_id = s.park_id 
                    where t.ticket_no = ?`
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [ticket_no], function (err, result) {
                if (result) {
                    resolve(result[0]);
                } else {
                    console.warn(`GET TICKETS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function getParkingStatus() {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = `select p.parking_id, p.parking_name, s.slot_no, IF(s.is_available = 1, "YES", "NO") is_available  
        from parking p left join slots s on p.parking_id = s.park_id  order by  p.parking_name, is_available desc; `
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`GET PARKING STATUS ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


async function getCarRegistNoByCarSize(car_type) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = `select t.car_regist_no, t.slot_no, t.car_type, t.entry_date from tickets t where t.car_type = 'medium' and t.exit_date is null order by t.car_regist_no;`
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [car_type], function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`GET CAR NO ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}

async function getCarAllocatedByCarSize(car_type) {
    try {
        let pool = await aConnMysql.getPool();
        let aSql = `select p.parking_name, s.slot_no, IF(s.is_available = 1, "YES", "NO") is_available  , t.car_type
        from parking p left join slots s on p.parking_id = s.park_id left join tickets t on t.slot_no = s.slot_no 
        where t.car_type = ? and s.is_available = 0
        group by p.parking_name, s.slot_no , is_available, t.car_type  order by  p.parking_name, is_available desc;`
        
        return new Promise((resolve, reject) => {
            pool.query(aSql, [car_type], function (err, result) {
                if (result) {
                    resolve(result);
                } else {
                    console.warn(`GET CAR Allocated ERROR`)
                    reject(err)
                }
            });
            
        });
    } catch (err) {
        console.warn(err)
        return err;
    }
}


module.exports = {insertParking: insertParking, 
                insertParkingSlot: insertParkingSlot, 
                getParkingSlot:getParkingSlot,
                getParkingByName: getParkingByName,
                getParkingTicket: getParkingTicket,
                parkTheCar: parkTheCar,
                changeSlotStatus: changeSlotStatus,
                getTicketIdByCarNo: getTicketIdByCarNo,
                leaveTheCar: leaveTheCar,
                getInfoByTicketId: getInfoByTicketId,
                getParkingStatus: getParkingStatus,
                getCarRegistNoByCarSize: getCarRegistNoByCarSize,
                getCarAllocatedByCarSize: getCarAllocatedByCarSize}


