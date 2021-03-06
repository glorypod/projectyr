var db = require('../db.js');
var Users = require('./users.js');
var Skills = require('./skills.js');
var _ = require('../../node_modules/underscore/underscore.js');

var Projects = module.exports = {
  getAllProjects: function(userId) {
    return db.select()
      .from('projects')
      .where('users_id', '=', userId)
      .then(function(rows) {
        return rows;
      });
  },

  getOpenProjects: function(userId) {
    return db.select()
      .from('projects')
      .where('users_id', userId)
      .andWhere('done', null)
      .then(function(rows) {
        return Skills.getSkillTime(rows)
          .then(function(result) {
            return result;
          })
      });
  },

  getClosedProjects: function(userId) {
    return db.select()
      .from('projects')
      .where('users_id', userId)
      .andWhere('done', true)
      .then(function(rows) {
        return Skills.getSkillTime(rows)
          .then(function(result) {
            return result;
          })
      });
  },

  hasInProgress: function(userId) {
    return this.getOpenProjects(userId)
      .then(function(projects) {
        return projects.length > 0;
      })
  },

  insertProject: function(userId, project) {
    //need req.body.project to be an object with the following format:  { name:, est:, skills: {skillname: 0, skillname2: 0, etc.}}
    return db('projects').returning("projects_id").insert({
        project_name: project.name, 
        est_time: project.estTime, 
        users_id: userId,
        creation_time: new Date().toLocaleString(),
        completion_time: '',
        skill1: project.skill1,
        skill2: project.skill2, 
        skill3: project.skill3,
        skill4: project.skill4,
        skill5: project.skill5})
        .then(function() {
          var skills = Projects.getAllSkills(project);
          Skills.insertSkill(skills)
            .then(function() {
              console.log("Insert skills succeed!")
            })
        });
  },

  updateProject: function(project){
    return db('projects').where('projects_id', project.projects_id)
      .update({done: true, completion_time: new Date().toLocaleString()})
      .then(function(){
        console.log(project.project_name + " update complete")
      });
  },

  reopenProject: function(project){
    return db('projects').where('projects_id', project.projects_id)
      .update({done: null, completion_time: ''})
      .then(function(){
        console.log(project.project_name + " reopen complete")
      });
  },

  duplicateProject: function(userId, project) {
    return db.select()
      .from('projects')
      .where('users_id', userId)
      .andWhere('project_name', project.name)
      .then(function(projects) {
        return projects.length > 0;
      });
  },

  findProjectId: function(userId, project) {
   return db.select()
     .from('projects')
     .where('project_name', '=', project)
     .andWhere('users_id', '=', userId)
     .then(function(result) {
       return result[0].projects_id;
     })
  },

  getAllSkills: function(project) {
    var skills = [];
    if (project.skill1 && skills.indexOf(project.skill1) === -1) {
      skills.push(project.skill1);
    };
    if (project.skill2 && skills.indexOf(project.skill2) === -1) {
      skills.push(project.skill2);
    };
    if (project.skill3 && skills.indexOf(project.skill3) === -1) {
      skills.push(project.skill3);
    };
    if (project.skill4 && skills.indexOf(project.skill4) === -1) {
      skills.push(project.skill4);
    };
    if (project.skill5 && skills.indexOf(project.skill5) === -1) {
      skills.push(project.skill5);
    };
    return skills;
  }
}