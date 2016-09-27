# bootstrap-nav
_Generate bootstrap nav's from javascript objects._

[![Build Status](https://drone.io/github.com/mvhenten/bootstrap-nav/status.png)](https://drone.io/github.com/mvhenten/bootstrap-nav/latest)

Because typing HTML is harsh. And setting the active link to `class="active"` manually is quite
onerous, here's a module that will generate the right html for you.

### Install

    npm install bootstrap-nav

### Example

For more elaborate examples, take a look at the file [scripts/generate-example.js](scripts/generate-example.js),
and it's output in the [example dir](example/index.html).

The following:

```javascript
    var Nav = require('bootstrap-nav');

    var menu = Nav.build({
        class: ['nav-tabs'],
        children: [
            {
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            },
            {
                title: 'Link 2',
                link: '/link2',
                class: 'active'
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
            },
            {
                title: 'Link 3',
                link: '/link3',
            },
        ]
    });

    nav.render('http://example.com/link3');
```

Will render this html:

```html
    <ul class="nav nav-tabs">
        <li class="disabled">
            <a href="/link1">Link 1</a>
        </li>
        <li class="active">
            <a href="/link2">Link 2</a>
        </li>
        <li>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown Title
                <span class="caret"/>
            </a>
            <ul class="nav dropdown-menu">
                <li class="disabled">
                    <a href="/dropdown/child/1">Dropdown Child 1</a>
                </li>
                <li>
                    <a href="/dropdown/child/2">Dropdown Child 2</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="/link3">Link 3</a>
        </li>
    </ul>
```

### Methods

#### build

Creates a "nav" object that you can use to render the HTML.
The nav object has one single method called "render". If you pass in the current url, it
will add a class `active` to the appropriate link items in your nav.

```javascript
    var Nav = require('boostrap-nav');

    var nav = Nav.build({
        class: ['nav-tabs'],
        children: [
            {
                title: 'Link 1',
                link: '/link1',
                class: 'disabled'
            },
            {
                title: 'Link 2',
                link: '/link2',
                class: 'active'
            }
        ]
    });

    // later, put this into your template:
    var html = nav.render(req.originalUrl)
```

### Supported navs, custom classes, custom attributes

You may add custom classes to the `class` key. Additional attributes can just be specified
on the object itself. Attributes values may be arrays, these will be joined by a single space.

All attributes and content will be properly escaped.

### Contributing

See [CONTRIBUTE.md](CONTRIBUTE.md)

### License

MIT
