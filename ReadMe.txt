Context
1. File Structure for WAS-FRONTEND-ADMIN
2. Run App
3. Notes
=====================

File Structure for WAS-FRONTEND-ADMIN
=====================================

app/
---- shared/									// acts as reusable components or partials of our side, any new shared component are subject to approve before commit
-------- sidebar/
------------ sidebarDirective.js
------------ sidebarView.html
-------- header/
------------ headerDirective.js
------------ headerView.html
-------- footer/
------------ footerDirective.js
------------ footerView.html
-------- notification/							// pending action etc
------------ notificationDirective.js
------------ notificationView.html
-------- alert/									// prompt for reminder before proceeding to next page, etc
------------ alertDirective.js
------------ alertView.html
-------- template.html							// server as overal website template
---- components/								// divide by module then function basis. each folder should consist controller and view, service are subjective by usage
-------- dashboard/
------------ dashboardController.js
------------ dashboardService.js
------------ dashboardView.html
-------- login/
------------ loginController.js
------------ loginService.js
------------ loginView.html
-------- user-management/
------------ userMgmtController.js
------------ userMgmtService.js
------------ userMgmtView.html
-------- special-collection/
------------ specialCollectionController.js
------------ specialCollectionService.js
------------ specialCollectionView.html
-------- nomination/
------------ nominationController.js
------------ nominationService.js
------------ nominationView.html
------------ nominationValidator.js 			// subject to have for checking mandatory field
-------- announcement/
------------ announcementController.js
------------ announcementService.js
------------ announcementView.html
-------- reports/
------------ reportController.js
------------ reportService.js
------------ reportView.html
---- app.config.js 								// hanlde different environment constant
---- app.constant.js 							// auto generate file by gulpfile.js, will populate constant based on app.config.js
---- app.module.js								// handle the setup of your app, load in AngularJS dependencies and so on
---- app.routes.js 								// handle all the routes and the route configuration
---- config.json								// shall not commit, auto generated file by gulpfile.js
assets/											// contain all the assets needed for your app that are not related your AngularJS code
---- img/										// Images and icons
-------- shared/
-------- special-collection/
---- css/										// All styles and style related files (SCSS or LESS files)
-------- shared/
---- js/										// JavaScript files written for your app that are not for angular
---- libs/										// Third-party libraries such as jQuery, Moment, Underscore, etc.
.env 											// configure share constant across the webapplication. shall not deploy to any environment
gulpfile.js 									// shall handle uglify, env constant, and browser sync
bower.json										// handle packaging
index.html
package.json									// handle packaging

2. Run App
===========
a. open command prompt
b. change directory to the project is located
c. run 'npm install' then run 'gulp'


3. Notes
============
Please constantly update the file structure is there is any changes
