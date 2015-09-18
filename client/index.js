(function(){
  angular.module('projectyr.index', [])
  .controller('IndexController', IndexController);

  function IndexController ($scope, $window, $rootScope, $interval, Project, Auth, $location) {
    
    $scope.$watch(Auth.isAuth, function(authed){
        if (authed) {
          $scope.authed = true;
        } else {
          $scope.authed = false;
        } 
      }, true);

    $rootScope.initIndex = function() {
      Project.getOpen()
      .then(function(all) {
        $scope.projects = all.projects;
      });
    }

    $rootScope.initIndex();
    
    $scope.user = {};
    $scope.user.err = '';
    
    $scope.setProject = function(project){
      $rootScope.project = project;
      $rootScope.init();
    }
    
    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (data) {
         $('#login').modal('hide')
          console.log(data)
          // server send an Object that has token and boolean hasWIP throught Auth factory signin function
          // if user does not have WIP project, direct user to create a project
          $window.localStorage.setItem('projectyr', data.token);
          if ( !!data.hasWIP ) {
            $location.path('/current');
          } else {
            $location.path('/create');
          }
        })
        .catch(function(error) {
          console.log("error", error)
          // check error to display different Error to user
          if ( error.data.indexOf('not exist') > -1 ) {
            $scope.user.err = 'Error: Username does not exist'
          } else {
            $scope.user.err = 'Error: Invalid password';
          }
        });     
    };
  
    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (token) {
          $('#signup').modal('hide')
          // set user's localstorage token to allow user to be authorized to browser other web pages
          // also direct user to create their first project
          $window.localStorage.setItem('projectyr', token);
          $location.path('/create');
        })
        .catch(function(error){
          console.log("error", error)
          // check error to display different Error to user
          if ( error.data.indexOf('taken') > -1 ) {
            $scope.user.err = 'Error: Username is taken'
          } else {
            $scope.user.err = 'Error: Invalid password';
          }
        });
    };
  };
})();
