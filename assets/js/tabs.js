'use strict';
var app = {};
function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
jQuery( document ).ready(function(){
	app.main = (function () {
		var settings = {
				target: 				'.js-tabs',
				tabsList: 			'.js-tabs-list',
				tabsListItem: 	'.js-tablist-item',
				tabsListLink: 	'.js-tablist-link',
				tabsPanelItem: 	'.js-tabs-panel-item',
				active: 				'active'
		},
		load = function() {
			var target = '.js-tabs',
				tabs = $(target);
			if (tabs.length > 0){
				tabs.each(function(){
					var container = $(this);
					tabItem(container);
				});
			}
		},
		tabItem = function($elem){
			var $elementsLinks = $elem.find(settings.tabsList + ' ' + settings.tabsListLink),
				$accordionLink = $elem.find(settings.tabsListLink),
				$accordionList = $elem.find(settings.tabsListItem);

			$elementsLinks.on('click', function(event){
				event.preventDefault();
				var $this = $(this),
					$parent = $elem,
					$tabListItems = $parent.find( settings.tabsListItem );

					if( $tabListItems.length > 0 ){
						$tabListItems
							.find(settings.tabsListLink)
								.attr('tabindex', '-1')
								.attr('aria-selected', 'false');
						$tabListItems.removeClass( settings.active );
					}

					var $parentActivate = $this.parents( settings.tabsListItem );
					$parentActivate.addClass( settings.active );
					$this
						.attr('tabindex', '0')
						.attr('aria-selected', 'true');
						var URLactual = getAbsolutePath() + '#' + $this.attr('title');
						history.pushState(null, "", URLactual);
						var URLactual = "";

					//panels
					var $tabPanelItems = $parent.find( settings.tabsPanelItem);
					$tabPanelItems.attr('aria-hidden','true').removeClass( settings.active );

					$('#' + $this.attr('aria-controls')).attr('aria-hidden','false').addClass( settings.active);
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
							$accordionList.eq(currentTab).find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected','false');
							if (currentTab <= elementsTab) {
								//there is elements-tab on left
								$element = $accordionList.eq(currentTab - 1).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected','true');
							} else {
								if (currentTab == 0) {
									//start on last tab again
									$element = $accordionList.eq(elementsTab).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected','true');
								}
							}
							$element.trigger('click');
						} else {
							//key right or key down - next tab
							if ((e.keyCode === 39 || e.keyCode === 40)) {
								$accordionList.eq(currentTab).find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected','false');
								if (currentTab < elementsTab) {
									//there is elements-tab on right
									$element = $accordionList.eq(currentTab + 1).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected','true');
								} else {
									if (currentTab == elementsTab) {
										//start on first tab again
										$element = $accordionList.eq(0).find(settings.tabsListLink).focus().attr('tabindex', '0').attr('aria-selected','true');
									}
								}
								$element.trigger('click');
							}
						}
					} else {
						$accordionAgrup.siblings().find(settings.tabsListLink).attr('tabindex', '-1').attr('aria-selected','false');
					}
				}
			});

			var $tabListContainer = $elem.find( settings.tabsListItem );
			$elementsLinks.attr('aria-selected', 'false');
			$elementsLinks.attr('tabindex', '-1');


			//comprobamos si tenemos un elemento activo
			var $tabListContainerActiveLink = $elem.find( settings.tabsListItem + '.' + settings.active + ' ' + settings.tabsListLink);
			if ( $tabListContainerActiveLink.length > 0 ) {
				$tabListContainerActiveLink.click();
			}else{ //hago click en el último elemento
				var $lastItem = $elem.find( settings.tabsListItem + ':last');
				$lastItem.find( settings.tabsListLink ).click();
			}
		};



		// Public API
		return {
			load: load
		};
	}());

	app.main.load();
});
