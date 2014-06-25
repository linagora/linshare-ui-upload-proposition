'use strict';

goog.provide('my.upload_request.Ctrl');

/**
 * UploadRequest controller.
 *
 * @param {!angular.$http} $http The angular http service
 * @param {!my.app.lsAppConfig} lsAppConfig The linshare configuration
 * @constructor
 * @ngInject
 * @export
 */
my.upload_request.Ctrl = function($http, lsAppConfig) {

  /**
   * @type {!angular.http}
   */
  this.http_ = $http;

  /**
   * @type {!my.app.lsAppConfig}
   */
  this.lsAppConfig_ = lsAppConfig;

  /**
   * @type {Object}
   * @expose
   */
  this.form = {};
};

/**
 * Submit the form
 *
 * @export
 */
my.upload_request.Ctrl.prototype.submit = function() {
  var http = this.http_;
  var lsAppConfig = this.lsAppConfig_;
  var form = this.form;

  console.debug('SUBMIT');
  http.post(lsAppConfig.backendURL + '/upload_request', form);
};

/**
 * Reset the form
 *
 * @export
 */
my.upload_request.Ctrl.prototype.reset = function() {
  var form = this.form;

  console.debug('RESET');
  form = {};
};
