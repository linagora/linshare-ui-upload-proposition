'use strict';

goog.provide('my.logo.Directive.factory');

/**
 * A directive that displays the current logo.
 *
 * @constructor
 */
my.logo.Directive = function(lsAppConfig) {
  this.lsAppConfig_ = lsAppConfig;
  this.link = this.link.bind(this);

  /**
   * @type {angular.Scope}
   */
  this.scope;

  /**
   * @type {angular.JQLite}
   */
  this.elem;

  /**
   * @type {angular.Attributes}
   */
  this.attrs;
};

/**
 * Version directive factory.
 *
 * @param {angular.Service} lsAppConfig
 * @return {Object}
 * @ngInject
 */
my.logo.Directive.factory = function(lsAppConfig) {
  var dir = new my.logo.Directive(lsAppConfig);
  return {
    restrict: 'A',
    link: dir.link
  };
};

/**
 * Linking function.
 *
 * @param {angular.Scope} scope
 * @param {angular.JQLite} elem
 * @param {angular.Attributes} attrs
 */
my.logo.Directive.prototype.link = function(scope, elem, attrs) {
  var lsAppConfig = this.lsAppConfig_;
  
  this.scope = scope;
  this.elem = elem;
  this.attrs = attrs;

  if (lsAppConfig.customLogoURL) {
    var tag = '<img src="' + lsAppConfig.customLogoURL + '">';
    this.elem.append(tag);
  }
};
