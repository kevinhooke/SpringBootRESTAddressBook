var Nav = require('./index');


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

console.log(nav.render('/child/child/1'));
