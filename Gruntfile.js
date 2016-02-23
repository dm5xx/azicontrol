module.exports = function(grunt) {

    // will autoload grunt plugins
    require('load-grunt-tasks')(grunt);

    // will show stats when tasks finish
    require('time-grunt')(grunt);


    grunt.initConfig({

        // will start a php server
        // and open the browser
        php: {
            dist: {
                options: {
                    port: 5000,
                    keepalive: true,
                    open: true
                },
            },
        },

        // will parse scss to css
        sass: {
            main: {
                options: {
                    outputStyle: 'expanded',
                    sourceComments: true,
                    sourceMap: 'none',
                },
                files: {
                    'assets/css/main.css':     // to
                    'assets/scss/main.scss'    // from
                },
            },
        },

        // will add css vendor prefixes
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            main: {
                src: 'assets/css/*.css'
            }
        },

        // will watch files and trigger
        // tasks or livereload
        watch: {
            styles: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['internal_css'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            markup: {
                files: ['**/*.html'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            scripts: {
                files: ['assets/js/**/*.js'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
        },

    });


    // just for internal use
    // will compile scss
    grunt.registerTask('internal_css', [
        'sass',
        'postcss'
    ]);

    // start php server
    grunt.registerTask('server', [
        'php'
    ]);

    // compile scss and watch file changes
    grunt.registerTask('default', [
        'internal_css',
        'watch'
    ]);

};
