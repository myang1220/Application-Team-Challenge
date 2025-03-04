const { faker } = require("@faker-js/faker");
const { ICD_CODE } = require("./constants/icdCode");

function makeDiagnosis(numDiagnoses) {
  const result = [];

  for (let i = 0; i < numDiagnoses; i++) {
    result.push({
      icdCode: faker.helpers.arrayElement(ICD_CODE),
      timestamp: faker.date.recent(365),
    });
  }

  return result.sort((a, b) => new Date(a.timestamp - b.timestamp));
}

function makeParticipants(numParticipants) {
  const result = [];

  for (let i = 0; i < numParticipants; i++) {
    result.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.past(10, new Date(1950, 0, 1)),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE", "NON-BINARY"]),
      phoneNumber: faker.number.int({ min: 1000000000, max: 9999999999 }),
      patientNotes: faker.helpers.arrayElement([faker.lorem.text(), null]),
      diagnoses: makeDiagnosis(10),
    });
  }

  return result;
}

const participants = makeParticipants(200);

module.exports = { participants };
