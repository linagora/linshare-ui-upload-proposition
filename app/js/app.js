'use strict';

goog.require('my.upload_request.module');

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
  my.upload_request.module.name
])
.config(config);

/**
 * Configuration function.
 *
 * @param {ng.$logProvider} $logProvider
 * @param {ui.router.$stateProvider} $stateProvider
 * @param {ui.router.$urlRouterProvider} $urlRouterProvider
 * @param {pascalprecht.translate.$translateProvider} $translateProvider
 * @param {tmh.dynamicLocale.tmhDynamicLocaleProvider} tmhDynamicLocaleProvider
 * @param {chieffancypants.loadingBar.cfpLoadingBarProvider} cfpLoadingBarProvider
 * @param {app.lsAppConfig} lsAppConfig
 * @ngInject
 */
function config($logProvider, $stateProvider, $urlRouterProvider, $translateProvider, tmhDynamicLocaleProvider, cfpLoadingBarProvider, lsAppConfig) {

  var debug = document.cookie.linshareDebug || lsAppConfig.debug;
  $logProvider.debugEnabled(debug);

  $urlRouterProvider.otherwise('/upload_request');

  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useCookieStorage();

  tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular/angular-locale_{{locale}}.js');

  cfpLoadingBarProvider.includeSpinner = false;

}
