module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['dev/html/*.html', 'dev/sass/*.sass', 'dev/scripts/*.js'],
        tasks: ['htmlmin', 'sass', 'cssmin', 'uglify', 'browserSync'],
        options: {
          spawn: false,
        },
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dev/sass/style.css': 'dev/sass/style.sass'
        }
      }
    },
    htmlmin: { // Task
      dist: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'dist/index.html': 'dev/html/index.html' // 'destination': 'source'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dev/sass',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/themes/active-box-theme/styles',
          ext: '.min.css'
        }]
      }
    },
    jshint: {
      all: ['dev/scripts/*.js']
    },
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dev/scripts',
          src: '**/*.js',
          dest: 'dist/themes/active-box-theme/scripts'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'dev/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/themes/active-box-theme/images/'
        }]
      }
    },
    browserSync: {
      bsFiles: {
        src: [
          'dist/themes/active-box-theme/styles/*.css',
          'dist/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: './dist'
      }
    }
  });
  grunt.registerTask('default', ['htmlmin']);

  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask("default", ["sass", "imagemin", "jshint", "watch"]);
};
