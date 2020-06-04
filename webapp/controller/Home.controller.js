sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
    "sap/m/MessageBox",
    "../model/models"
], function (Controller,MessageToast,JSONModel,formatter,MessageBox,Model) {
	"use strict";

	return Controller.extend("WSR.WorkspaceReservation.controller.Home" , {
		formatter: formatter,
		onInit: function () {
			/* This code was causing issues as the view was being instantiated again with
				duplicate ID 
				Now on load the list is not filtered but when user presses next/last week it IS filtered
			var oBinding = this.byId("myList").getBinding("items");
			if(oBinding!==undefined){
				oBinding.filter(new sap.ui.model.Filter("week", "EQ", "1"));	
			}*/
		},
		onBeforeRendering: function(){
			var oBinding = this.byId("myList").getBinding("items");
			if(oBinding!==undefined){
				oBinding.filter(new sap.ui.model.Filter("week", "EQ", "1"));	
			}
		},
        onSelectLocationButton: function () {
			//	var sRecipient = this.getView().getModel().getProperty("/recipient");
			//	MessageToast.show("sRecipient "+ sRecipient);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView2");
		},
		onShowHello : function () {
			MessageToast.show("Dialog to Search Locations");
		},
		onPressNext: function () {
			var myList = this.byId("myList");
			var oBinding = myList.getBinding("items");
			var currentWeek = parseInt(oBinding.aFilters[0].oValue1,10);
			currentWeek += 1;
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", currentWeek)); 
		} ,
		onPressPrevious: function () {
			var oBinding = this.byId("myList").getBinding("items");
			var prevWeek = parseInt(oBinding.aFilters[0].oValue1,10);
			prevWeek -= 1;
			if (prevWeek===0){
				MessageToast.show("First Page Reached");	
			}else{
				oBinding.filter(new sap.ui.model.Filter("week", "EQ", prevWeek)); 
			}
		},
		/*onSelectionChange: function (oEvent) {
			var selectedList = this.getView().byId("myList").getSelectedItems();
			//this.byId("myList").getSelectedItem().getTitle();
			for( var sel in selectedList ){
				var mock = this.getView().getModel("mock");
				var key = selectedList[sel].mProperties.title;
			}
			MessageToast.show("Selection Done");
		},*/
		onItemPress: function (oEvent) {
			var selectedItem = this.byId("myList").getSelectedItem().getTitle();
			var infoState = this.byId("myList").getSelectedItem().getInfoState();
			var currentLocation = JSON.parse(this.getOwnerComponent().getModel("global").getJSON());
			var userData = JSON.parse(this.getOwnerComponent().getModel("userData").getJSON());
			const messageButtonTextBook = "Book Seat";
			const messageButtonTextCancel = "Cancel Booking";
			
			
			if(currentLocation.currentLocationId===undefined & infoState !== "Success"){
				MessageToast.show("Please Select a Location");
				return;
			}
			
			if(infoState==="Success"){
				var messageButtonText = messageButtonTextCancel;
				var messageBoxText = "Confirm Booking Cancellation";
			}else{
				messageButtonText = messageButtonTextBook;
				var messageBoxText = "Confirm Booking";
			}
			var baseurl = "https://bookercrud.azurewebsites.net/api/bookings";
    		// fire the XHR request
	    	var xhttp = new XMLHttpRequest();	
	    	var component = this.getOwnerComponent();
			var dt = Model.getFormattedDate(new Date(selectedItem));
			// set the XHR request parameters
	    		
			MessageBox.warning(messageBoxText, {
				actions: [messageButtonText, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					var oFlag = "";
					switch(sAction){
						case messageButtonTextBook:
							var empId = userData.userReservations.preferences[0].employeeId;
							
							var st = currentLocation.currentLocationId;
							var body = [{
						        employeeId	: empId,
						        seatId		: st,
						        date		: dt
						    }];
						    body = JSON.stringify(body);
							xhttp.open("POST",baseurl, false);
	    					xhttp.send(body);
					    	if (xhttp.readyState === 4) 
					    	{	
					    		switch(xhttp.status){
					    			case 200:
					    				//var newModel = Model.createJSONMock(component);
					    				//component.setModel(newModel,"screenMock");
					    				MessageToast.show("Seat" + " " + currentLocation.currentLocation + " " + "Booked Successfully");
					    				oFlag = "S";
					    				break;
				    				case 400:
				    					var oData = JSON.parse(xhttp.responseText);
				    					MessageToast.show(oData.message);
				    					break;
			    					case 500:
			    						MessageToast.show("Server Error Request Failed");
			    						break;
					    		}
					        	//MessageToast.show(oData);
					    	}
							break;
						case messageButtonTextCancel:
							var reservations = userData.userReservations.reservations;
							for(var res in reservations){
								if(reservations[res].date===dt){
									var bookingId = reservations[res].id;
									break;
								}
							}
							if(bookingId!==undefined){
								var body = [ bookingId ];
								body = JSON.stringify(body);
								//MessageToast.show("Functionality Under Construction");
								oFlag = "S";
								xhttp.open("DELETE",baseurl, false);
								xhttp.setRequestHeader("Access-Control-Allow-Methods","*");
	    						xhttp.send(body);
	    						if (xhttp.readyState === 4) 
						    	{	
						    		
						    		switch(xhttp.status){
						    			case 200:
						    				//var newModel = Model.createJSONMock(component);
					    					//component.setModel(newModel,"screenMock");
						    				MessageToast.show("Booking Cancelled Successfully");
						    				
						    				break;
					    				case 400:
					    					var oData = JSON.parse(xhttp.responseText);
					    					MessageToast.show(oData.message);
					    					break;
				    					case 500:
				    						MessageToast.show("Server Error Request Failed");
				    						break;
						    		}
						    	}
					    	}
					    	break;
						case MessageBox.Action.CANCEL:
							MessageToast.show("Action Cancelled");
						}	//Switch Case Action Close
					/*	if (oFlag==="S"){
							
						}*/
					} //Function Close
					
				});//Message Box close
			}
	});
});
