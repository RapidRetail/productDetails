'use strict';

function generateRandomNumber(userContext, events, done) {
  const number = `${9000000 + Math.ceil(Math.random() * 1000000)}`;
  userContext.vars.number = number;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomNumber,
};
