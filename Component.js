/* global sap $ Cookies */
'use strict';

sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/Device',
  'tms/basic/model/models',
  'sap/m/MessageToast',
], function(UIComponent, Device, models, MessageToast) {
  return UIComponent.extend('tms.basic.Component', {
    metadata: {
      manifest: 'json',
    },

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
    init: function() {
			// call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);
      var oResourceBundle = this.getModel('i18n').getResourceBundle();

      // set the device model
      this.setModel(models.createDeviceModel(), 'device');

      // проверка авторизации
      var oAccessToken = Cookies.getJSON('AccessToken');

      if (oAccessToken) {
        $.get({
          url: $.sap.formatMessage('{0}Users/{1}/accessTokens/{2}', [
            this.getMetadata().getManifestEntry('sap.app').dataSources['api'].uri,
            oAccessToken.userId,
            oAccessToken.id,
          ]),
          contentType: 'application/json',
          headers: {'Authorization': oAccessToken.id},
        })
        .done(function(data) {
          MessageToast.show(oResourceBundle.getText('authSuccess'));
        })
        .fail(function(data) {
          Cookies.remove('AccessToken');
          MessageToast.show(oResourceBundle.getText('authError'));
        });
      } else MessageToast.show(oResourceBundle.getText('authRequired'));
    },
  });
});
