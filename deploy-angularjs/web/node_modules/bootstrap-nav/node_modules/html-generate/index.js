'use strict';

var encode = require('entities').encode,
    NO_ATTRS = ['text', 'html', 'tagName', 'children'],
    INDENT = '    ';

function toHTML(tag, content, attributes) {
    tag = tag || 'div';

    if (attributes.length) attributes = ' ' + attributes.join(' ');

    if (!content) return '<' + tag + attributes + '/>';
    return '<' + tag + attributes + '>' + content + '</' + tag + '>';
}

function indent(str, indentation) {
    if (!indentation) return str;
    return str.replace(/^(.+)$/gm, indentation + '$1');
}

var HTML = {
    element: function(def, indentation) {
        var attr = null,
            children = [],
            attrs = [];

        if (typeof def !== 'object') return;

        if (def.attributes && typeof def.attributes === 'object') {
            for (var name in def.attributes) {
                attr = def.attributes[name];

                if (attr instanceof Array) attr = attr.join(' ');
                attrs.push(name + '="' + encode(attr) + '"');
            }
        }

        if (def.children && def.children instanceof Array) {
            for (var i = 0; i < def.children.length; i++) {
                children.push(HTML.element(def.children[i], INDENT));
            }

            def.html = '\n' + children.join('\n') + '\n';
        }

        return indent(toHTML(def.tagName,
            encode(def.text || '') + (def.html || ''), attrs), indentation);
    },

    tag: function(tagName, text, def) {
        var attrs = {},
            element = {
                tagName: tagName,
                text: text
            };

        if (def && typeof def === 'object') {
            for (var name in def) {
                if (NO_ATTRS.indexOf(name) !== -1) {
                    element[name] = def[name];
                    continue;
                }

                attrs[name] = def[name];
            }
        }

        element.attributes = attrs;
        return HTML.element(element);
    }
};

module.exports = HTML;
