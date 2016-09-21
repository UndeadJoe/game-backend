'use strict';

var math = require('mathjs');

exports.Map = function(){
    this.path = [];
};

exports.Map.prototype = {

    create: function () {
        console.log('Creating New Map...');
        this.generate();
        console.log('Done Creating Map!');
    },

    generate: function() {
        this.path = [ { x: 0, y: 240 },
            { x: 228, y: 240 },
            { x: 456, y: 240 },
            { x: 684, y: 240 },
            { x: 752, y: 240 },
            { x: 1000, y: 240 } ];

        for (var i = 0; i < this.path.length; i++)
        {
            this.path[i].y = math.round( math.random(32, 900) );
        }
    },

    getMap: function () {
        return this.path;
    }

};