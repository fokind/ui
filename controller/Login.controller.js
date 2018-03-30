/* global sap $ Cookies window */
'use strict';

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageToast',
], function(Controller, MessageToast) {
  return Controller.extend('tms.basic.controller.Login', {
    onInit: function() {
      this.getView().setModel(new sap.ui.model.json.JSONModel());
    },

    onPressLogin: function() {
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
        MessageToast.show(oResourceBundle.getText('authSuccess'));
        sap.ui.core.UIComponent.getRouterFor(oView).navTo('home');
      })
      .fail(function(data) {
        Cookies.remove('AccessToken');
        MessageToast.show(oResourceBundle.getText('authError'));
      });
    },

    onPressLogout: function() {
      var oView = this.getView();
      var oModel = oView.getModel();
      var oResourceBundle = oView.getModel('i18n').getResourceBundle();
      var oAccessToken = Cookies.getJSON('AccessToken');

      if (oAccessToken) {
        $.post(
          {
            url: $.sap.formatMessage('{0}Users/logout', this.getOwnerComponent().getManifestEntry('/sap.app/dataSources/api/uri')),
            contentType: 'application/json',
            headers: {'Authorization': oAccessToken.id},
          })
        .done(function(data, status, xhr) {
          MessageToast.show(oResourceBundle.getText('authLogoutSuccess'));
        })
        .fail(function(data) {
          MessageToast.show(oResourceBundle.getText('authLogoutSuccess'));
        });
        Cookies.remove('AccessToken');
      }
    },
  });
});
