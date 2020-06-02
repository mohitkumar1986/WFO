sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller,MessageToast,JSONModel,formatter) {
	"use strict";

	return Controller.extend("WSR.WorkspaceReservation.controller.View1", {
		formatter: formatter,
		onInit: function () {
			var oBinding = this.byId("myList").getBinding("items");
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", "1"));
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
			oBinding.filter(new sap.ui.model.Filter("week", "EQ", prevWeek)); 
		},
		onSelectionChange: function (oEvent) {
			var selectedList = this.getView().byId("myList").getSelectedItems();
			for(var sel in selectedList ){
				var mock = this.getView().getModel("mock");
				var key = selectedList[sel].mProperties.title;
			}
			MessageToast.show("Selection Done");
		}
	});
});