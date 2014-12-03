'use strict';

goog.require('my.upload_proposition.module');
goog.require('my.logo.Directive.factory');
goog.require('my.locale.Service');

/**
 * Main app.
 */
angular.module('app', [
  'ngLocale',
  'ngSanitize',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'chieffancypants.loadingBar',
  'angular-growl',
  'vcRecaptcha',
  'validation',
  'validation.rule',
  my.upload_proposition.module.name
])
.config(config)
.directive('logo', my.logo.Directive.factory)
.service('locale', my.locale.Service);

/**
 * Configuration function.
 *
 * @param {ng.$logProvider} $logProvider
 * @param {ui.router.$stateProvider} $stateProvider
 * @param {ui.router.$urlRouterProvider} $urlRouterProvider
 * @param {validation.$validationProvider} $validationProvider
 * @param {pascalprecht.translate.$translateProvider} $translateProvider
 * @param {tmh.dynamicLocale.tmhDynamicLocaleProvider} tmhDynamicLocaleProvider
 * @param {chieffancypants.loadingBar.cfpLoadingBarProvider} cfpLoadingBarProvider
 * @param {app.lsAppConfig} lsAppConfig
 * @ngInject
 */
function config($logProvider, $stateProvider, $urlRouterProvider, $translateProvider, $validationProvider, tmhDynamicLocaleProvider, cfpLoadingBarProvider, lsAppConfig) {

  var debug = lsAppConfig.debug;
  $logProvider.debugEnabled(debug);

  $stateProvider.state('404', {
    url: '/404',
    templateUrl: 'states/404/404.html'
  });
  $urlRouterProvider.otherwise('/upload_proposition');

  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage(lsAppConfig.defaultLocale);
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useCookieStorage();

  $validationProvider.showSuccessMessage = false;

  tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular/angular-locale_{{locale}}.js');

  cfpLoadingBarProvider.includeSpinner = false;

}
