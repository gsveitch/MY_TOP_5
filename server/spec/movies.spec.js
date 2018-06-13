require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/movies`;

describe('movies', () => {
  describe('on get', (done) => {
  });

  describe('on post', (done) => {
  });

  describe('on put', (done) => {
  });

  describe('on delete', (done) => {
  });
});
