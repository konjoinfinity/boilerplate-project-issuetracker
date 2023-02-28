"use strict";
const mongoose = require("mongoose");
const IssueModel = require("../models").Issue;
const ProjectModel = require("../models").Project;
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      const {
        _id,
        open,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.query;

      ProjectModel.aggregate([
        { $match: { name: project } },
        { $unwind: "$issues" },
        _id != undefined
          ? { $match: { "issues._id": ObjectId(_id) } }
          : { $match: {} },
        open != undefined
          ? { $match: { "issues.open": open } }
          : { $match: {} },
        issue_title != undefined
          ? { $match: { "issues.issue_title": issue_title } }
          : { $match: {} },
        issue_text != undefined
          ? { $match: { "issues.issue_text": issue_text } }
          : { $match: {} },
        created_by != undefined
          ? { $match: { "issues.created_by": created_by } }
          : { $match: {} },
        assigned_to != undefined
          ? { $match: { "issues.assigned_to": assigned_to } }
          : { $match: {} },
        status_text != undefined
          ? { $match: { "issues.status_text": status_text } }
          : { $match: {} },
      ]).exec((err, data) => {
        if (!data) {
          res.json([]);
        } else {
          let mappedData = data.map((item) => item.issues);
          res.json(mappedData);
        }
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.json({ error: "required field(s) missing" });
        return;
      }
      const newIssue = new IssueModel({
        issue_title: req.body.issue_title || "",
        issue_text: req.body.issue_text || "",
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by || "",
        assigned_to: req.body.assigned_to || "",
        open: true,
        status_text: req.body.status_text || "",
      });
      ProjectModel.findOne({ name: project }, (err, projectdata) => {
        if (!projectdata) {
          const newProject = new ProjectModel({ name: project });
          newProject.issues.push(newIssue);
          newProject.save((err, data) => {
            if (err || !data) {
              res.send("There was an error saving in post");
            } else {
              res.json(newIssue);
            }
          });
        } else {
          projectdata.issues.push(newIssue);
          projectdata.save((err, data) => {
            if (err || !data) {
              res.send("There was an error saving in post");
            } else {
              res.json(newIssue);
            }
          });
        }
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let id = req.body._id
        // console.log(req.body);
        ProjectModel.aggregate([
          { $match: { name: project } },
          { $unwind: "$issues" },
          { $match: { "issues._id": ObjectId(id) } },
          { $set: {    
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to,
            open: req.body.open,
            status_text: req.body.status_text 
          } }
        ]).then((err, update) => {
            if(err) {console.log(err)}
            console.log(update)
            res.json(update);
          })
      })
    
    .delete(function (req, res){
      let project = req.params.project;
      console.log(req.body._id)
      console.log(String(req.body._id).length)
      if(String(req.body._id).length == 24) {
      ProjectModel.findOneAndUpdate({ name: project },{ $pull: { issues: { _id: req.body._id } } })
       .then((issue, err) => {
        if (err) {
          res.json({ error: 'could not delete', '_id': req.body._id })
        } else {
        issue.save((err, deleted) => {
            res.json({ result: 'successfully deleted', '_id': req.body._id });
        });
      }
      });
    } else {
      res.json({ error: 'missing _id' })
    }
    });
};
