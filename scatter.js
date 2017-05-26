//Greg Sharpe
//Challenger Vis - multiple scatter plots
//Code for scales and axes based on scatterTutorial.js

// First, we will create some constants to define non-data-related parts of the visualization
side = 140;         // side of one graph
offset = 40;        // Space for axis labels
vals = ['Flight Number','Leak-check Pressure (psi)','Launch Temperature (°F)','Tufte Metric','Number of Failed O-Rings'];

// Next, we will load in our CSV of data
d3.csv('challenger.csv', function(csvData) {
    data = csvData;
    runningx=offset
    runningy=offset
    
    // This will define scales that convert values
    // from our data domain into screen coordinates.
    xScales=[]
    yScales=[]
    xScales.push(d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseFloat(d[vals[0]]); }),
                     d3.max(data, function(d) { return parseFloat(d[vals[0]]); })])
            .range([runningx, runningx + side]));
    runningx+=2*offset + side;
    xScales.push(d3.scale.linear()
        .domain([d3.min(data, function(d) { return parseFloat(d[vals[1]]); }),
                 d3.max(data, function(d) { return parseFloat(d[vals[1]]); })])
        .range([runningx, runningx + side]));
    runningx+=2*offset + side;
    xScales.push(d3.scale.linear()
        .domain([d3.min(data, function(d) { return parseFloat(d[vals[2]]); }),
                 d3.max(data, function(d) { return parseFloat(d[vals[2]]); })])
        .range([runningx, runningx + side]));
    runningx+=2*offset + side;
    xScales.push(d3.scale.linear()
        .domain([d3.min(data, function(d) { return parseFloat(d[vals[3]]); }),
             d3.max(data, function(d) { return parseFloat(d[vals[3]]); })])
        .range([runningx, runningx + side]));
    runningx+=2*offset + side;
    
    yScales.push(d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseFloat(d[vals[0]]); }),
                     d3.max(data, function(d) { return parseFloat(d[vals[0]]); })])
            .range([runningy+side,runningy]));
    runningy+=side+offset;
    yScales.push(d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseFloat(d[vals[1]]); }),
                     d3.max(data, function(d) { return parseFloat(d[vals[1]]); })])
            .range([runningy+side,runningy]));
    runningy+=side+offset;
    yScales.push(d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseFloat(d[vals[2]]); }),
                     d3.max(data, function(d) { return parseFloat(d[vals[2]]); })])
            .range([runningy+side,runningy]));
    runningy+=side+offset;
    yScales.push(d3.scale.linear()
            .domain([d3.min(data, function(d) { return parseFloat(d[vals[3]]); }),
                     d3.max(data, function(d) { return parseFloat(d[vals[3]]); })])
            .range([runningy+side,runningy]));
    runningy+=side+offset;

    var colorScale={0:"darkgreen",1:"orange",2:"red"};
    
    var fadedColorScale={0:"#e6ffe6",1:"#fff6e6",2:"#ffe6e6"};

    svg = d3.select('#pointsSVG').append('svg:svg')
                    .attr('width', runningx+1)
                    .attr('height', runningy+offset*2)
                    .attr('class', "svg")
    
    svg.attr('transform','translate(20,0)');

    // For each pair of scales not measuring the same dimension, create axes
    for (x = 0; x < 4; x++){
        for (y = 0; y < 4; y++){
            if (x!=y){
                yshift = offset+(y+1)*side+y*offset;
                xshift = offset+x*(side+2*offset);
                xAxis = d3.svg.axis()
                    .scale(xScales[x])
                    .orient('bottom')
                    .ticks(5)
                
                xAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(0,' + yshift +')')
                    .call(xAxis);
                if(y==3 || x==3 && y==2 || x==y+1){
                    xLabel = svg.append('text')
                        .attr('class','label')
                        .attr('x', xshift+2*offset)
                        .attr('y', yshift+offset)
                        .text(vals[x]);
                }
                yAxis = d3.svg.axis()
                    .scale(yScales[y])
                    .orient('left')
                    .ticks(5);
                
                yAxisG = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate('+ xshift +',0)')
                    .call(yAxis);   
                if(x==0 || y==0 && x==1 || x==y+1){
                    yshift=.25*offset+x*(side+2*offset);
                    xshift=-(2.75*offset+y*(side+offset))
                    yLabel = svg.append('text')
                        .attr('class','label')
                        .attr("transform", "rotate(-90)" )
                        .attr('y', yshift)
                        .attr('x', xshift)
                        .text(vals[y]);
                }
            }   
        }
    }
    
    getColor = function(d, i){
        return colorScale[d[vals[4]]];
    }
    
    getFadedColor = function(d){
        return fadedColorScale[d[vals[4]]];
    }
    
    //emphasize data point by circling each point in blue and showing the row in the table
    highlight = function(circleSelection, i){
        circleSelection.attr("r",10)
            .attr('opacity',.7);
        rownum=i+2
        row = d3.select("#tr"+circleSelection.data()[0][vals[0]])
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
    unhighlight = function(circleSelection, i){
        circleSelection.attr("r",5)
            .attr('opacity',1);
        rownum=i+2
        row = d3.select("#tr"+circleSelection.data()[0][vals[0]])
        row.classed("hidden",true)
    }
    
    //highlight temporarily
    handleMouseOver = function(d, i){
        circleSelection = d3.select(this).selectAll("circle");
        highlight(circleSelection,i);
    }
        
    //toggle whether data point is permanently highlighted
    handleClick = function(d, i){
        circleSelection = d3.select(this).selectAll("circle")
        if(circleSelection.classed("selected")){
            circleSelection.classed("selected",false);
            d3.select(this).classed("selected",false);
            unhighlight(circleSelection, i);
        } else {
            circleSelection.classed("selected",true);
            d3.select(this).classed("selected",true);
            highlight(circleSelection, i);
            d3.select(this).moveToBack();
        }
    }
    
    //unhighlight if it's not toggled on
    handleMouseOut = function(d, i){   
        circleSelection = d3.select(this).selectAll("circle");
        if(!circleSelection.classed("selected")){
            unhighlight(circleSelection,i);
        }
    }
    
    addCircle = function(group,x,y){
        group.append('circle')
              .attr('cx', function(d) { return xScales[x](d[vals[x]]); })
              .attr('cy', function(d) { return yScales[y](d[vals[y]]); })
              .attr('r', 5)
              .style('stroke-width', 0)
              .style('fill', getColor)
    }
    
    //Create a group of circles for each data point. 
    circleGroup = svg.append('g').classed("allcircles",true);
    allSelected = circleGroup.selectAll('.circlegroup').data(data).enter();
    group = allSelected.append('g').classed("circlegroup",true);
    addCircle(group,0,1);
    addCircle(group,0,2);
    addCircle(group,0,3);
    
    addCircle(group,1,0);
    addCircle(group,1,2);
    addCircle(group,1,3);
    
    addCircle(group,2,0);
    addCircle(group,2,1);
    addCircle(group,2,3);
    
    addCircle(group,3,0);
    addCircle(group,3,1);
    addCircle(group,3,2);
    
    group.on("mouseover", handleMouseOver);
    group.on("mouseout", handleMouseOut);  
    group.on("click", handleClick);
    
    //create a table for the text version of data
    //add a header with cells bound to titles, table rows bound to data rows
    tableRect=svg.append("g").classed("container",true);
    var container = d3.select("#pointsSVG");
    table = container.append("table")
        .attr("style","vertical-align:top; display:inline-block; margin-top:"+offset+";");
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
            return 'translate('+(2*offset)+','+(2*offset+25*d)+')';}
        );
    legend.append('text')
        .attr('x', 2*offset+25)
        .attr('y', function(d){
            return 2*offset+12.5+25*d;}
        )
        .text( function(d){
            return d;})
    svg.append('text')
        .attr('class','label')
        .text("O-Rings With")
        .attr('x', 2*offset+30)
        .attr('y', 2*offset-20)
    svg.append('text')
        .attr('class','label')
        .text("Thermal Distress")
        .attr('x', 2*offset+30)
        .attr('y', 2*offset-20+12)
    
    svg.append('text')
        .text("Lichman, M. (2013). UCI Machine Learning Repository [http://archive.ics.uci.edu/ml].")
        .attr('x', runningx-4*side)
        .attr('y', runningy+30)
    svg.append('text')
        .text("Irvine, CA: University of California, School of Information and Computer Science. ")
        .attr('x', runningx-4*side)
        .attr('y', runningy+30+13)
    
    handleButtonClick=function(){
        svg.selectAll(".allcircles>.circlegroup").each(handleClick);
    }
    
    buttongroup = svg.append('g')
        .classed('buttongroup',true)
        .on('click',handleButtonClick)
    buttongroup.append('rect')
        .attr('x', runningx-side-offset-10)
        .attr('y', runningy-side/2)
        .attr('width',100)
        .attr('height',30)
        .style('fill',"lightblue")
    buttongroup.append('text')
        .attr('x', runningx-side-offset)
        .attr('y', runningy-side/2+18)
        .text('Invert Selection')
});