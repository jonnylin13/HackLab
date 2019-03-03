'use strict';

const Router = require('express').Router;
require('dotenv').config();
const jwt = require('jsonwebtoken');

const LabService = require('./services/lab-service');
const User = require('./models/user');
const SocketServer = require('./socket');

class RouteController {
  constructor(server) {
    this.router = Router();
    this.labService = new LabService();
    this.socketServer = new SocketServer(this.labService, server);
    this._registerRoutes();
  }

  // ============
  // Middleroutes
  // ============
  _validateFields(req, res, next, fields) {
    req.valid = true;
    for (let field of fields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        req.valid = false;
      }
    }
    next();
  }
  _identify(req, res) {}

  _signJWT(userId) {
    return jwt.sign({ userId: userId }, process.env.SECRET, {
      expiresIn: 86400
    });
  }

  _registerRoutes() {
    this.router.get('/', function(req, res) {
      return res.json({ message: 'Welcome to HackLab API!' });
    });

    this.router
      .post(
        '/labs',
        (req, res, next) =>
          this._validateFields(req, res, next, ['code', 'nickname']),
        (req, res) => {
          if (!req.valid) return res.json({ code: -1 });
          this.labService.getGC().clean();
          let user = new User(null, req.body.nickname);
          let lab = this.labService.addLab(user, req.body.code);
          let payload = {
            id: lab.id,
            token: this._signJWT(user.id)
          };
          return res.json(payload);
        }
      )
      .get('/labs/:id', (req, res) => {
        let id = req.params['id'];
        let lab = this.labService.getLab(id);
        if (!lab) {
          return res.json({ code: 0 });
        }
        return res.json({ code: 1, lab: lab });
      })
      .post(
        '/labs/:id',
        (req, res, next) => this._validateFields(req, res, next, ['nickname']),
        (req, res) => {
          if (!req.valid) return res.json({ code: -1 });

          let id = req.params['id'];
          let lab = this.labService.getLab(id);

          if (!lab) return res.json({ code: 0 });

          let user = new User(id, req.body.nickname);
          lab.addStudent(user);
          let payload = {
            token: this._signJWT(user.id),
            lab: lab,
            code: 1
          };
          this.socketServer.update(lab);
          return res.json(payload);
        }
      );
    this.router.post(
      '/disconnect/:id',
      (req, res, next) => this._validateFields(req, res, next, ['token']),
      (req, res) => {
        if (!req.valid) return res.json({ code: -1 });
        let id = req.params['id'];
        let lab = this.labService.getLab(id);
        if (!lab) return res.json({ code: -2 });

        jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
          if (err) return res.json({ code: 0 });
          let id = decoded.userId;
          if (lab.instructor === id) {
            this.socketServer.disconnect(lab);
            this.labService.removeLab(lab.id);
          } else {
            lab.removeStudent(id);
            this.socketServer.update(lab);
          }
          return res.json({ code: 1 });
        });
      }
    );
    this.router.post(
      '/submit/:id',
      (req, res, next) => this._validateFields(req, res, next, ['token']),
      (req, res) => {
        if (!req.valid) return res.json({ code: -1 });
        let id = req.params['id'];
        let lab = this.labService.getLab(id);
        if (!lab) return res.json({ code: -2 });

        jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
          if (err) return res.json({ code: -3 });
          let id = decoded.userId;
          let student = lab.getStudent(id);
          student.setCompleted(true);
          this.socketServer.update(lab);
          return res.json({ code: 1 });
        });
      }
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RouteController;
