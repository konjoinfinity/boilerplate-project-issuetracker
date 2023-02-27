"use strict";
const mongoose = require("mongoose");
const IssueModel = require("../models").Issue;
const ProjectModel = require("../models").Project;
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      ProjectModel.findOne({ name: project })
                  .then(proj => res.json(proj.issues));
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
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
