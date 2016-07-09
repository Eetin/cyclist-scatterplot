/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	__webpack_require__(2);
	
	d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function (d) {
	  plot(d);
	});
	
	var plot = function plot(data) {
	  var _d, _d2;
	
	  var margin = { top: 120, right: 120, bottom: 60, left: 60 };
	
	  var width = 900 - margin.right - margin.left,
	      height = 600 - margin.top - margin.bottom,
	      barWidth = 5,
	      barOffset = 2;
	
	  var middleX = (margin.left + width + margin.right) / 2;
	
	  var xScale = d3.scaleLinear().domain([d3.min(data, function (d) {
	    return d["Seconds"];
	  }), d3.max(data, function (d) {
	    return d["Seconds"];
	  }) + 10]).range([width, 0]);
	
	  var yScale = d3.scaleLinear().domain([d3.min(data, function (d) {
	    return d["Place"];
	  }), d3.max(data, function (d) {
	    return d["Place"];
	  }) + 2]).range([0, height]);
	
	  var svg = d3.select('#chart').append('svg').classed('center-block', true).attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom);
	
	  var labels = svg.append('g').classed('labels', true);
	
	  labels.append('text').classed('h1', true).text('Doping in Professional Bicycle Racing').attr('transform', 'translate(' + middleX + ', ' + 50 + ')').attr('text-anchor', 'middle');
	  labels.append('text').classed('h2', true).text('35 Fastest times up Alpe d\'Huez (13.8km)').attr('transform', 'translate(' + middleX + ', ' + 90 + ')').attr('text-anchor', 'middle');
	  labels.append('text').classed('x-legend', true).text('Minutes Behind Fastest Time').attr('transform', 'translate(' + middleX + ', ' + (margin.top + height + 40) + ')').attr('text-anchor', 'middle');
	  labels.append('text').classed('y-legend', true).text('Ranking').attr('transform', 'translate(' + (margin.left - 30) + ', ' + margin.top + ') rotate(-90)').attr('text-anchor', 'end');
	
	  var tooltip = svg.append('g').classed('tooltip', true).attr('transform', 'translate(' + (width - 300) + ', ' + (height - 100) + ')').style('display', 'none');
	
	  tooltip.append('rect').classed('tooltip-rect', true).attr('width', 450).attr('height', '9em').attr('rx', 10).attr('ry', 10);
	  var tooltipPlace = tooltip.append('text').classed('tooltip-place', true).attr('x', 5).attr('y', '1.5em');
	  tooltipPlace.append('tspan').classed('label place-label', true).text('Place: ');
	  tooltipPlace.append('tspan').classed('place-text', true);
	
	  var tooltipName = tooltip.append('text').classed('tooltip-name', true).attr('x', 5).attr('y', '3em');
	  tooltipName.append('tspan').classed('label name-label', true).text('Name: ');
	  tooltipName.append('tspan').classed('name-text', true);
	  tooltipName.append('tspan').classed('name-separator', true).text(', ');
	  tooltipName.append('tspan').classed('name-nation-text', true).style('font-weight', 'bold');
	
	  var tooltipDesc = tooltip.append('text').classed('tooltip-desc', true).attr('x', 5).attr('y', '4.5em');
	  tooltipDesc.append('tspan').classed('label desc-year-label', true).text('Year: ');
	  tooltipDesc.append('tspan').classed('desc-year-text', true);
	  tooltipDesc.append('tspan').classed('label desc-time-label', true).text(' Time: ');
	  tooltipDesc.append('tspan').classed('desc-time-text', true);
	
	  tooltip.append('text').classed('tooltip-doping', true).attr('x', 5).attr('y', '6.5em');
	
	  d3.selectAll('.tooltip text, .tooltip tspan').style('font-size', '1.2em');
	  d3.selectAll('.tooltip .label').style('font-weight', 'bold');
	
	  var riders = svg.append('g').classed('riders', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').selectAll('rider').data(data).enter().append('g').classed('rider', true).on('mouseover', function (d) {
	
	    d3.select('.tooltip-rect').classed('doping', d["Doping"] !== "");
	
	    d3.select('.tooltip-place .place-text').text(function () {
	      return d["Place"];
	    });
	    d3.select('.tooltip-name .name-text').text(d["Name"]);
	    d3.select('.tooltip-name .name-nation-text').text(d["Nationality"]);
	    d3.select('.tooltip-desc .desc-year-text').text(d["Year"]);
	    d3.select('.tooltip-desc .desc-time-text').text(d["Time"]);
	    d3.select('.tooltip-doping').text(function () {
	      return d["Doping"];
	    });
	
	    d3.select(this).select('circle').style('stroke', 'black');
	    d3.select(this).select('text').attr('font-weight', 'bold');
	
	    tooltip.transition().style('display', 'block').style('opacity', 1);
	  }).on('mouseout', function (d) {
	    tooltip.transition().style('display', 'none');
	
	    d3.select(this).select('circle').style('stroke', '');
	    d3.select(this).select('text').attr('font-weight', 'normal');
	  });
	
	  riders.append('circle').style('fill', function (d) {
	    return d["Doping"] == "" ? 'green' : 'red';
	  }).attr('cx', function (d) {
	    return xScale(d["Seconds"]);
	  }).attr('cy', function (d) {
	    return yScale(d["Place"]);
	  }).attr('r', 5);
	
	  riders.append('text').attr('x', function (d) {
	    return xScale(d["Seconds"]) + 10;
	  }).attr('y', function (d) {
	    return yScale(d["Place"]);
	  }).style('alignment-baseline', 'central').style('font-size', '0.8em').text(function (d) {
	    return d["Name"];
	  });
	
	  var legend = svg.append('g').classed('legend', true).attr('transform', 'translate(' + (width - 50) + ', ' + (height + 50) + ')');
	
	  legend.append('circle').style('fill', 'red').attr('r', 5).attr('cx', 0).attr('cy', 0);
	  legend.append('text').text('Riders with doping allegations').attr('x', 10).attr('y', 0).style('alignment-baseline', 'central').style('font-size', '0.8em');
	  legend.append('circle').style('fill', 'green').attr('r', 5).attr('cx', 0).attr('cy', 20);
	  legend.append('text').text('No doping allegations').attr('x', 10).attr('y', 20).style('alignment-baseline', 'central').style('font-size', '0.8em');
	
	  var vAxis = d3.axisLeft(yScale).tickValues((_d = d3).range.apply(_d, _toConsumableArray(yScale.domain())).filter(function (d) {
	    return d === 1 || d % 5 == 0;
	  }));
	  d3.select('svg').append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(vAxis);
	
	  var hAxis = d3.axisBottom(xScale).tickValues((_d2 = d3).range.apply(_d2, _toConsumableArray(xScale.domain()).concat([20]))).tickFormat(function (d) {
	    var date = new Date(2016, 1, 1);
	    date.setSeconds(d - data[0]["Seconds"]);
	    return d3.timeFormat("%M:%S")(date);
	  });
	  d3.select('svg').append('g').attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')').call(hAxis);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map