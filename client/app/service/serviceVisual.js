(function(){
  
  angular.module('projectyr.service')
  .factory('Visual', Visual);

  function Visual ($location, $window) {
    var options = {
      responsive: true,
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 2,
      percentageInnerCutout: 70, 
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };

    var barOptions = {
      responsive: true,
      scaleBeginAtZero : true,
      scaleShowGridLines: false,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      barShowStroke: true,
      barStrokeWidth: 2,
      barValueSpacing: 5,
      barDatasetSpacing: 10,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    
    return {
      options: options,
      barOptions: barOptions
    };
  }
})();


