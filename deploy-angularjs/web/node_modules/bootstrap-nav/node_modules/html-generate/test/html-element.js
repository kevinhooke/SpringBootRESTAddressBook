'use strict';

var assert = require('assert'),
    Faker = require('Faker'),
    HTML = require('../index');

suite(__filename, function() {

    test('.element render simple element', function() {
        var lipsum = Faker.Lorem.sentence();
        var expected = ['<p foo="&quot;bar&quot;">' +
                        lipsum, '    <div>' + lipsum + '</div>', '</p>'].join('\n');

        var html = HTML.element({
            tagName: 'p',
            text: lipsum,
            attributes: {
                foo: '"bar"'
            },
            children: [{
                text: lipsum
            }]
        });

        assert.equal(html, expected);
        console.log(html);
    });

    test('.tag render simple element', function() {
        var lipsum = Faker.Lorem.sentence();
        var expected = ['<p foo="&quot;bar&quot;">' +
                        lipsum, '    <div>' + lipsum + '</div>', '</p>'].join('\n');

        var html = HTML.tag('p', lipsum, {
            foo: '"bar"',
            children: [{
                text: lipsum
            }]
        });

        assert.equal(html, expected);
    });

});
