var equalHeight = (function($) {
	"use strict";

	// remove inline min height from the group
	function clear(group) {
		group.css('min-height', '');
	}

	// make group equal heights
	function equalHeight(group) {

		// reset height set by this script
		clear(group);

		// defining a variable that will keep track of the height of the tallest element
		var tallest = 0;

		// loop through elements, find the tallest outer height (includes padding)
		group.each(function () {

			// this is the outer height of the element (it doesn't round up or down to whole numbers)
			var thisHeight = this.getBoundingClientRect().bottom - this.getBoundingClientRect().top;

			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});

		// loop through elements again, individually set their min-height so that their total height (including padding) = our tallest element
		group.each(function () {

			// if this has css box-sizing: border box, set the min-height equal to the tallest
			if (isBorderBox(this)) {

				group.css('min-height', Math.ceil(tallest));

			} else {

				// if an element has padding
				if ($(this).outerHeight() > $(this).height()) {

					// calulate how much border and padding is on the element
					var thisPadding = $(this).outerHeight() - $(this).height();

					// set the height of the element to the tallest, but leave room for the padding
					group.css('min-height', Math.ceil(tallest - thisPadding));

				} else {

					// if the element has no padding, simply set the height to our tallest
					group.css('min-height', Math.ceil(tallest));
				}
			}
		});
	}

	// check to see if the page is using box-sizing: border-box;
	function isBorderBox(elem) {
		return window.getComputedStyle(elem).boxSizing === "border-box";
	}

	return {
		equalHeight: equalHeight,
		outerHeight: equalHeight,
		clear: clear
	};

})(jQuery);