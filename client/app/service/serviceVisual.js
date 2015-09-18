(function() {

  angular.module('projectyr.service')
    .factory('Visual', Visual);

  function Visual($location, $window) {

    var makeProject = function(project) {

      project.skills = (function() {
        skills = [];
        for (var key in project) {
          if (key === 'skill1' || key === 'skill2' || key ===
            'skill3' ||
            key === 'skill4' || key === 'skill5') {
            if (project[key] !== null) {
              skills.push(project[key]);
            }
          }
        }
        return skills;
      })();

      project.createDonutData = (function() {
        var donutData = [];
        var colors = [['#5cb85c', '#4cae4c'], //green 
                      ['#f0ad4e', '#eea236'], //yellow
                      ['#d95345', '#d43f3a'], //red
                      ['#337ab7', '#2e6da4'], //blue
                      ['#b93b85', '#c12283']]; //purple

        for (var i = 0; i < skills.length; i++) {
          var data = {
            value: Math.round(project[skills[i]] / project.act_time *
              100),
            color: colors[i][0],
            highlight: colors[i][1],
            label: skills[i]
          }
          donutData.push(data);
        }
        return donutData;
      })();

      project.createBarData = (function() {
        var actualColor = (function() {
          if (project.est_time >= project.act_time) {
            actualColor = '#5cb85c'
          } else {
            actualColor = '#d95345'
          }
          return actualColor;
        })();

        return barData = {
          labels: ['times'],
          datasets: [{
            label: 'estimate: ' + project.est_time + 'hrs',
            fillColor: '#337ab7',
            data: [project.est_time]
          }, {
            label: 'actual: ' + Math.round(project.act_time) +
              'hrs',
            fillColor: actualColor,
            data: [Math.round(project.act_time)]
          }]
        };
      })();

      return project;
    }


    var setSelectedProject = function(selected) {
      project = makeProject(selected);
      return project;
    };

    // var options for charts (used by Chartjs)
    var options = {
      responsive: true,
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 2,
      percentageInnerCutout: 50,
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };

    var barOptions = {
      responsive: true,
      scaleBeginAtZero: true,
      scaleShowGridLines: false,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      barShowStroke: true,
      barStrokeWidth: 2,
      barValueSpacing: 5,
      barDatasetSpacing: 10,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

    var lineOptions = {
      responsive: true,
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      scaleBeginAtZero: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      onAnimationProgress: function(){},
      onAnimationComplete: function(){},
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

    return {
      makeProject: makeProject,
      setSelectedProject: setSelectedProject,
      options: options,
      barOptions: barOptions,
      lineOptions: lineOptions
    };

  }
})();