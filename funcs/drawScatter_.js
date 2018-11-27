var drawScatter = function(col, row) {
            //console.log('column ' + col + ', row ' + row);
            let colValues = [];
            let rowValues = [];

            for(i = 0; i < 100; i++){
                 colValues[i] = +tableValues[i][col];
            };

            for(j = 0; j < 100; j++){
                 rowValues[j] = +tableValues[j][row];
            };

            console.log(d3.extent(colValues));
            console.log(d3.extent(rowValues));
              
           
            d3.selectAll('.points').remove();
            d3.selectAll('.axis').remove();
            d3.selectAll('.scatterlabel').remove();

            var xScale = d3.scaleLinear()
                .domain(d3.extent(colValues))
                .range([0, w]);
          
            var yScale = d3.scaleLinear()
                .domain(d3.extent(rowValues))
                .range([h, 0]);

            var xAxis = d3.axisBottom().scale(xScale).ticks(5);
            var yAxis = d3.axisLeft().scale(yScale);

            // var xAxis = d3.svg.axis()
            //     .scale(xScale)
            //     .orient('bottom')
            //     .ticks(5);

            // var yAxis = d3.svg.axis()
            //     .scale(yScale)
            //     .orient('left');

            scatterplot.append('g')
                .attr('class', 'points')
                .selectAll('empty')
                .data(d3.range(nind))
                .enter().append('circle')
                .attr('class', 'point')
                .attr('cx', function(d) {
                        return xScale(+tableValues[d][col]);
                    })
                .attr(
                        'cy', function(d) {
                        return yScale(+tableValues[d][row]);
                    })

                 .attr('r', 2)
                 .attr('stroke', 'none')
                 .attr('fill', 'black');



            scatterplot.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + h + ')')
                .call(xAxis);

            scatterplot.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

            scatterplot.append('text')
                .text(vars[col])
                .attr('class', 'scatterlabel')
                .attr('x', w/2)
                .attr('y', h + marginCorr.bottom/2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle');


            scatterplot.append('text')
                .text(vars[row])
                .attr('class', 'scatterlabel')
                .attr('transform', 'translate(' + (-pad/1.25) + ',' + (h/2) + ')rotate(270)')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle');
                // .attr({
                //     'class': 'scatterlabel',
                //     'transform': 'translate(' + (-pad/1.25) + ',' + (h/2) + ')rotate(270)',
                //     'dominant-baseline': 'middle',
                //     'text-anchor': 'middle'
                // });

        
                dc.renderAll();
        }