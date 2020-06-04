sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
], function (Controller, MessageToast, JSONModel, Filter, FilterOperator, History) {
	"use strict";

	return Controller.extend("WSR.WorkspaceReservation.controller.SelectLocation", {
		onInit: function () {

			// set data model on view
			var oData = {
				"CityEnabled": false,
				"BuildingEnabled": false,
				"DeskEnabled": false,
				"FloorEnabled": false,
				"SelectedDesk": ""
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel,"flags");
		
		},
		onAfterRendering: function(){
			/*var oLocations = JSON.parse(this.getOwnerComponent().getModel("city").getJSON());
			var oBuildings = JSON.parse(this.getOwnerComponent().getModel("buildings").getJSON());
			var oFloors = JSON.parse(this.getOwnerComponent().getModel("floors").getJSON());
			var oSeats = JSON.parse(this.getOwnerComponent().getModel("seats").getJSON());*/
			var oSelectedCity = this.byId("city").getSelectedItem().getKey();
			var oSelectedBld = this.byId("buildings").getSelectedItem().getKey();
			var oSelectedflr = this.byId("floors").getSelectedItem().getKey();
			
			//var ocity_bnd = this.byId("city").getBinding("items");
			var obld_bnd = this.byId("buildings").getBinding("items");
			var oflr_bnd = this.byId("floors").getBinding("items");
			var ost_bnd  = this.byId("seats").getBinding("items");
			obld_bnd.filter(new sap.ui.model.Filter("lid","EQ",oSelectedCity));
			oflr_bnd.filter(new sap.ui.model.Filter("bid","EQ",oSelectedBld));
			ost_bnd.filter(new sap.ui.model.Filter("fid","EQ",oSelectedflr));
			
		},
		onCountrySelected: function (oEvent) {

		},

		onCitySelected: function (oEvent) {

			var oSelectedCity = this.byId("city").getSelectedItem().getKey();
			var obld_bnd = this.byId("buildings").getBinding("items");
			var oflr_bnd = this.byId("floors").getBinding("items");
			var ost_bnd = this.byId("seats").getBinding("items");
			obld_bnd.filter(new sap.ui.model.Filter("lid","EQ",oSelectedCity));
			oflr_bnd.filter(new sap.ui.model.Filter("bid","EQ",""));
			ost_bnd.filter(new sap.ui.model.Filter("fid","EQ",""));
		},
		onBuildingSelected: function (oEvent) {

			var oSelectedBld = this.byId("buildings").getSelectedItem().getKey();
			var oflr_bnd = this.byId("floors").getBinding("items");
			var ost_bnd = this.byId("seats").getBinding("items");

			oflr_bnd.filter(new sap.ui.model.Filter("bid","EQ",oSelectedBld));
			ost_bnd.filter(new sap.ui.model.Filter("fid","EQ",""));
		},
		onFloorSelected: function (oEvent) {

			var oSelectedflr = this.byId("floors").getSelectedItem().getKey();
			var ost_bnd = this.byId("seats").getBinding("items");
			ost_bnd.filter(new sap.ui.model.Filter("fid","EQ",oSelectedflr));
		},
		
		onDeskSelected: function (oEvent) {
		
			var b = "";
    	    b = oEvent.getParameter("selectedItem").getText();
        	MessageToast.show("selectedDesk: " + b);
		},
		


		selectLocation: function () {
			//	var sRecipient = this.getView().getModel().getProperty("/recipient");
			//	MessageToast.show("sRecipient: " + sRecipient);
			var oSelectedst   = this.byId("seats")._getSelectedItemText();
			var oSelectedCity = this.byId("city")._getSelectedItemText();
			var oSelectedbld  = this.byId("buildings")._getSelectedItemText();
			var oSelectedflr  = this.byId("floors")._getSelectedItemText();
			var oSelectedstkey   = this.byId("seats").getSelectedKey();

			if( oSelectedst==="" || oSelectedCity==="" || oSelectedbld==="" || oSelectedflr===""){
				MessageToast.show("All Location fields are mandatory.");
			}
			else{
				var searchButtonText = JSON.parse(this.getOwnerComponent().getModel("global").getJSON());
				searchButtonText.currentLocation = oSelectedCity + " " + oSelectedbld + " " +  oSelectedflr + " " + oSelectedst;
				searchButtonText.currentLocationId = oSelectedstkey;
				var newModel = new JSONModel(searchButtonText);
				this.getOwnerComponent().setModel(newModel,"global");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1");
			}
		},

		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView1");
		}
	});
});
