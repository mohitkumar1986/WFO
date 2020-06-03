sap.ui.define([], function() {
	"use strict";
	return {
		infoState: function (status) {
			switch (status){
				case "Reserved":
				return "Success";
				case "Not Reserved":
				return "Information";
				case "Not Available":
				return "Error";
				default:
				return "Information";
			}	
		},
		displayDate: function (date) {
			var day = date.slice(8,10);
			var month = date.slice(5,7);
			var year = date.slice(0,4);
			/*switch (month){
				case "01":
				var cMonth = "Jan"; break;
				case "02":
				cMonth = "Feb"; break;
				case "03":
				cMonth = "Mar"; break;
				case "04":
				cMonth = "Apr"; break;
				case "05":
				cMonth = "May"; break;
				case "06":
				cMonth = "Jun"; break;
				case "07":
				cMonth = "Jul"; break;
				case "08":
				cMonth = "Aug"; break;
				case "09":
				cMonth = "Sep"; break;
				case "10":
				cMonth = "Oct"; break;
				case "11":
				cMonth = "Nov"; break;
				case "12":
				cMonth = "Dec"; break;
			}
			
			switch (day){
				case "01":
				case "21":
				var dayth = "st"; break;
				case "02":
				case "22":
				dayth = "nd"; break;
				case "03":
				case "23":
				dayth = "rd"; break;
				default:
				dayth = "th";	
			}*/
			var act_Dt = new Date();
			act_Dt.setDate(day);
			act_Dt.setMonth(month - 1);
			act_Dt.setYear(year);
			return act_Dt.toDateString();
			//var cDay = act_Dt.getDay();
			//return cDay + " " + day + dayth + " " + cMonth + " " + year;
		}	
	};
});