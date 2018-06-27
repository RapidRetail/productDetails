'use strict';

function generateRandomNumber(userContext, events, done) {
  const number = `${Math.ceil(Math.random() * 10000000)}`;
  userContext.vars.number = number;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomNumber,
};
