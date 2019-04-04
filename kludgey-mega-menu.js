$(document).ready(function () {

    let menuParents = $('nav ul li a');

    /**
     * Handle the keyboard accessibility side of things
     */
    menuParents.focus(function () {
        let subMenu = $(this).next('ul');

        if (subMenu.length > 0) {
            subMenu.show();

            let subMenuLinks = subMenu.find('a[href]');

            subMenuLinks.last().blur(function () {
                subMenu.hide();
            });

        }
    });

    /**
     *
     * Handle hover
     */
    menuParents.hover(function () {
        let subMenu = $(this).next('ul');

        subMenu.show();

    }, function () {
        let subMenu = $(this).next('ul');

        subMenu.hide();
    });


});