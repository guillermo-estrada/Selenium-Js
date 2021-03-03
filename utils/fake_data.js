var faker = require('faker');

var fake = function(){
  return{
    email: faker.Internet.email(),
    libraryName: "GE " + faker.Address.city() + " Library",
    address: faker.Address.streetAddress(),
    phone: faker.PhoneNumber.phoneNumber()
  }
}

module.exports = fake;
