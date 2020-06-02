<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:f="sap.ui.layout.form" xmlns:s="sap.sports.ui.controls" xmlns:core="sap.ui.core"
	controllerName="WSR.WorkspaceReservation.controller.SelectLocation" displayBlock="true">
	<Shell id="shell">
		<App id="app">
			<pages>
				<Page id="page" title="{i18n>title}" titleLevel="H6" tooltip="Web App for Reserving your Seat in Office" showNavButton="true"
					navButtonPress="onNavBack">
					<headerContent>
						<Image src="/webapp/Images/wstr.jpg" width="170px" height="140px" id="image0"/>
					</headerContent>
					<content>
						<f:SimpleForm id="SimpleFormChange354" editable="true" layout="ResponsiveGridLayout" title="Select Location" labelSpanXL="3" labelSpanL="3"
							labelSpanM="3" labelSpanS="12" adjustLabelSpan="false" emptySpanXL="4" emptySpanL="4" emptySpanM="4" emptySpanS="0" columnsXL="1"
							columnsL="1" columnsM="1" singleContainerFullSize="false">
							<f:content>
								<Label text="{i18n>COUNTRY}"/>
								<Select id="country" change="onCountrySelected" items="{ path: 'mock>/locations' }">
									<items>
										<core:Item text="{mock>country}" key="{mock>country}"/>
									</items>
								</Select>
								<Label text="{i18n>CITY}"/>
								<Select id="city" enabled="{/CityEnabled}" change="onCitySelected" items="{ path: 'mock>/locations' }">
									<items>
										<core:Item text="{mock>city}" key="{mock>city}"/>
									</items>
								</Select>
								<Label text="{i18n>BUILDING}"/>
								<Select id="building" enabled="{/BuildingEnabled}" change="onBuildingSelected" items="{ path: 'mock>/locations' }">
									<items>
										<core:Item text="{mock>building}" key="{mock>building}" class="sapUiResponsiveMargin"/>
									</items>
								</Select>
								<Label text="{i18n>FLOOR}"/>
								<Select id="floor" enabled="{/FloorEnabled}" change="onFloorSelected" items="{ path: 'mock>/locations' }">
									<items>
										<core:Item text="{mock>floor}" key="{mock>floor}"/>
									</items>
								</Select>
								<Label text="{i18n>DESK}"/>
								<Select id="desk" enabled="{/DeskEnabled}" change="onDeskSelected" items="{ path: 'mock>/locations' }">
									<items>
										<core:Item text="{mock>desk}" key="{mock>desk}"/>
									</items>
								</Select>
							</f:content>
							<Button text="{i18n>SELECTLOCATION}" class="sapUiResponsiveMargin" width="60%" press="selectLocation"/>
						</f:SimpleForm>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
