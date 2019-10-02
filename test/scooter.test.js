const Scooter = require('../lib/scooter');

describe('scooter', () => {

  let scooter;

  beforeEach(() => {
    scooter = new Scooter();
  })

  test('scooter returns its speed', () => {
    expect(scooter.speed).toEqual(0.04);
  })

})