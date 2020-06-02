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
				"FloorEnabled": false

			};
			var oModel = new JSONModel(oData);



			this.getView().setModel(oModel);
		
		},

		onCountrySelected: function (oEvent) {

			//Toggle City enabled
			var oModel = this.getView().getModel(),
				oData = oModel.getData();

			oData.CityEnabled = !oData.CityEnabled;
			oModel.setData(oData);
		//	MessageToast.show("country: : " + oData.country);
		//	var oBinding = this.byId("city").getBinding("items");
		//	oBinding.filter(new sap.ui.model.Filter("country", "EQ", oData.country));

			// build filter array
		//	var aFilter = [];
	//		var sQuery = oEvent.getParameter("query");

		//	if (sQuery) {
		//		//		MessageToast.show("if (sQuery) ");
		//		aFilter.push(new Filter("country", FilterOperator.Contains, sQuery));
		//	}

			// filter binding
			//var oList = this.getView().byId("city"); //want to filter the city based on country
		//	MessageToast.show("oList: " + oList);
			//oList: Element sap.m.Select#container-WorkspaceReservation---SelectLocation--city
			//	var oBinding = oList.getBinding("items");
			//	MessageToast.show("oBinding: " + oBinding);
			//MessageToast.show("aFilter: " + aFilter);
		//	oBinding.filter(aFilter);

		},

		onCitySelected: function (oEvent) {

			//Toggle building enabled
			var oModel = this.getView().getModel(),
				oData = oModel.getData();

			oData.BuildingEnabled = !oData.BuildingEnabled;
			oModel.setData(oData);
		},
		onBuildingSelected: function (oEvent) {

			//Toggle floor enabled
			var oModel = this.getView().getModel(),
				oData = oModel.getData();

			oData.FloorEnabled = !oData.FloorEnabled;
			oModel.setData(oData);
		},
		onFloorSelected: function (oEvent) {

			//Toggle desk enabled
			var oModel = this.getView().getModel(),
				oData = oModel.getData();
			oData.DeskEnabled = !oData.DeskEnabled;
			oModel.setData(oData);
		},

		selectLocation: function () {

			//	var sRecipient = this.getView().getModel().getProperty("/recipient");
			//	MessageToast.show("sRecipient: " + sRecipient);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView1");

		},

		onNavBack: function () {
		//	MessageToast.show("Back Button Clicked");

			//var oHistory = History.getInstance();
			//	MessageToast.show("oHistory: " + oHistory);
			//	var sPreviousHash = oHistory.getPreviousHash();
			//		MessageToast.show("sPreviousHash: " + sPreviousHash);

			//	if (sPreviousHash !== undefined) {
			//		window.history.go(-1);
			//	} else {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView1");
			//	}
		}
	});
});
