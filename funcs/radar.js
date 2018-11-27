/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, control, data) {
    console.log("chamando radar")
    var nMusicLines = 0;
    var dataToPlot = [];
    var cfg = {
        w: 400,				//Width of the circle
        h: 400,				//Height of the circle
        margin: {top: 50, right: 100, bottom: 50, left: 100}, //The margins of the SVG
        levels: 5,				//How many levels or inner circles should there be drawn
        maxValue: 0.5, 			//What is the value that the biggest circle will represent
        labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: 0.0, 	//The opacity of the area of the blob
        dotRadius: 4, 			//The size of the colored circles of each blog
        opacityCircles: 0.1, 	//The opacity of the circles of each blob
        strokeWidth: 1, 		//The width of the stroke around each blob
        roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal(d3.schemeCategory10)	//Color function
    };

    //Put all of the options into a variable called cfg
    // if('undefined' !== typeof options){
    //   for(var i in options){
    // 	if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
    //   }
    // }

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data

    var controlValue = document.getElementById("control").value;

    var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));

    var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
        total = allAxis.length,					//The number of different axes
        radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
        Format = d3.format('%'),			 	//Percentage formatting
        angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //console.log(data[0]);

    //Scale for the radius
    var rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Remove whatever chart with the same id/class was present before
    d3.select(id).select("svg").remove();

    //Initiate the radar chart SVG
    var svg = d3.select(id).append("svg")
        .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
        .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr("class", "radar"+id);
    //Append a g element
    var g = svg.append("g")
        .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    var filter = g.append('defs').append('filter').attr('id','glow'),
        feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
        feMerge = filter.append('feMerge'),
        feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
        feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid.selectAll(".levels")
        .data(d3.range(1,(cfg.levels+1)).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function(d, i){return radius/cfg.levels*d;})
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles)
        .style("filter" , "url(#glow)");


    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");
    //Append the lines
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
        .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "18px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
        .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
        .text(function(d){return d})
        .call(wrap, cfg.wrapWidth);



    //The radial line function
    // var radarLine = d3.radialLine()
    // 	.interpolate("cardinal-closed")
    // 	.radius(function(d) { return rScale(d.value); })
    // 	.angle(function(d,i) {	return i*angleSlice; });

    var radarLine = d3.lineRadial().curve(d3.curveCatmullRomClosed)
        .radius(function(d) { return rScale(d.value); })
        .angle(function(d,i) {	return i*angleSlice; });


    //Create a wrapper for the blobs
    var blobWrapper = g.selectAll(".radarWrapper")
        .data(dataToPlot)
        .enter().append("g")
        .attr("class", "radarWrapper");


        console.log("valor do control:");
        console.log(document.getElementById("control").value);


        if(controlValue > 0){
                     nMusicLines = controlValue;
                    console.log(nMusicLines);
                    dataToPlot = [];
                    for(i=0; i<nMusicLines; i++){
                        dataToPlot[i] = data[i];
                    };

                    console.log(dataToPlot);

                    blobWrapper = g.selectAll(".radarWrapper")
                        .data(dataToPlot)
                        .exit()
                        .remove();

                    blobWrapper = g.selectAll(".radarWrapper")
                        .data(dataToPlot)
                        .enter().append("g")
                        .attr("class", "radarWrapper");

                    blobWrapper.append("path")
                        .attr("class", "radarStroke")
                        .attr("d", function(d,i) { return radarLine(d); })
                        .style("stroke-width", cfg.strokeWidth + "px")
                        .style("stroke", function(d,i) {console.log(0.1+((99-i)/110));return '#1db954'; })
                        .style("fill", "none")
                        .style("filter" , "url(#glow)");

        }

    //Append the backgrounds


    // blobWrapper.append("path")
    // 	.attr("class", "radarStroke")
    // 	.attr("d", function(d,i) { return radarLine(d); })
    // 	.style("stroke-width", cfg.strokeWidth + "px")
    // 	.style("stroke", function(d,i) {console.log(0.1+((99-i)/110));return d3.interpolateOranges(0.1+((99-i)/110)); })
    // 	.style("fill", "none")
    // 	.style("filter" , "url(#glow)");



    d3.select(control).on("input change", function(){
        document.getElementById("nmusicas").innerHTML = "Top "+(+this.value)+" músicas";
        nMusicLines = +this.value;
        console.log(nMusicLines);
        dataToPlot = [];
        for(i=0; i<nMusicLines; i++){
            dataToPlot[i] = data[i];
        };

        console.log(dataToPlot);

        blobWrapper = g.selectAll(".radarWrapper")
            .data(dataToPlot)
            .exit()
            .remove();

        blobWrapper = g.selectAll(".radarWrapper")
            .data(dataToPlot)
            .enter().append("g")
            .attr("class", "radarWrapper");

        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", function(d,i) {console.log(0.1+((99-i)/110));return '#1db954'; })
            .style("fill", "none")
            .style("filter" , "url(#glow)");


    });



    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }//wrap




}//RadarChart