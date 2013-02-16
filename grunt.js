module.exports = function(grunt) {
  /* =DEPENDENCIES
  --------------------------------------------------------------------------- */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-smushit');

  /* =CONFIG
  --------------------------------------------------------------------------- */
  grunt.initConfig({
    server: {
      port: 8888,
      base: '.'
    },
    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:8888/test',
        stdout: true
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: './app/js/main.js',
          out: './app/js/main.min.js',
          include: 'main',
          uglify: {
            toplevel: true,
            ascii_only: true,
            beautify: false,
            max_line_length: 1000
          },
          preserveLicenseComments: false
        }
      }
    },
    less: {
      development: {
        files: {
          './app/css/main.css': './app/css/less/main.less'
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          './app/css/main.min.css': './app/css/less/main.less'
        }
      },
    },
    smushit: {
      path: {
        src: './app/images/'
      }
    },
    watch: {
      less: {
        files: './app/css/less/**/*',
        tasks: ['less']
      },
      test: {
        files: './test/**/*',
        tasks: ['exec:jasmine']
      }
    }
  });

  /* =TASKS
  --------------------------------------------------------------------------- */
  grunt.registerTask('default', 'less:development');
  grunt.registerTask('test', 'server exec:jasmine');
  grunt.registerTask('listen', 'server watch');
  grunt.registerTask('build', 'server exec:jasmine requirejs less:production smushit');
};