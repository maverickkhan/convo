import pkg from 'ts-jest';
const { JestConfigWithTsJest } = pkg;


/** @type {JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
