'use strict';

goog.provide('my.upload_proposition.Ctrl');

/**
 * UploadProposition controller.
 *
 * @param {!angular-ui-router.$state} $state
 * @param {!angular-growl.growl} growl
 * @param {!my.app.locale} locale
 * @param {!my.upload_proposition.Service} UploadProposition
 * @param {!my.app.lsAppConfig} lsAppConfig
 * @constructor
 * @ngInject
 * @export
 */
my.upload_proposition.Ctrl = function($state, growl, locale, UploadProposition, lsAppConfig) {

  /**
   * @type {!angular-ui-router.$state}
   */
  this.$state_ = $state;

  /**
   * @type {!angular-growl.growl}
   */
  this.growl_ = growl;

  /**
   * @type {!my.app.locale}
   */
  this.locale_ = locale;

  /**
   * @type {!my.upload_proposition.UploadProposition}
   */
  this.UploadProposition_ = UploadProposition;

  /**
   * @type {Object}
   * @expose
   */
  this.form = {};

  /**
   * @type {Boolean}
   * @expose
   */
  this.confirmed = false;

  /**
   * @type {String}
   * @expose
   */
  this.recaptchaPublicKey = lsAppConfig.recaptchaPublicKey;
};

/**
 * Submit the form
 *
 * @export
 */
my.upload_proposition.Ctrl.prototype.submit = function() {
  var $state = this.$state_;
  var growl = this.growl_;
  var UploadProposition = this.UploadProposition_;
  var form = this.form;
  var self = this;

  UploadProposition.create(form)
    .success(function () {
      self.confirmed = true;
    })
    .error(function (data, status) {
      if (status === 400 && data.code === 1000) {
        growl.addErrorMessage('VALIDATION_ERROR.INVALID_CAPTCHA');
      }
      if (status === 503) {
        growl.addErrorMessage('VALIDATION_ERROR.SERVER_ERROR');
      }
    });
};

/**
 * Reset the form
 *
 * @export
 */
my.upload_proposition.Ctrl.prototype.reset = function() {
  var form = this.form;

  form = {};
};

/**
 * Change the language of the form
 *
 * @param {String} key The language (eg. 'en')
 * @export
 */
my.upload_proposition.Ctrl.prototype.changeLanguage = function(key) {
  var locale = this.locale_;

  locale.changeLanguage(key);
};

/**
 * Get the current language of the form
 *
 * @export
 */
my.upload_proposition.Ctrl.prototype.getLanguage = function() {
  var locale = this.locale_;

  return locale.getLanguage();
};
