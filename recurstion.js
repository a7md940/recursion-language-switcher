
(async function () {
    // helper functions.
    let $ = function (selector) {
        if (document.querySelectorAll(selector).length > 1)
            return document.querySelectorAll(selector);
        else
            return document.querySelector(selector)
    }

    // Start Dropdown scripts.
    let select = document.getElementById('select');
    let labels = Array.from(document.querySelectorAll('.select--dropdown li label'));
    let options = Array.from(document.querySelectorAll('#select option'));
    let flagLabel = document.querySelector('label.dropdown--button');

    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true);

    labels.forEach((label, i) => {
        label.addEventListener('click', (e) => {
            options.forEach((option, j) => {
                if (i == j) {
                    select.selectedIndex = i;
                    flagLabel.innerHTML = label.textContent + '<span class="caret">▼</span>';
                    select.dispatchEvent(evt);

                }

            })
        });
    });

    // Custom dropdown
    let show = true; // flag to show or hide the drop down.

    // add click listener to the dropdown button trigger to open and hide it.
    $('.trigger').addEventListener('click', triggerDropDown);

    // trigger click listener function.
    function triggerDropDown(e) {
        // if button clicked don't fire body click listener.
        e.stopPropagation();

        if (show) {
            // add click listener to body element to hide the drop down.
            $('body').addEventListener('click', hideDropDown, false);
            // add click listener to window to hide the drop down.
            window.addEventListener('keyup', escHideDropDown, false);
            $('.dropdown').style.animationName = 'show-dropdown'; // open drop down.
            // $('.dropdown').style.height = '300px'; // open drop down.

            show = !show; // flip falg.
        } else if (!show) {
            $('.dropdown').style.animationName = 'hide-dropdown'; // close drop down,
            // $('.dropdown').style.height = '0px'; // open drop down.

            show = !show; // flip flag.
        }
    }

    // body click listener function.
    function hideDropDown(e) {
        // flag to know if clicked target is any thing, not the drop down.
        let isNotDropDown = true;

        // collect drop down items in an Array.
        const lis = Array.from(document.querySelectorAll('li'));
        // if clicked target is drop down items, set the flag to false.
        lis.forEach(li => {
            if (e.target == li)
                isNotDropDown = false;
        });

        // if clicked target is the drop down, set the flag to false.
        if (e.target == $('.dropdown.select--dropdown'))
            isNotDropDown = false;

        // if the clicked target is any thing else.
        if (isNotDropDown && show === false) {
            // hide the drop down.
            $('.dropdown').style.animationName = 'hide-dropdown';
            // $('.dropdown').style.height = '0px'; // open drop down.

            // set trigger drop down flag to opposite.
            show = !show;

            // when task has been finished remove event listner from body element.
            $('body').removeEventListener('click', hideDropDown, false);
        }
    }

    // if user pressed ESC Key will hide the drop down.
    function escHideDropDown(e) {
        if (e.keyCode == 27 && show == false) {
            $('.dropdown').style.animationName = 'hide-dropdown';
            // $('.dropdown').style.height = '0px'; // open drop down.
            show = !show;
        }
    };
    // END Dropdown scripts.



    // languages JSON Files.
    let ar = await fetch('./ar.json').then(d => d.json());
    let en = await fetch('./en.json').then(d => d.json());
    let langData = en;

    // localStorage lang flag, Default lang is engilsh.
    localStorage.setItem('lang', 'en');

    function fac(obj) {
        let finalObj = {};
        for (let key in obj)
            if (typeof obj[key] !== 'object') {
                finalObj[key] = obj[key];
            } else if (typeof obj[key] === 'object') {
                finalObj = { ...finalObj, ...fac(obj[key]) }
            }
        return finalObj;
    }

    $('#select').addEventListener('change', changeLang);
    function changeLang(e) {
        if (e.target.value.toLowerCase() == 'en') {
            localStorage['lang'] = 'ar'
            langData = en;
            $('.content *').forEach(item => {
                item.style.direction = "ltr";
            });
        }
        else {
            localStorage['lang'] = 'en'
            langData = ar;
            $('.content *').forEach(item => {
                item.style.direction = "rtl";
            });
        }
        console.log(localStorage['lang'])
        let translation = fac(langData);
        for (let key in translation) {
            $('[data-lang="' + key + '"]').textContent = translation[key];
        }
    }



})();