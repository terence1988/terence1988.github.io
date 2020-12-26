/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
  Adapted by Terence
*/

(function ($) {
	var $window = $(window),
		$body = $("body"),
		$header = $("#header"),
		$titleBar = null,
		$nav = $("#navlinks");

	// Breakpoints.
	breakpoints({
		large: ["769", "1280px"],
		small: [null, "768px"],
	});

	// Play initial animations on page load.
	$window.on("load", function () {
		window.setTimeout(function () {
			$body.removeClass("is-preload");
		}, 100);
	});

	// Tweaks/fixes.

	// Polyfill: Object fit.
	if (!browser.canUse("object-fit")) {
		$(".image[data-position]").each(function () {
			var $this = $(this),
				$img = $this.children("img");

			// Apply img as background.
			$this
				.css("background-image", 'url("' + $img.attr("src") + '")')
				.css("background-position", $this.data("position"))
				.css("background-size", "cover")
				.css("background-repeat", "no-repeat");

			// Hide img.
			$img.css("opacity", "0");
		});
	}

	// Header Panel.

	// Nav. Get a list, remove other active classes and leave current target a active
	var $nav_a = $nav.find("a");

	$nav_a.addClass("scrolly").on("click", function () {
		var $this = $(this);

		// External link? Bail.
		if ($this.attr("href").charAt(0) != "#") return;

		// Deactivate all links.
		$nav_a.removeClass("active");

		// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
		$this.addClass("active", "active-locked");
	});

	// Title Bar.
	$titleBar = $(
		'<div id="titleBar">' +
			'<a href="#header" class="toggle"></a>' +
			'<span class="title">' +
			$("#profile").html() +
			"</span>" +
			"</div>"
	).appendTo($body);

	// Panel.
	$header.panel({
		delay: 500,
		hideOnClick: true,
		hideOnSwipe: true,
		resetScroll: true,
		resetForms: true,
		side: "right",
		target: $body,
		visibleClass: "header-visible",
	});

	// Scrolly.
	$(".scrolly").scrolly({
		speed: 1000,
		offset: function () {
			if (breakpoints.active("<=large")) return $titleBar.height();
			return 0;
		},
	});
})(jQuery);
