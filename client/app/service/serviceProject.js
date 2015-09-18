(function(){
  
  angular.module('projectyr.service')
  .factory('Project', Project);

  function Project ($http, $location, $window) {
    // require server to send a boolean to indicated if the user has with in progress project, and hand it over to controller
    function create (project) {
      return $http({
        method: 'POST',
        url: '/projects/create',
        data: project
      })
      .then(function(resp) {
        console.log("Create new project");
        return resp.data.hadWIP;
      });
    };

    // get all the WIP projects for the user//previously getAll
    function getOpen () {
      return $http({
        method: 'GET',
        url: '/projects/open'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    //get all the Completed projects for the user//new
    function getClosed () {
      return $http({
        method: 'GET',
        url: '/projects/closed'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    // timeData is an object liek a project, but has time1/2/3 properties indicating the time assigned on each skill, server send over a string.
    function timeAssign (timeData) {
      return $http({
        method: 'POST',
        url: '/projects/timeAssign',
        data: timeData
      })
      .then(function(resp){
        return resp.data;
      })
    };

    // completeProject send the completed project to the server.
    function completeProject (project) {
      return $http({
        method: 'POST',
        url: '/projects/complete',
        data: project
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("completeProject Error: ", err)
      })
    };

    function reopenProject (project) {
      console.log(project)
      console.log("inside the factory")
      return $http({
        method: 'POST',
        url: '/projects/reopen',
        data: project
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("reopenProject Error: ", err)
      })
    };

    return {
      create: create,
      getOpen:getOpen,
      getClosed:getClosed,
      timeAssign: timeAssign,
      completeProject: completeProject,
      reopenProject: reopenProject
    }
  };

})();