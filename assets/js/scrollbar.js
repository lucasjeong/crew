jQuery(function($){
    var growmouseover = [true, '25px'] // magnify progress bar onmouseover? [Boolean, newheight]

///////// No need to edit beyond here /////////

    var $indicatorparts = $(document.body).append('<div class="scrollindicator"><div class="scrollprogress"></div></div>')
    var $indicatorMain = $indicatorparts.find('div.scrollindicator')
    var $scrollProgress = $indicatorparts.find('div.scrollprogress')
    var indicatorWidth = $indicatorMain.outerHeight()
    var transformsupport = $scrollProgress.css('transform')
    transformsupport = (transformsupport == "none" || transformsupport =="")? false: true

    function syncscrollprogress(){
        var winwidth = $(window).width()
        var docwidth = $(document).width()
        var scrollLeft = $(window).scrollLeft()
        var trackLength = docwidth - winwidth
        var pctScrolled = Math.floor(scrollLeft/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
            $scrollProgress.css('transform', 'translate3d(' + (-100 + pctScrolled) + '%,0,0)')
    }
    
    if (transformsupport){
        $indicatorMain.css('visibility', 'visible')
    
        $indicatorMain.on('click', function(e){
            var trackLength = $(document).height() - $(window).height()
            var scrollamt = e.clientX/($(window).width()-32) * trackLength
            $('html,body').animate({scrollTop: scrollamt}, 'fast')
        })
    
        if (growmouseover[0]){
            $indicatorMain.on('mouseenter touchstart', function(e){
                $(this).css('height', growmouseover[1])
                e.stopPropagation()
            })
        
            $indicatorMain.on('mouseleave', function(e){
                $(this).css('height', indicatorWidth)
            })
            
            $(document).on('touchstart', function(e){
                $indicatorMain.css('height', indicatorWidth)
            })
        }
        
        $(window).on("scroll load", function(){
            requestAnimationFrame(syncscrollprogress)
        })
    }
})
scrollTop('js-button', 500);
function scrollTop(elem,duration) {
	let target = document.getElementById(elem);

	target.addEventListener('click', function() {
		let currentY = window.pageXOffset; 
		let step = duration/currentY > 1 ? 10 : 100;
		let timeStep = duration/currentY * step;
		let intervalID = setInterval(scrollLeft, timeStep);

		function scrollLeft(){
			currentY = window.pageXOffset;
			if(currentY === 0) {
				clearInterval(intervalID);
			} else {
				scrollBy(-step,0);
			}
		}
	});
}