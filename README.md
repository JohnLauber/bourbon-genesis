# WordPress Genesis Starter Child Theme with Bourbon

Version: 1.1.1

## Contributors:

John Lauber ( [@johnlauber](http://twitter.com/johnlauber) / [littlelauberdesigns.com](http://littlelauberdesigns.com))

## Summary

WordPress Starter Theme for use as Child Theme of the Genesis Framework for building custom themes, using Bourbon/SCSS and Grunt. Tested with WordPress 3.9.2 (and now 4.0) and Genesis 2.1.2. This is a fork of [Matt Banks Starter](https://github.com/mattbanks/WordPress-Starter-Theme) theme that's using Compass/SCSS. 

## Usage

The theme is setup to use [Grunt](http://gruntjs.com/) to compile Bourbon/SCSS, lint, concatenate and minify JavaScript (with source maps), optimize images, and [LiveReload](http://livereload.com/) the browser (with extension), with flexibility to add any additional tasks via the Gruntfile. Alternatively, you can use [CodeKit](http://incident57.com/codekit/) or whatever else you prefer to compile the SCSS and manage the JavaScript.

Rename folder to your theme name, change the `assets/styles/source/style.scss` intro block to your theme information. Open the theme directory in terminal and run `npm install` to pull in all Grunt dependencies. Run `grunt` to execute tasks. Change theme as you will. If you have the LiveReload browser extension, it will reload after any SCSS or JS changes.

- Compile `assets/styles/source/style.scss` to `style.css` 
- Compile `assets/styles/source/editor-style.scss` to `editor-style.css`
- Concatenate and minify plugins in `assets/js/vendor` and `assets/js/source/plugins.js` to `assets/js/plugins.min.js`
- Minify `assets/js/source/main.js` to `assets/js/main.min.js`
- Publish and enjoy the fruits of your labor. 

To concatenate and minify your jQuery plugins, add them to the `assets/js/vendor` directory and add the `js` filename and path to the `Gruntfile` `uglify` task. Previous versions of the starter theme automatically pulled all plugins in the `vendor` directory, but this has changed to allow more granular control and for managing plugins and assets with bower.

In the Grunt file, be sure to change the BrowserSync line "local.testing.dev" to your local web address you want to sync. 

Bourbon gets loaded as a dependency in package.json and gruntfile.js. There may be a better way to do this, but I haven’t found it yet.

### Bower

Supports [bower](https://github.com/bower/bower) to install and manage JavaScript dependencies in the `assets/js/vendor` folder.

### Deployment

The theme includes deployments via [grunt-rsync](https://github.com/jedrichards/grunt-rsync). The Gruntfile includes setups for staging and production - edit your paths and host, then run `grunt rsync:staging` or `grunt rsync:production` to deploy your files via rsync.

### Features

1. Bourbon & SCSS with easy-to-use of mixins ready to go
2. Easy to customize
3. Grunt and LiveReload to make it more gooder
4. Child theme tweaks
5. Utilizes PostCSS for browser backwards compatibility
6. Utilizes BrowserSync for testing across devices

### Suggested Plugins

* [WordPress SEO by Yoast](http://wordpress.org/extend/plugins/wordpress-seo/)
* [Gravity Forms](http://www.gravityforms.com/)

Requires: [bourbon.io](http://bourbon.io/)

### Changelog
#### Version 1.1
* Updated package.json and gruntfile to use new autoprefixer (PostCSS) with flexbox fixer.
* Removed some of the includes from bourbon as they're deprecated.

#### Verson 1.0
* Thanks to Matt for the starter
* Changed the grunt file and main style sheet to use Bourbon mixins
* initial version

### Credits

Without these projects, this WordPress Genesis Starter Child Theme wouldn't be where it is today.

* [Matt Banks Starter](https://github.com/mattbanks/WordPress-Starter-Theme)
* [SASS / SCSS](http://sass-lang.com/)
* [Bourbon](http://bourbon.io)
* [Genesis Framework](http://my.studiopress.com/themes/genesis/)
* [Bill Erickson's Genesis Child Theme](https://github.com/billerickson/BE-Genesis-Child)
* [HTML5 Boilerplate](http://html5boilerplate.com)
* [Grunt](http://gruntjs.com/)
* [Bower](https://github.com/bower/bower)
