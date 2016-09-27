'use strict';

var Nav = require('../index'),
    fs = require('fs'),
    trim = require('trim'),
    assert = require('assert-diff');

suite(__filename, function() {

    var nav = Nav.build({
        class: ['nav-pills', 'nav-stacked'],
        children: [
            {
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            },
            {
                title: 'Link 2',
                link: '/link2',
            },
            {
                title: 'Parent 1',
                link: '/parent-1',
                children: [
                    {
                        title: 'Child 1',
                        link: '/child/1',
                    },
                    {
                        title: 'Child 2',
                        link: '/child/2',
                        children: [
                            {
                                title: 'Child child 1',
                                link: '/child/child/1',
                            }
                        ]
                    }
                ]
            },
            {
                type: 'dropdown',
                title: 'Dropdown Title',
                children: [
                    {
                        title: 'Dropdown Child 1',
                        link: '/dropdown/child/1',
                        class: 'disabled'
                    },
                    {
                        title: 'Dropdown Child 2',
                        link: '/dropdown/child/2',
                    }
                ]
            }
        ]
    });

    function _expect(filename) {
        return trim(fs.readFileSync(__dirname + '/expect/' + filename).toString());
    }


    test('basic rendering', function() {
        var html = nav.render();
        assert.deepEqual(html, _expect('basic-render.html'));
    });

    test('active child rendering', function() {
        var html = nav.render('/child/2');
        assert.deepEqual(html, _expect('child-2.html'));
    });

    test('active sub child rendering', function() {
        var html = nav.render('/child/child/1');
        assert.deepEqual(html, _expect('child-child-1.html'));
    });

    test('active sub child rendering dropdown', function() {
        var html = nav.render('/dropdown/child/2');
        assert.deepEqual(html, _expect('dropdown-child-2.html'));
    });

});
