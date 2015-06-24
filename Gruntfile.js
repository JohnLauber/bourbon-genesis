'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            scripts: {
                files: ['assets/styles/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['assets/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            livereload: {
                options: { livereload: true },
                files: ['style.css', 'assets/js/*.js', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // bourbon and scss
        sass: {
            dev: {
                options: {
                    loadPath: require('node-bourbon').includePaths,
                    style: 'expanded'
                },
                files: {
                  'style.css': 'assets/styles/**/style.{scss,sass}'
                }
              },
        },

        postcss: {
            options: {
              map: false,
              processors: [
                require('autoprefixer-core')({browsers: 'last 3 versions, ie 9'}),
                require('postcss-flexboxfixer'),
                require('postcss-gradientfixer'),
                require('csswring')
              ]
            },
            dist: {
              src: 'style.css'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'assets/js/source/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'assets/js/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/plugins.min.js': [
                        'assets/js/source/plugins.js',
                        // 'assets/js/vendor/yourplugin/yourplugin.js',
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'assets/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'assets/js/main.min.js': [
                        'assets/js/source/main.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/'
                }]
            }
        },

        // deploy via rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            },
            production: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : 'style.css'
                },
                options: {
                    proxy: "local.test.dev", // < change to local address for site
                    ghostmode: false,
                    port: 8080,
                    tunnel: "testing",
                    watchTask: true // < VERY important
                }
            }
        }

    });

    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    grunt.loadNpmTasks('grunt-browser-sync');

    // register task
    grunt.registerTask('default', ['browserSync', 'sass', 'uglify', 'imagemin', 'postcss','watch']);


};
