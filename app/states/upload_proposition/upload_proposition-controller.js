'use strict';

goog.provide('my.upload_proposition.Ctrl');

/**
 * UploadProposition controller.
 *
 * @param {!my.app.locale} locale
 * @param {!my.upload_proposition.Service} UploadProposition
 * @constructor
 * @ngInject
 * @export
 */
my.upload_proposition.Ctrl = function(locale, UploadProposition) {

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
};

/**
 * Submit the form
 *
 * @export
 */
my.upload_proposition.Ctrl.prototype.submit = function() {
  var UploadProposition = this.UploadProposition_;
  var form = this.form;

  UploadProposition.create(form);
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
