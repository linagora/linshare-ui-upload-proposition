'use strict';

goog.provide('my.upload_proposition.Service');

/**
 * UploadProposition service.
 *
 * @param {!angular-recaptcha.vcRecaptchaService} vcRecaptchaService
 * @param {!angular.http} $http
 * @param {!angular.log} $log
 * @param {!my.app.lsAppConfig} lsAppConfig
 * @constructor
 * @ngInject
 */
my.upload_proposition.Service = function(vcRecaptchaService, $http, $log, lsAppConfig) {

  /**
   * @type {!angular-recaptcha.vcRecaptchaService}
   */
  this.vcRecaptchaService_ = vcRecaptchaService;

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

};

/**
 * Create an upload proposition
 */
my.upload_proposition.Service.prototype.create = function(form) {
  var $http = this.$http_;
  var $log = this.$log_;
  var vcRecaptchaService = this.vcRecaptchaService_;
  var lsAppConfig = this.lsAppConfig_;

  var captcha = vcRecaptchaService.data();
  form.captcha_response = captcha.response;
  form.captcha_challenge = captcha.challenge;

  return $http.post([lsAppConfig.backendURL].join('/'), form).
    error(function(data, status) {
      $log.error(data);
      $log.error(status);
      if (status === 400 && data.code === 1000) {
        vcRecaptchaService.reload();
      }
    });
};
