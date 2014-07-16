'use strict';

goog.provide('my.upload_proposition.Ctrl');

/**
 * UploadProposition controller.
 *
 * @param {!angular-growl.growl} growl
 * @param {!my.app.locale} locale
 * @param {!my.upload_proposition.Service} UploadProposition
 * @param {!my.app.lsAppConfig} lsAppConfig
 * @constructor
 * @ngInject
 * @export
 */
my.upload_proposition.Ctrl = function(growl, locale, UploadProposition, lsAppConfig) {

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
  var growl = this.growl_;
  var UploadProposition = this.UploadProposition_;
  var form = this.form;

  UploadProposition.validateCaptcha().then(function(valid) {
    if (valid) {
      UploadProposition.create(form);

    } else {
      growl.addErrorMessage('VALIDATION_ERROR.INVALID_CAPTCHA');
      console.error('Captcha error');
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
