/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ["js/util/util.js", "js/cart.js", "js/promocode.js", "js/discount.js", "js/estimatedtotal.js", "js/editcart.js", "js/app.js"],
                dest: "build/index.js"
            }
        } 
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);

};