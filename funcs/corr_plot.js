function corrScatter(what){





    marginCorr = {top: 50, right: 20, bottom: 70, left: 20};
    pad = 80;
    var width = 2 * w + pad;

    var svg = d3.select('svg')
        .attr("width", width + marginCorr.left + marginCorr.right)
        .attr("height", h + marginCorr.top + marginCorr.bottom)
        .append('g')
        .attr("transform", 'translate(' + marginCorr.left + ',' + marginCorr.top + ')')
        .attr("width", width)
        .attr("height", h);


    var corrplot = svg.append('g')
        .attr('id', 'corrplot');

    scatterplot = svg.append('g')
        .attr('id', 'scatterplot')
        .attr('transform', 'translate(' + (w + pad) + ',0)');

    corrplot.append('text')
        .text('Matriz de Correlação')
        .attr('class', 'plottitle')
        .attr('x', w/2)
        .attr('y', -marginCorr.top/2)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle');



    scatterplot.append('text')
        .text('Scatter plot')
        .attr('class', 'plottitle')
        .attr('x', w/2)
        .attr('y', -marginCorr.top/2)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle');



    var corXscale = d3.scaleBand().rangeRound([0,w]),
        corYscale = d3.scaleBand().rangeRound([h,0]),
        corColScale = d3.scaleLinear().domain([-1,0,1]).range(['crimson','white','slateblue']);
    var corRscale = d3.scaleSqrt().domain([0,1]);




    vars = ["Danceability", "Energy", "Loudness", "Speechiness", "Acousticness", "Liveness", "Valence", "Tempo", "Duration"];
    nvar = vars.length;
    nind = 100;

    corXscale.domain(d3.range(nvar));
    corYscale.domain(d3.range(nvar));
    corRscale.range([0,0.5*corXscale.bandwidth()]);





    // var nind = data.ind.length,
    //     nvar = data.vars.length;

    console.log(what);

    // var vars = ["Danceability", "Energy", "Loudness", "Speechiness", "Acousticness", "Liveness", "Valence", "Tempo", "Duration"];
    // var nvar = vars.length;
    // var nind = 100;

    // corXscale.domain(d3.range(nvar));
    // corYscale.domain(d3.range(nvar));
    // corRscale.range([0,0.5*corXscale.bandwidth()]);

    var corData = what[1];
    var DataValues = what[0];

    // var corr = [];
    // var tableValues = [];
    for(i = 0; i < nvar; i++){
        corr.push({row: i, col: 0, value:corData[i].danceability});
        corr.push({row: i, col: 1, value:corData[i].energy});
        corr.push({row: i, col: 2, value:corData[i].loudness});
        corr.push({row: i, col: 3, value:corData[i].speechiness});
        corr.push({row: i, col: 4, value:corData[i].acousticness});
        corr.push({row: i, col: 5, value:corData[i].liveness});
        corr.push({row: i, col: 6, value:corData[i].valence});
        corr.push({row: i, col: 7, value:corData[i].tempo});
        corr.push({row: i, col: 8, value:corData[i].duration_ms});
    };

    for(j = 0; j < nind; j++){

        tableValues[j] = [[DataValues[j].danceability], [DataValues[j].energy], [DataValues[j].loudness], [DataValues[j].speechiness],
            [DataValues[j].acousticness], [DataValues[j].liveness], [DataValues[j].valence], [DataValues[j].tempo], [DataValues[j].duration_ms]];

    };


    console.log(+tableValues[1][2]);
    console.log(tableValues);
    console.log(corr);
    // for (var i = 0; i < data.corr.length; ++i) {
    //     for (var j = 0; j < data.corr[i].length; ++j) {
    //         corr.push({row: i, col: j, value:data.corr[i][j]});
    //     }
    // }

    var cells = corrplot.append('g')
        .attr('id', 'cells')
        .selectAll('empty')
        .data(corr)
        .enter().append('g')
        .attr('class', 'cell')
        .style('pointer-events', 'all');


    var rects = cells.append('rect')
        .attr('x',function(d) { return corXscale(d.col); })

        .attr('y', function(d) { return corXscale(d.row); })

        .attr('width', corXscale.bandwidth())

        .attr('height', corYscale.bandwidth())

        .attr('fill', 'none')

        .attr('stroke', 'none')

        .attr('stroke-width', '1');


    var circles = cells.append('circle')
        .attr('cx', function(d) {return corXscale(d.col) + 0.5*corXscale.bandwidth(); })
        .attr('cy', function(d) {return corXscale(d.row) + 0.5*corYscale.bandwidth(); })
        .attr('r', function(d) {return corRscale(Math.abs(d.value)); })
        .style('fill', function(d) { return corColScale(d.value); });

    corrplot.selectAll('g.cell')
        .on('mouseover', function(d) {
            console.log("mouseover");
            d3.select(this)
                .select('rect')
                .attr('stroke', 'black');

            var xPos = parseFloat(d3.select(this).select('rect').attr('x'));
            var yPos = parseFloat(d3.select(this).select('rect').attr('y'));

            corrplot.append('text')
                .attr('class', 'corrlabel')
                //.attr('x', corXscale(d.col))
                .attr('x', w/2)
                .attr('y', h + marginCorr.bottom*0.2)
                .text(vars[d.col])
                .attr('dominant-baseline', 'middle')
                .attr('text-anchor', 'middle');

            corrplot.append('text')
                .attr('class', 'corrlabel')
                .text(vars[d.row])
                .attr('dominant-baseline', 'middle')

                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(' + (-marginCorr.left*0.1) + ',' + h/2 + ')rotate(270)');
            //.attr('transform', 'translate(' + (-marginCorr.left*0.1) + ',' + corXscale(d.row) + ')rotate(270)');


            corrplot.append('rect')
                .attr('class', 'tooltip')
                .attr('x', xPos + 10)
                .attr('y', yPos - 30)
                .attr('width', 40)
                .attr('height', 20)
                .attr('fill', 'rgba(200, 200, 200, 0.5)')
                .attr('stroke', 'black')
                .attr('data-toggle', 'tooltip');


            corrplot.append('text')
                .attr('class', 'tooltip')
                .attr('x', xPos + 30)
                .attr('y', yPos - 15)
                .attr('text-anchor', 'middle')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .attr('fill', 'black')
                .text(d3.format('.2f')(d.value));
        })
        .on('mouseout', function(d) {
            d3.select('#corrtext').remove();
            d3.selectAll('.corrlabel').remove();
            d3.select(this)
                .select('rect')
                .attr('stroke', 'none');
            //Hide the tooltip
            d3.selectAll('.tooltip').remove();
        }).on('click', function(d) {
        drawScatter(d.col, d.row);
        radar(data);
        dc.renderAll();
    });

}//