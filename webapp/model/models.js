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
					
				}
			]	
			};
			var oModel = new JSONModel(oData);
			return oModel;	
			
		}

	};
});