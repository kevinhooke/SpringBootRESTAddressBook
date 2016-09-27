'use strict';


var html = require('html-generate'),
    _ = require('lodash'),
    Url = require('url');

function _attrs(def) {
    return _.omit(def, ['link', 'title', 'children', 'type', 'html', 'text']);
}

var Build = {
    tag: function(name, attrs, children) {
        return {
            tagName: name,
            attributes: _attrs(attrs),
            children: children,
        };
    },

    link: function(def) {
        var link = Build.tag('a', _.extend({
            href: def.link || '#'
        }, def), def.children);

        link.text = def.title;
        link.html = def.html;

        return link;
    },

    li: function(def) {
        var children = [Build.link(_.omit(def, ['children', 'class']))];

        if (def.children) {
            children.push(Build.ul(def));
        }

        return Build.tag('li', def, children);
    },

    dropdown: function(def) {
        var dropdown = {
            class: 'dropdown-toggle',
            'data-toggle': 'dropdown',
            children: [Build.tag('span', {
                class: 'caret'
            })]
        },
            children = [Build.link(_.extend(_.omit(def, 'children'), dropdown))];

        if (def.children) {
            children.push(Build.ul({
                children: def.children,
                class: 'dropdown-menu'
            }));
        }

        return {
            tagName: 'li',
            attributes: _attrs(def),
            children: children,
        };
    },

    ul: function(def) {
        var children = _.reduce(def.children, function(children, def) {
            if (def.type === 'dropdown') {
                return children.concat(Build.dropdown(def));
            }

            return children.concat(Build.li(def));
        }, []);

        return Build.tag('ul', {
            class: ['nav'].concat(def.class),
        }, children);
    }
};

function _findActiveNodes(re, tree) {
    _.each(tree, function(node) {
        var active = false;

        if (node.attributes.href) {
            active = re.test(node.attributes.href);
        }

        if (node.children) {
            _findActiveNodes(re, node.children);
            active = active || node.children.active;
        }

        if (active) {
            node.active = tree.active = active;
            node.attributes.class = node.attributes.class || [];
            node.attributes.class = ['active'].concat(node.attributes.class);
        }
    });
}

module.exports = {
    build: function(def) {
        var spec = null;

        return {
            get tree() {
                if (!spec) {
                    spec = Build.ul(def);
                }
                return _.clone(spec, true);
            },
            render: function(href) {
                var path = Url.parse(href || '').pathname,
                    re = new RegExp(path),
                    tree = this.tree;

                _findActiveNodes(re, tree.children);

                return html.element(tree);
            }
        };
    }
};
