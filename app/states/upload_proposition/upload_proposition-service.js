'use strict';

goog.provide('my.upload_proposition.Service');

/**
 * UploadProposition service.
 *
 * @constructor
 * @ngInject
 */
my.upload_proposition.Service = function($http, $log, lsAppConfig) {
  /**
   * @type {!angular.http}
   */
  this.$http_ = $http;

  /**
   * @type {!angular.log}
   */
  this.$log_ = $log;

  /**
   * @type {!my.app.lsAppConfig}
   */
  this.lsAppConfig_ = lsAppConfig;

  /**
   * @type {String}
   */
  this.apiUrl_ = 'propositions';
};

/**
 * Create an upload proposition
 */
my.upload_proposition.Service.prototype.create = function(form) {
  var $http = this.$http_;
  var $log = this.$log_;
  var lsAppConfig = this.lsAppConfig_;
  var apiUrl = this.apiUrl_;

  return $http.post([lsAppConfig.backendURL].join('/'), form).
    error(function(data, status) {
      $log.error(data);
      $log.error(status);
    });
};
