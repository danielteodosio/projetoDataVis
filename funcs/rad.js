function radar(data_){
	 let tops = [];

     for(i = 0; i <=99; i++){
     	tops[i] = data_[i];
     }


      /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
      
			////////////////////////////////////////////////////////////// 
			//////////////////////// Set-Up ////////////////////////////// 
			////////////////////////////////////////////////////////////// 

			// var margin = {top: 100, right: 100, bottom: 100, left: 100},
			// 	width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
			// 	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
			////////////////////////////////////////////////////////////// 
			////////////////////////// Data ////////////////////////////// 
			////////////////////////////////////////////////////////////// 

            let dataAxis;
            let outArray = [];
            let insideArray = [];

            let scale1 = d3.scaleLinear().domain([0.0, 1.0]).range([0.0, 0.5]);
            let scale2 = d3.scaleLinear().domain([-60.0, 0.0]).range([0.0, 0.5]);
            let k = 100;

            tops.forEach(function(d){
               console.log("chamando rad");
               console.log(d.name, scale1(+d.danceability));
            	
            	dataAxis = new Object();

            	dataAxis.axis = "Danceability";
            	dataAxis.value = scale1(+d.danceability);
            	insideArray.push(dataAxis);

            	dataAxis = new Object();
               
            	dataAxis.axis = "Energy";
            	dataAxis.value = scale1(+d.energy);
            	insideArray.push(dataAxis);

            	dataAxis = new Object();
            	
            	dataAxis.axis = "Loudness";
            	dataAxis.value = scale2(+d.loudness);
            	insideArray.push(dataAxis);


            	dataAxis = new Object();

            	dataAxis.axis = "Acousticness";
            	dataAxis.value = scale1(+d.acousticness);
            	insideArray.push(dataAxis);


            	dataAxis = new Object();

            	dataAxis.axis = "Valence";
            	dataAxis.value = scale1(+d.valence);
            	insideArray.push(dataAxis);

            	outArray.push(insideArray);

            	insideArray = [];



            });
           

			var color = d3.scaleOrdinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);
				
			// var radarChartOptions = {
			//   w: width,
			//   h: height,
			//   margin: margin,
			//   maxValue: 0.5,
			//   levels: 5,
			//   roundStrokes: true,
			//   color: color
			// };
			//Call function to draw the Radar chart
			//console.log(data);
			RadarChart(".radarChart","#control", outArray);

		
}