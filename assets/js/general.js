// TABS

'use strict';
var app = {};

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
jQuery(document).ready(function() {
    app.main = (function() {
        var settings = {
                target: '.js-tabs',
                tabsList: '.js-tabs-list',
                tabsListItem: '.js-tablist-item',
                tabsListLink: '.js-tablist-link',
                tabsPanelItem: '.js-tabs-panel-item',
                active: 'active'
            },
            load = function() {
                var target = '.js-tabs',
                    tabs = $(target);
                if (tabs.length > 0) {
                    tabs.each(function() {
                        var container = $(this);
                        tabItem(container);
                    });
                }
            },
            tabItem = function($elem) {
                var $elementsLinks = $elem.find(settings.tabsList + ' ' + settings.tabsListLink),
                    $accordionLink = $elem.find(settings.tabsListLink),
                    $accordionList = $elem.find(settings.tabsListItem);

                $elementsLinks.on('click', function(event) {
                    event.preventDefault();
                    var $this = $(this),
                        $parent = $elem,
                        $tabListItems = $parent.find(settings.tabsListItem);

                    if ($tabListItems.length > 0) {
                        $tabListItems
                            .find(settings.tabsListLink)
                            .attr('tabindex', '-1')
                            .attr('aria-selected', 'false');
                        $tabListItems.removeClass(settings.active);
                    }

                    var $parentActivate = $this.parents(settings.tabsListItem);
                    $parentActivate.addClass(settings.active);
                    $this
                        .attr('tabindex', '0')
                        .attr('aria-selected', 'true');
                    var URLactual = getAbsolutePath() + '#' + $this.attr('title');
                    history.pushState(null, "", URLactual);
                    var URLactual = "";

                    //panels
                    var $tabPanelItems = $parent.find(settings.tabsPanelItem);
                    $tabPanelItems.attr('aria-hidden', 'true').removeClass(settings.active);

                    $('#' + $this.attr('aria-controls')).attr('aria-hidden', 'false').addClass(settings.active);
                });

                $accordionLink.on('keydown', function(e) {
                    var $that = jQuery(this),
                        $accordionAgrup = $that.parents(settings.tabsListItem),
                        elementsTab = $elem.find(settings.tabsListItem).length - 1,
                        currentTab = $accordionAgrup.index(),
                        $element;
                    if (!(e.shiftKey && e.keyCode === 9)) {
                        if (!(e.keyCode === 9)) { //tab
                            e.preventDefault();
                            //key left or key up - previous tab
                            if ((e.keyCode === 37 || e.keyCode === 38)) {
                                $accordionList.eq(currentTab).find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected', 'false');
                                if (currentTab <= elementsTab) {
                                    //there is elements-tab on left
                                    $element = $accordionList.eq(currentTab - 1).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected', 'true');
                                } else {
                                    if (currentTab == 0) {
                                        //start on last tab again
                                        $element = $accordionList.eq(elementsTab).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected', 'true');
                                    }
                                }
                                $element.trigger('click');
                            } else {
                                //key right or key down - next tab
                                if ((e.keyCode === 39 || e.keyCode === 40)) {
                                    $accordionList.eq(currentTab).find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected', 'false');
                                    if (currentTab < elementsTab) {
                                        //there is elements-tab on right
                                        $element = $accordionList.eq(currentTab + 1).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected', 'true');
                                    } else {
                                        if (currentTab == elementsTab) {
                                            //start on first tab again
                                            $element = $accordionList.eq(0).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected', 'true');
                                        }
                                    }
                                    $element.trigger('click');
                                }
                            }
                        } else {
                            $accordionAgrup.siblings().find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected', 'false');
                        }
                    }
                });

                var $tabListContainer = $elem.find(settings.tabsListItem);
                $elementsLinks.attr('aria-selected', 'false');
                $elementsLinks.attr('tabindex', '-1');


                //comprobamos si se está invocando a una pestaña
                var clicked = false;
                var hash = window.location.hash;
                if (hash) {
                    var tabTitle = decodeURIComponent(hash.split("#")[1]);
                    var $tabListContainerInvokedLink = $elem.find('[title="' + tabTitle + '"]');
                    if ($tabListContainerInvokedLink.length > 0) {
                        $tabListContainerInvokedLink.click();
                        clicked = true;
                    }
                }
                if (!clicked) {
                    //comprobamos si tenemos un elemento activo
                    var $tabListContainerActiveLink = $elem.find(settings.tabsListItem + '.' + settings.active + ' ' + settings.tabsListLink);
                    if ($tabListContainerActiveLink.length > 0) {
                        $tabListContainerActiveLink.click();
                    } else { //hago click en el último elemento
                        var $lastItem = $elem.find(settings.tabsListItem + ':last');
                        $lastItem.find(settings.tabsListLink).click();
                    }
                }
            };



        // Public API
        return {
            load: load
        };
    }());

    app.main.load();

});


// Accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("activeBox");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
/*$(".accordion a").click(function(e) {
    // Do something
    e.stopPropagation();
 });*/

//  FiltersNews
jQuery(document).ready(function() {
    //Filter News
    $('.filter-box').click(function(e) {
        $('.filter-box.active').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).attr('data-category-target');
        filterList(filter);
    });

    //News filter function
    function filterList(value) {
        var list = $(".noticias .noticia-container, .noticias .home-noticia__container");
        $(list).fadeOut("fast");
        if (value == "All") {
            $(".noticias").find(".noticia-container, .home-noticia__container").each(function(i) {
                $(this).delay(200).slideDown("fast");
            });
        } else {
            //Notice this *=" <- This means that if the data-category contains multiple options, it will find them
            //Ex: data-category="Cat1, Cat2"
            $(".noticias").find(".noticia-container[data-category*=" + value + "], .home-noticia__container[data-category*=" + value + "]").each(function(i) {
                $(this).delay(200).slideDown("fast");
            });
        }
    }

});

// PieChart
jQuery(document).ready(function() {
    $('.piechart').each(function() {
        $(this).easyPieChart({
            scaleColor: "transparent",
            lineWidth: 10,
            lineCap: 'round', //Can be butt
            barColor: $(this).data('color'),
            trackColor: "#F4F4F4",
            size: 125,
            rotate: 0,
            animate: 1000,

            onStep: function(value) {
                this.$el.find('span').text(Math.round(value));
            },
            onStop: function(value, to) {
                this.$el.find('span').text(Math.round(to));
            }

        });
    });
});

// Videos webinar YT
function changeVideoView(id_taller) {
	if( id_taller != null && id_taller != '' ){
		$('div[id^="container__webinars--taller"]').removeClass("active");
		if(id_taller == 'taller1'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/LR3xkWU3Aqs';
			$("#container__webinars--taller1").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_1_presentacion";
		}else if(id_taller == 'taller2'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/f1ZhTfBlm0M';
			$("#container__webinars--taller2").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_2_presentacion";
			
		}else if(id_taller == 'taller3'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/dUxZkn3Qnwo';
			$("#container__webinars--taller3").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_3_presentacion";
			
		}else if(id_taller == 'taller4'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/HX46ITJ1b-o';
			$("#container__webinars--taller4").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_4_presentacion";
			
		}else if(id_taller == 'taller5'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/TxbHD_XacLg';
			$("#container__webinars--taller5").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_5_presentacion";
			
		}else if(id_taller == 'taller6'){
			document.getElementById('iframe--yt').src = 'https://www.youtube.com/embed/zmcF5dxEre0';
			$("#container__webinars--taller6").addClass("active");
			document.getElementById('download--pdf--webinar__button').href = 'index.html';
			document.getElementById('download--pdf--webinar__button').download ="taller_6_presentacion";
		}
	}
}



