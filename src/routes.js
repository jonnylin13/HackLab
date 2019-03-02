'use strict';

const Router = require('express').Router;
require('dotenv').config();

const LabService = require('./services/lab-service');
const User = require('./models/user');

const router = Router();
const labService = new LabService(gcService);

// ============
// Middleroutes
// ============
function _validateFields(req, res, next, fields) {
  req.valid = true;
  for (let field of fields) {
    if (req.body[field] === undefined || req.body[field] === null) {
      req.valid = false;
    }
  }
  next();
}

function _identify(req, res) {}

// ========
// Internal
// ========

// ==========
// API Routes
// ==========
// Ping route
router.get('/', function(req, res) {
  return res.json({ message: 'Welcome to HackLab API!' });
});

// Create lab
router
  .post(
    '/labs',
    (req, res, next) => _validateFields(req, res, next, ['code', 'nickname']),
    function(req, res) {
      if (req.valid) {
        labService.getGC().clean();
        let lab = labService.addLab(req.body.code);
        lab.addStudent(new User(lab.getId(), req.body.nickname));
        let payload = {
          id: lab.getId()
        };
        return res.json(payload);
      }
      let payload = {
        code: 0,
        message: 'Missing field.'
      };
      return res.json(payload);
    }
  )
  .get('/labs/:id', function(req, res) {})
  .delete('/labs/:id', function(req, res) {})
  .post('/labs/:id', function(req, res) {});

module.exports = router;
