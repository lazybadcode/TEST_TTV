class Slot {

    constructor({park_id, is_available, x_pos, y_pos }){
        this.park_id = park_id
        this.is_available = is_available || 'Y'
        this.x_pos = x_pos || 0
        this.y_pos = y_pos || 0
    }
}

module.exports = Slot