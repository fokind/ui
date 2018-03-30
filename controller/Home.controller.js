/* global sap */
'use strict';

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageToast',
], function(Controller, MessageToast) {
  return Controller.extend('tms.basic.controller.Home', {
    onInit: function() {},

    onPress: function(oEvent) {
      sap.ui.core.UIComponent.getRouterFor(
        this.getView()).navTo(oEvent.getSource().data('target')
      );
    },
  });
});
