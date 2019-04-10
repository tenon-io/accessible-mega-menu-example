$(function () {
    let menuParents = $('nav > ul > li > a');
    let submenus = $('nav ul ul');

    /**
     * Handles Shift+Tab events and opens previous submenu if available
     */
    menuParents.on('keydown', function (e) {
        if (
            e.shiftKey &&
            ((e.key && e.key === 'Tab') || (e.keyCode && e.keyCode === 9))
        ) {
            e.preventDefault();

            let self = $(this);

            let subMenu = self.next('ul');
            let prevMenu = self.closest('li').prev('li');
            let prevSubMenu = prevMenu.find('ul');

            if (subMenu.length) {
                subMenu.hide();
            }

            if (prevSubMenu.length) {
                prevSubMenu.show();
                prevSubMenu
                .find('a[href]')
                .last()
                .trigger('focus');
            } else {
                prevMenu.find('a[href]').trigger('focus');
            }
        }
    });

    /**
     * Handle forward focus keyboard events
     */
    menuParents.on('focus', function () {
        submenus.hide();

        let subMenu = $(this).next('ul');

        if (subMenu.length) {
            subMenu.show();

            let subMenuLinks = subMenu.find('a[href]');

            let keyDownHandler = function (e) {
                if (
                    !e.shiftKey &&
                    ((e.key && e.key === 'Tab') || (e.keyCode && e.keyCode === 9))
                ) {
                    subMenu.hide();
                }
            };

            subMenuLinks.last().on('keydown', keyDownHandler);
        }
    });

    /**
     * Handles mouse hover events
     */
    menuParents
    .on('mouseenter', function () {
        submenus.hide();

        let subMenu = $(this).next('ul');

        subMenu.show();
    })
    .on('mouseleave', function () {
        let subMenu = $(this).next('ul');

        let mouseEnterHandler = function () {
            $(this).show();
        };

        let mouseLeaveHandler = function () {
            $(this).hide();
        };

        subMenu.on('mouseenter', mouseEnterHandler);
        subMenu.on('mouseleave', mouseLeaveHandler);

        subMenu.hide();
    });
});