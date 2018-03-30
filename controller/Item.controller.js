/* global sap $ Cookies */
'use strict';

sap.ui.define([
  'sap/ui/core/mvc/Controller',
], function(Controller) {
  return Controller.extend('tms.basic.controller.Item', {
    onInit: function() {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this).getRoute('item').attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function(oEvent) {
      var oArgs = oEvent.getParameter('arguments');

      var oItemModel = this.getOwnerComponent().getModel('Item');
      oItemModel.loadData(
        $.sap.formatMessage(
          '{0}Items/{1}', [
            this.getOwnerComponent()
              .getManifestEntry('/sap.app/dataSources/api/uri'),
            oArgs.itemId,
          ]
        ),
        '', true, 'GET', false, true,
        {'Authorization': Cookies.getJSON('AccessToken').id}
      );
    },
  });
});
