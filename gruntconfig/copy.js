'use strict';

var config = require('./config');

var copy = {
  leaflet_custom: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'node_modules/leaflet/dist',
      dest: 'node_modules/leaflet/dist/',
      src: 'leaflet-custom-src.js',
      rename: function (dest, src) {
        return dest + src.replace('-custom-src', '-src');
      }
    },
    {
      expand: true,
      dot: true,
      cwd: 'node_modules/leaflet/dist',
      dest: 'node_modules/leaflet/dist/',
      src: 'leaflet-custom.js',
      rename: function (dest, src) {
        return dest + src.replace('-custom', '');
      }
    }]
  },
  app: {
    expand: true,
    cwd: [config.src + '/htdocs'],
    dest: [config.dist + '/htdocs'],
    src: [
      'img/**/*.{png,gif,jpg,jpeg}',
      '**/*.php'
    ]
  },
  lib: {
    expand: true,
    cwd: config.src + '/lib',
    dest: config.dist + '/lib',
    src: [
      '**/*'
    ],
    options: {
      mode: true
    }
  },
  jakefile: {
    expand: true,
    dot: true,
    cwd: 'node_modules/leaflet',
    dest: 'node_modules/leaflet/',
    src: 'Jakefile.js',
    rename: function (dest, src) {
      return dest + src.replace('.js', '_custom.js');
    }
  }
};

module.exports = copy;