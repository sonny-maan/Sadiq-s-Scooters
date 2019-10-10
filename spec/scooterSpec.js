describe('scooter', () => {

  let scooter;

  beforeEach(() => {
    scooter = new Scooter();
  })

  it('scooter returns its speed', () => {
    expect(scooter.speed).toEqual(0.02);
  })

})