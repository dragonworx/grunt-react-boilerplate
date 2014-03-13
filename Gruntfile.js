module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            options: {
				// use grunt-react to transform JSX content on the fly when building
                transform: [require('grunt-react').browserify],
				// create source maps
                debug: true
            },
            app: {
				// main entry point for application
                src: './js/src/main.js',
				// destination output file for build
                dest: './js/build/main.js'
            }
        },
        watch: {
            files: ['./js/src/*'],
            tasks: ['build']
        },
        connect: {
            server: {
                options: {
                    port: 3000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build', 'connect:server', 'watch']);
    grunt.registerTask('build', ['browserify:app']);
    grunt.registerTask('serve', ['connect:server']);
};