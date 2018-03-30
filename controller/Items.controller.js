/* global sap $ Cookies */
'use strict';

sap.ui.define([
  'sap/ui/core/mvc/Controller',
], function(Controller) {
  return Controller.extend('tms.basic.controller.Items', {
    onInit: function() {
      var oItemsModel = this.getOwnerComponent().getModel('Items');
      var oResourceBundle = this.getOwnerComponent()
        .getModel('i18n').getResourceBundle();

      oItemsModel.loadData(
        $.sap.formatMessage(
          '{0}Items',
          this.getOwnerComponent()
            .getManifestEntry('/sap.app/dataSources/api/uri')
        ),
        '', true, 'GET', false, false,
        {'Authorization': Cookies.getJSON('AccessToken').id}
      );
    },

    onPress: function(oEvent) {
      var oBindingContext = oEvent.getSource().getBindingContext('Items');
      var o = oBindingContext.oModel.oData[oBindingContext.getPath().substr(1)];
      sap.m.MessageToast.show(o.id);
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      oRouter.navTo('item', {
        itemId: o.id,
      });
    },

  });
});
