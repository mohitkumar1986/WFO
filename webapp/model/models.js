sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createGlobalData: function() {
			var oFlags = {
				previousButtonActiveFlag	: "false",
				nextButtonActiveFlag		: "true"
			};
			var oModel = new JSONModel(oFlags);
			return oModel;
		},
		createLocationModel: function (componentRef) {
			
			var baseurl = "https://bookercrud.azurewebsites.net/api/masterdata";

			/*var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url			:url,
				jsonCallback:'getJSON',
				contentType	:"application/json",
				datatype	:'jsonnp',
				success : function(data, textStatus, jqXHR) {
					oModel.setData(data);
					componentRef.setModel(oModel,"locations");
				}
			});*/
			
    		// fire the XHR request
	    	var xhttp = new XMLHttpRequest();	
			xhttp.onreadystatechange = function() {
	 
	    	// 4 means request is finished and response is ready
	    	// 200 means ok
	    	if (this.readyState === 4 && this.status === 200) {
	        // this refers here to the XHR object
	        	//sap.base.Log.info(this.responseText);
	        	var oData = JSON.parse(this.responseText);
	        	var oModel = new JSONModel(oData);
	    		componentRef.setModel(oModel,"locations");
	    	}};
	    			// set the XHR request parameters
	    		xhttp.open("GET",baseurl, true);
	    		xhttp.send();
    	},
		createMockModel: function (){
			var oData = {
			reservations : [
				{
					day :		"Monday 25th May 2020",
					colleagues: "Colleagues Reservations: Mohit KUmar / Cristian Petrache",
					status: 	"None",
					week:		"Week1"
					
				},
				{
					day : "Tuesday 26th May 2020",
					colleagues: "Colleagues Reservations: Katie Bebbington / Cristian Petrache",
					status: "Reserved",
					week:		"Week1"
					
				},
				{
					day : "Wednesday 27th May 2020",
					colleagues: "Colleagues Reservations: Katie Bebbington / Cristian Petrache",
					status: "None",
					week:		"Week1"
					
				},
				{
					day : "Thursday 28th May 2020",
					colleagues: "Colleagues Reservations: Katie Bebbington / Mohit Kumar / Shweta Kaushal",
					status: "Unavailable",
					week:		"Week1"
					
				},
				{
					day : "Friday 29th May 2020",
					colleagues: "Colleagues Reservations: ABC anderson / Johny Bravo / Gordon Freeman / Nathan Drake / Kratos / Bruce Banner / Tony Stark",
					status: "Unavailable",
					week:		"Week1"
					
				},
				{
					day :		"Monday 1st June 2020",
					colleagues: "Colleagues Reservations: MK / CP",
					status: 	"None",
					week:		"Week2"
					
				},
				{
					day : "Tuesday 2nd June 2020",
					colleagues: "Colleagues Reservations: KB / CP",
					status: "Reserved",
					week:		"Week2"
					
				},
				{
					day : "Wednesday 3rd June 2020",
					colleagues: "Colleagues Reservations: KB / CP",
					status: "None",
					week:		"Week2"
					
				},
				{
					day : "Thursday 4th June 2020",
					colleagues: "Colleagues Reservations: KB / MK / SK",
					status: "Unavailable",
					week:		"Week2"
					
				},
				{
					day : "Friday 5th June 2020",
					colleagues: "Colleagues Reservations: Tom Jennings / ABS / GF / ND / Bruce Banner / Tony Stark",
					status: "Unavailable",
					week:		"Week2"
					
				}],
				"locations": [{
					country: "Ireland",
					city: "Dublin",
					building: "Waterside",
					floor: "First",
					desk: "1.03"
				}, {
					country: "Ireland",
					city: "Dublin",
					building: "Kingswood",
					floor: "Second",
					desk: "2.02"
				}, {
					country: "Germany",
					city: "Walldorf",
					building: "Building X",
					floor: "Fifth",
					desk: "5.01"
				}, {
					country: "Ireland",
					city: "Galway",
					building: "Emer",
					floor: "Second",
					desk: "2.03"
				}, {
					country: "Ireland",
					city: "Galway",
					building: "Cliona",
					floor: "First",
					desk: "1.03"
				}]
				
		
			};

			var oModel = new JSONModel(oData);
			return oModel;	
			
		},
		createJSONMock: function () 
		{	var d = new Date();
            d = this.getMonday(d);
            var edate = this.addDays(d,30);
            var fromDate = this.getFormattedDate(d);
            var toDate = this.getFormattedDate(edate);
			var baseurl = "https://bookercrud.azurewebsites.net/api/userBookings/I000001?startDate=" + fromDate + "&endDate=" + toDate;
    		// fire the XHR request
	    	var xhttp = new XMLHttpRequest();	
	    	// 4 means request is finished and response is ready
	    	// 200 means ok
	    	
	    			// set the XHR request parameters
	    	xhttp.open("GET",baseurl, false);
	    	xhttp.send();			
	    	var oData = {};
	    	if (xhttp.readyState === 4 && xhttp.status === 200) 
	    	{
	        	oData = {userReservations: JSON.parse(xhttp.responseText)};
	        			
	        	//var oModel = new JSONModel(oData);
				
	    	}
            var screenReservation = [];
            var dt,lv_status,lv_colleagues;
            var lv_res = oData.userReservations.reservations;
            var lv_team_res = oData.userReservations.teamReservations;
			var week = 1;
//Loop to read reservation data and match the same
            for(var i=0;i<30;i++)
            {	
            	dt=this.getFormattedDate(d);
                lv_status = "Not Reserved";
                for (var res in lv_res) 
                {
            	 	if(dt===lv_res[res].date)
            	 	{
               			lv_status="Reserved";
                	}                   
           		}
                lv_colleagues = "";
                for (var index in lv_team_res) 
                {
                	var ind_res = lv_team_res[index].reservations;
					for(var ind2 in ind_res )
					{
                    	if( dt === ind_res[ind2].date ) 
                    	{
               			lv_colleagues = lv_colleagues + lv_team_res[index].name + " ";
                		}                 
                    }
                }
				//Append Data to Screen Reservations. 
                screenReservation[screenReservation.length] = new this.append( dt, lv_status , lv_colleagues, week );
                d = this.addDays(d,1);
            	if( d.getDay() === 6 )
            	{
              		d = this.addDays(d,2);
              		week += 1;
            	}
			}
			var scrOdata = { "screenReservation": screenReservation };
			var screenMock = new JSONModel(scrOdata);
			return screenMock;
		},
		getMonday: function (d) {
  				d = new Date( d );
  				var day = d.getDay();
      			var diff = d.getDate() - day + ( day === 0 ? -6 : 1 ); // adjust when day is sunday
  				return new Date(d.setDate(diff));
		},
        getFormattedDate: function (d) {
 			var month = d.getMonth() + 1;
  	 		var day = d.getDate();
            if (day < 10)
            {
            	var cday = "0" + day;
            }else
            {
            	cday = day;
            }
            if (month < 10)
            {
            	var cmonth = "0" + month;
            }else{
            	cmonth = month;
            }
		   	var year = d.getFullYear();
		   	return year + "-" + cmonth + "-" + cday;
		},
		addDays:function (date, days) {
  			var copy = new Date(Number(date));
  			copy.setDate(date.getDate() + days);
  			return copy;
		},
         append: function (day,status,colleagues,week){
        	this.day = day;
            this.status = status;
            this.colleagues = colleagues;
            this.week = week;
            return this;
        }
	};
});
