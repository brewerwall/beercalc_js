module.exports = function(grunt) {

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      src: {
        files: ['src/beercalc.js'],
        tasks: ['jshint', 'uglify:build'],
      }
    },
    jshint: {
      all: ['src/*.js']
    },
    uglify: {
      build: {
        files: {
          'src/beercalc.min.js': ['src/beercalc.js']
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jshint', 'compass', 'cssmin', 'concat']);

};
