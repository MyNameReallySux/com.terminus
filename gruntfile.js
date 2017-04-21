module.exports = function(grunt) {
    grunt.initConfig ({
        sass: {
            dist: {
                files: 
                {
                    'build/app.generated.css' : 'sass/app.sass'
                }
            }
        }, 
        cssbeautifier : {
            files : ["public/**/*.css"],
            options : {
                indent: '    ',
                openbrace: 'end-of-line',
                autosemicolon: true
            }
        },
        concat: {
            vendorjs: {
                src: ['node_modules/jquery/dist/jquery.js'],
                dest: 'build/vendors.bundle.js',
            },
            copycss: {
                src: ['build/**/*.css'],
                dest: 'public/css/app.css',
            },
            copyjs: {
                src: ['build/**/*.js'],
                dest: 'public/js/app.js',
            }
        },
        watch: {
            source: {
                files: ['sass/**/*.scss', 'routes/**/*.handlebars', 'javascript/**/*.js'],
                tasks: ['sass', 'cssbeautifier', 'concat'],
                options: {
                    livereload: false, // needed to run LiveReload
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'cssbeautifier', 'concat']);
};