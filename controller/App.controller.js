/* global sap $ Cookies */
'use strict';

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageToast',
], function(Controller, JSONModel, MessageToast) {
  return Controller.extend('tms.basic.controller.App', {
    onInit: function() {
      this.getView().setModel(new JSONModel());
    },

    onPress: function() {
      var oView = this.getView();
      var oModel = oView.getModel();
      var oResourceBundle = oView.getModel('i18n').getResourceBundle();

      $.post(
        {
          url: $.sap.formatMessage('{0}Users/login', this.getOwnerComponent().getManifestEntry('/sap.app/dataSources/api/uri')),
          data: $.sap.formatMessage('\'{\'"username":"{0}","password":"{1}"\'}\'', [oModel.getProperty('/username'), oModel.getProperty('/password')]),
          contentType: 'application/json',
        })
      .done(function(data, status, xhr) {
        Cookies.set('AccessToken', data);
        oView.getModel('AccessToken').setData(data);
        
        MessageToast.show(oResourceBundle.getText('authSuccess'));
      })
      .fail(function(data) {
        MessageToast.show(oResourceBundle.getText('authError'));
      });
    },
  });
});
