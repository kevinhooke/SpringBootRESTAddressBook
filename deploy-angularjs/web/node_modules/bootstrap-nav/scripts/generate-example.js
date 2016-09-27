'use strict';

var swig = require('swig'),
    path = require('path'),
    Nav = require('../index'),
    _ = require('lodash');
var navs = [],
    examples = [{
        title: 'Nav tabs',
        nav: {
            class: ['nav-tabs'],
            children: [{
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            }, {
                title: 'Link 2',
                link: '/link2',
                class: 'active'
            }, {
                type: 'dropdown',
                title: 'Dropdown Title',
                children: [{
                    title: 'Dropdown Child 1',
                    link: '/dropdown/child/1',
                    class: 'disabled'
                }, {
                    title: 'Dropdown Child 2',
                    link: '/dropdown/child/2',
                }]
            }, {
                title: 'Link 3',
                link: '/link3',
            }, ]
        }
    }, {
        title: 'Nav pills',
        nav: {
            class: ['nav-pills'],
            children: [{
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            }, {
                title: 'Link 2',
                link: '/link2',
                class: 'active'
            }, {
                title: 'Link 3',
                link: '/link3',
            }, ]
        }
    }, {
        title: 'Nav pills stacked with children',
        nav: {
            class: ['nav-pills', 'nav-stacked'],
            children: [{
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            }, {
                title: 'Link 2',
                link: '/link2',
                class: 'active',
                children: [{
                    title: 'Child 1',
                    link: '/child/1',
                }, {
                    title: 'Child 2',
                    link: '/child/2',
                    children: [{
                        title: 'Child child 1',
                        link: '/child/child/1',
                    }]
                }]
            }, {
                title: 'Link 3',
                link: '/link3',
            }, ]
        }
    }];

_.each(examples, function(sample) {
    var nav = Nav.build(sample.nav);
    navs.push({
        title: sample.title,
        html: nav.render()
    });
});

var template = swig.compileFile(path.resolve(__dirname + '/bootstrap.html'));
var output = template({
    examples: navs
});

console.log(output);
