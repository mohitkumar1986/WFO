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

			var oData	= {currentLocation: "Click to Search & Select Location"};

			var oModel = new JSONModel(oData);
			return oModel;
		},
		createLocationModel: function (component) {
			
			var baseurl = "https://bookercrud.azurewebsites.net/api/masterdata";
    		// fire the XHR request
	    	var xhttp = new XMLHttpRequest();	
		
			// set the XHR request parameters
	    	xhttp.open("GET",baseurl, false);
	    	xhttp.send();
			if (xhttp.readyState === 4 && xhttp.status === 200) 
	    	{
	        	var oData = JSON.parse(xhttp.responseText);
	        	var oModel = new JSONModel(oData);
	        	this.setLocationIndividualModels(oData,component);
	        	return oModel;
	    	}	    		
    	},
		createJSONMock: function (component) 
		{	
			var d = new Date();
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
	    	}
            var screenReservation = [];
            var dt,lv_status,lv_colleagues;
            var lv_res = oData.userReservations.reservations;
            var lv_team_res = oData.userReservations.teamReservations;
            var lv_pref = oData.userReservations.preferences;
            
            /*for(var pr in lv_pref){
            	if(lv_pref[pr].entityType==="S"){
            		
            	}
            }*/
			var week = 1;
			//Loop to read reservation data and match the same
            for(var i=0;i<30;i++)
            {	lv_colleagues = "";
            	dt=this.getFormattedDate(d);
                lv_status = "Not Reserved";
                for (var res in lv_res) 
                {
            	 	if(dt===lv_res[res].date)
            	 	{
               			lv_status="Reserved";
               			lv_colleagues = "Location:" + lv_res[res].locationText;// + " " + "Team Members:";
                	}                   
           		}
                
                /*for (var index in lv_team_res) 
                {
                	var ind_res = lv_team_res[index].reservations;
					for(var ind2 in ind_res )
					{
                    	if( dt === ind_res[ind2].date ) 
                    	{
               				lv_colleagues = lv_colleagues + lv_team_res[index].name + " ";
                		}                 
                    }
                }*/
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
			var oUserData = new JSONModel(oData);
			component.setModel(oUserData,"userData");
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
        },
        setLocationIndividualModels: function(oData,component){
        	var lv_loc=[];
        	var lv_bld=[];
        	var lv_flr=[];
        	var lv_st=[];
        	for(var loc in oData.locations){
        		lv_loc.push(oData.locations[loc]);
        		var buildings = oData.locations[loc].buildings;
        		for(var bld in buildings){
        			var n_bld = buildings[bld];
        			n_bld.lid = oData.locations[loc].id;
        			lv_bld.push(n_bld);
        			
        			var floors = buildings[bld].floors;
        			for(var flr in floors){
        				var n_flr = floors[flr];
        				n_flr.bid = buildings[bld].id;
        				lv_flr.push(floors[flr]);
        				var seats = floors[flr].seats;
        				for(var st in seats){
        					var n_sts = seats[st];
        					n_sts.fid = floors[flr].id;
        					lv_st.push(seats[st]);
        				}
        			}
        		}
        	}
        	var JSON_loc = new JSONModel(lv_loc);
        	var JSON_bld = new JSONModel(lv_bld);
        	var JSON_flr = new JSONModel(lv_flr);
        	var JSON_st = new JSONModel(lv_st);
        	component.setModel(JSON_loc,"city");
        	component.setModel(JSON_bld,"buildings");
        	component.setModel(JSON_flr,"floors");
        	component.setModel(JSON_st,"seats");
        }
	};
});
