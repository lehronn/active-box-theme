module.exports = function(grunt) {
	// Project configuration.
		grunt.initConfig({
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
			htmlmin: {                                     // Task 
                dist: {                                      // Target 
                    options: {                                 // Target options 
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {                                   // Dictionary of files 
                        'dist/index.html': 'dev/html/index.html'     // 'destination': 'source'
                    }
                },
                dev: {                                       // Another target 
                    files: {
                        'dist/index.html': 'dev/html/index.html'
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
				dev: {
					bsFiles: {
						src : [
							'css/*.css',
							'*.html'
							]
					},
					options: {
						watchTask: true,
						server: './dist'
					}
				}
			},
			watch: {
				scripts: {
					files: ['dev/html/*.html','dev/sass/*.sass','dev/scripts/*.js'],
					tasks: ['htmlmin','sass','cssmin','uglify'],
					options: {
						spawn: false,
					},
				}
			}
		});
	grunt.registerTask('default', ['htmlmin']);
	// Load the plugins tasks
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Default task(s).
	grunt.registerTask("default", ["sass", "imagemin", "browserSync", "watch"]);
};
