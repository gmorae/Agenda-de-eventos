    var gallery = document.querySelector('#gallery');
    var getVal = function(elem, style) {
        return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
    };
    var getHeight = function(item) {
        return item.querySelector('.gal_content').getBoundingClientRect().height;
    };
    var resizeAll = function() {
        var altura = getVal(gallery, 'gal_grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        gallery.querySelectorAll('.gal_gallery-item').forEach(function(item) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };
    gallery.querySelectorAll('img').forEach(function(item) {
        item.classList.add('byebye');
        if (item.complete) {
            console.log(item.src);
        } else {
            item.addEventListener('load', function() {
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-row-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
            });
        }
    });
    window.addEventListener('gal_resize', resizeAll);
    gallery.querySelectorAll('.gal_gallery-item').forEach(function(item) {
        item.addEventListener('gal_click', function() {
            item.classList.toggle('gal_full');
        });
    });