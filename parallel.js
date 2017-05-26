//Greg Sharpe
//Challenger Vis - multiple scatter plots
//Code for scales and axes based on scatterTutorial.js

// First, we will create some constants to define non-data-related parts of the visualization
// side = 140;		 // side of one graph
// offset = 40;		// Space for axis labels
vals = ['Flight Number','Leak-check Pressure (psi)','Launch Temperature (°F)','Tufte Metric','Number of Failed O-Rings'];

// Next, we will load in our CSV of data
d3.csv('challenger.csv', function(csvData) {
	data = csvData;
	minX=50
	minY = 100;
	oneHeight = 400;
	oneWidth = 250;
	
	// This will define scales that convert values
	// from our data domain into screen coordinates.
	yScales=[]
	
	yScales.push(d3.scale.linear()
			.domain([d3.min(data, function(d) { return parseFloat(d[vals[0]]); }),
					 d3.max(data, function(d) { return parseFloat(d[vals[0]]); })])
			.range([minY+oneHeight,minY]));
	yScales.push(d3.scale.linear()
			.domain([d3.min(data, function(d) { return parseFloat(d[vals[1]]); }),
					 d3.max(data, function(d) { return parseFloat(d[vals[1]]); })])
			.range([minY+oneHeight,minY]));
	yScales.push(d3.scale.linear()
			.domain([d3.min(data, function(d) { return parseFloat(d[vals[2]]); }),
					 d3.max(data, function(d) { return parseFloat(d[vals[2]]); })])
			.range([minY+oneHeight,minY]));
	yScales.push(d3.scale.linear()
			.domain([d3.min(data, function(d) { return parseFloat(d[vals[3]]); }),
					 d3.max(data, function(d) { return parseFloat(d[vals[3]]); })])
			.range([minY+oneHeight,minY]));
	yScales.push(d3.scale.linear()
			.domain([d3.min(data, function(d) { return parseFloat(d[vals[4]]); }),
					 d3.max(data, function(d) { return parseFloat(d[vals[4]]); })])
			.range([minY+oneHeight,minY]));

	var colorScale={0:"darkgreen",1:"orange",2:"red"};
	
	var fadedColorScale={0:"#e6ffe6",1:"#fff6e6",2:"#ffe6e6"};

	svg = d3.select('#pointsSVG').append('svg:svg')
					.attr('width', minX+oneWidth*4+75)
					.attr('height', minY+oneHeight+150)
					.attr('class', "svg")

	// For each pair of scales not measuring the same dimension, create axes
	for (x = 0; x < 5; x++){
		xshift = minX+oneWidth*x;
		
		yAxis = d3.svg.axis()
			.scale(yScales[x])
			.orient('left')
			.ticks(6);
		yAxisG = svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate('+ xshift +',0)')
			.call(yAxis);   
		yLabel = svg.append('text')
			.attr('class','label')
				.attr('y', minY-15)
				.attr('x', xshift)
				.text(vals[x]);
	}
	
	getColor = function(d, i){
		return colorScale[d[vals[4]]];
	}
	
	getFadedColor = function(d){
		return fadedColorScale[d[vals[4]]];
	}
	
	//emphasize data point by circling each point in blue and showing the row in the table
	highlight = function(lineSelection, i){
		lineSelection.style("stroke-width",10)
			.attr('opacity',.7);
		row = d3.select("#tr"+lineSelection.data()[0][vals[0]])
		row.classed("hidden",false)
	}
	//http://bl.ocks.org/eesur/4e0a69d57d3bfc8a82c2
	d3.selection.prototype.moveToBack = function() {  
		return this.each(function() { 
			var firstChild = this.parentNode.firstChild; 
			if (firstChild) { 
				this.parentNode.insertBefore(this, firstChild); 
			} 
		});
	};
	
	//un-emphasize data
	unhighlight = function(lineSelection, i){
		lineSelection.style("stroke-width",3)
			.attr('opacity',1);
		row = d3.select("#tr"+lineSelection.data()[0][vals[0]])
		row.classed("hidden",true)
	}
	
	//highlight temporarily
	handleMouseOver = function(d, i){
		lineSelection = d3.select(this).selectAll("line");
		highlight(lineSelection,i);
	}
		
	//toggle whether data point is permanently highlighted
	handleClick = function(d, i){
		lineSelection = d3.select(this).selectAll("line")
		if(lineSelection.classed("selected")){
			lineSelection.classed("selected",false);
			d3.select(this).classed("selected",false);
			unhighlight(lineSelection, i);
		} else {
			lineSelection.classed("selected",true);
			d3.select(this).classed("selected",true);
			highlight(lineSelection, i);
			d3.select(this).moveToBack();
		}
	}
	
	//unhighlight if it's not toggled on
	handleMouseOut = function(d, i){   
		lineSelection = d3.select(this).selectAll("line");
		if(!lineSelection.classed("selected")){
			unhighlight(lineSelection,i);
		}
	}
	
	addLine = function(group,x){
		group.append('line')
			  .attr('x1', minX+x*oneWidth-1)
			  .attr('y1', function(d) { return yScales[x](d[vals[x]]); })
			  .attr('x2', minX+(x+1)*oneWidth)
			  .attr('y2', function(d) { return yScales[x+1](d[vals[x+1]]); })
			  .style('stroke-width', 3)
			  .style('stroke', getColor)
	}
	
	//Create a group of circles for each data point. 
	lineGroup = svg.append('g').classed("alllines",true);
	allSelected = lineGroup.selectAll('.linegroup').data(data).enter();
	group = allSelected.append('g').classed("linegroup",true);
	addLine(group,0);
	addLine(group,1);
	addLine(group,2);
	addLine(group,3);
	
	group.on("mouseover", handleMouseOver);
	group.on("mouseout", handleMouseOut);  
	group.on("click", handleClick);
	
	//create a table for the text version of data
	//add a header with cells bound to titles, table rows bound to data rows
	tableRect=svg.append("g").classed("container",true);
	var container = d3.select("#pointsSVG");
	table = container.append("table")
		.attr("style","vertical-align:top; display:inline-block; margin-top:"+minY+";");
	table.append("thead").append('tr').append('th')
		.html("Challenger USA Space Shuttle Flights")
		.attr("class","title")
		.attr("colspan",5);
	table.append("thead").append('tr')
		.selectAll('th')
		.data(vals).enter()
		.append("th")
		.html(function(d) {return d});
	rows=table.selectAll("table>tr")
			.data(csvData).enter()
			.append("tr")
			.attr("class","hidden")
			.attr("id", function(d){return "tr"+d[vals[0]];})
			.attr("style", function(d) {return "background-color:"+getFadedColor(d)+";"});
	rows.append('td')
			.html(function(d) {return d[vals[0]]})
	rows.append('td')
			.html(function(d) {return d[vals[1]]})
	rows.append('td')
			.html(function(d) {return d[vals[2]]})
	rows.append('td')
			.html(function(d) {return d[vals[3]]})
	rows.append('td')
			.html(function(d) {return d[vals[4]]})
	
	//color legend
	var legend = svg.selectAll('.legend')
		.data([0,1,2])
		.enter()
		.append('g')
		.attr('class','legend')
	legend.append('rect')
		.attr('width', 20)
		.attr('height',20)
		.style('fill', function(d){ return colorScale[d];})
		.attr('transform',function(d){
			return 'translate('+(minX+oneWidth*3)+','+(minY+oneHeight+50+25*d)+')';}
		);
	legend.append('text')
		.attr('x', minX+oneWidth*3+25)
		.attr('y', function(d){
			return minY+oneHeight+50+25*d+12.5;}
		)
		.text( function(d){
			return d;})
	svg.append('text')
		.attr('class','label')
		.text("O-Rings With")
		.attr('x', minX+oneWidth*3+20)
		.attr('y', minY+oneHeight+50-20)
	svg.append('text')
		.attr('class','label')
		.text("Thermal Distress")
		.attr('x', minX+oneWidth*3+20)
		.attr('y', minY+oneHeight+50+12-20)
	
	svg.append('text')
		.text("Lichman, M. (2013). UCI Machine Learning Repository [http://archive.ics.uci.edu/ml].")
		.attr('x', 20)
		.attr('y', minY+oneHeight+20+30)
	svg.append('text')
		.text("Irvine, CA: University of California, School of Information and Computer Science. ")
		.attr('x', 20)
		.attr('y', minY+oneHeight+20+30+13)
	
	handleButtonClick=function(){
		svg.selectAll(".alllines>.linegroup").each(handleClick);
	}
	
	buttongroup = svg.append('g')
		.classed('buttongroup',true)
		.on('click',handleButtonClick)
	buttongroup.append('rect')
		.attr('x', minX+oneWidth*2+20)
		.attr('y', minY+oneHeight+20+30)
		.attr('width',100)
		.attr('height',30)
		.style('fill',"lightblue")
	buttongroup.append('text')
		.attr('x', minX+oneWidth*2+20+10)
		.attr('y', minY+oneHeight+20+30+18)
		.text('Invert Selection')
});