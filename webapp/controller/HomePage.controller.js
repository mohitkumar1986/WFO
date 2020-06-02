sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller,MessageToast,JSONModel) {
	"use strict";

	return Controller.extend("WSR.WorkspaceReservation.controller.View1", {
		onInit: function () {
			/* This code was causing issues as the view was being instantiated again with
				duplicate ID 
				Now on load the list is not filtered but when user presses next/last week it IS filtered*/
			var oBinding = this.byId("myList").getBinding("items");
			if(oBinding !== undefined){
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week1"));
}
		},
		onSelectLocationButton: function () {
			//	var sRecipient = this.getView().getModel().getProperty("/recipient");
			//	MessageToast.show("sRecipient "+ sRecipient);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView2");
		},
		onPressNext: function () {
			var oBinding = this.byId("myList").getBinding("items");
		//	MessageToast.show("oBinding " + oBinding);
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week2"));
		},
		onPressNext: function () {
			var oBinding = this.byId("myList").getBinding("items");
		//	MessageToast.show("oBinding " + oBinding);
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "Week2"));
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
