# html-generate

#### _Generate HTML from a plain object definition_

[![Build Status](https://drone.io/github.com/mvhenten/html-generate/status.png)](https://drone.io/github.com/mvhenten/html-generate/latest)

These are simple helper functions to generate html from a plain javascript object render tree.

Rendering a complex html widget sometimes involves logic that is too much to handle inside a
template. Once the logic is solved, outputing the html by concatinating some strings may end up messy.

These functions are intended as low-level workhorses, so I've tried to keep the code as fast
as possible by using simple for loops and little functions.

### Installation

    npm install html-generate

### Example:

```javascript
    var HTML = require('html-generate');

    var html = HTML.element({
        tagName: 'p',
        text: 'Lorem ipsum sit amet...',
        attributes: {
            foo: '"bar"'
        },
        children: [{
            text: 'consectetur adipisicing elit'
        }]
    });

    // <p foo="&quot;bar&quot;">Lorem ipsum sit amet...
    //   <div>consectetur adipisicing elit</div>
    // </p>
```

### Methods

#### element

Low level interface, takes an object of the following form:

* tagName - The name of the tag for this html element
* text - Text content. Will be entity encoded.
* html - HTML content. Will not be entitiy encoded.
* attributes - An object of key-value attribute pairs. values will be entity encoded.
* children - An array of objects defining children for this html element

E.g. the following:

```javascript
    element({
        tagName: 'ul',
        atributes: {
            class: 'nav'
        },
        children: [
            {
                tagName: 'li',
                text: 'Do you want to go '
                attributes: {
                    class: 'active'
                },
                html: '<a href="/">home?</a>'
            }
        ]
    });
```

produces:

```html
    <ul>
        <li class="active">Do you want to go <a href="/">home?</a></li>
    </ul>
```

#### tag

Alternative interface, provides a little coating around `element`:

```javascript
    tag('p', 'You can read all about it ', {
        html: tag('a', 'here', { href: '/about' })
    });

    // <p>You can read all about it <a href="/about">here</a></p>
```


