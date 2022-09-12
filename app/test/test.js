const apiController = require('../api/api.controller')

describe('get_plate_number_by_car_size', () => {
  it('returns bad request if car size is missing', async () => {
    let res = await apiController.get_plate_number_by_car_size()
    expect(res).toEqual("Get Car No NOT OK");
  });
});

