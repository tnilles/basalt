module.exports = function (grunt) {

    grunt.initConfig({
        nodewebkit: {
            options: {
                platforms: ['win', 'osx', 'linux'],
                buildDir: './build',
                version: '0.12.1'
            },
            src: [
                'index.html',
                'package.json',
                './components/**/*',
                './css/**/*',
                './images/**/*',
                './js/**/*',
                './node_module/**/*'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('build', ['nodewebkit']);

};