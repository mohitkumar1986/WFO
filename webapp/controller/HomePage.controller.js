sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller,MessageToast,JSONModel) {
	"use strict";

	return Controller.extend("WSR.WorkspaceReservation.controller.View1", {
		onInit: function () {
			var oBinding = this.byId("myList").getBinding("items");
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week1"));
		},
		onShowHello : function () {
			//var sRecipient = this.getView().getModel().getProperty("/recipient");
			MessageToast.show("Dialog to Search Locations");
		},
		onPressNext: function () {
			var oBinding = this.byId("myList").getBinding("items");
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week2")); 
		} ,
		onPressPrevious: function () {
			var oBinding = this.byId("myList").getBinding("items");
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week1")); 
		}
	});
});