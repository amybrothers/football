$(document).foundation('reveal', {
    animation: 'fade',
    animationspeed: 200
});

var moreAd = true;
var muted = false;

function revealCredits() {
    $('#credits').foundation('reveal', 'open');
}

function scrollDownTo(whereToScroll, scrollOffset) {
    whereToScroll = (whereToScroll.substring(0,1) != '#') ? '#' + whereToScroll : whereToScroll;
    scrollOffset = typeof scrollOffset !== 'undefined' ? scrollOffset : 60;
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}

function isVisible(element) {
    var vidTop = $(element).offset().top;
    var vidBot = $(element).offset().top + $(element).height();
    var fromTop = $(window).scrollTop() + $(element).height() / 2;
    if ( fromTop > vidTop && fromTop < vidBot ) {
        return true;
    } else {
        return false;
    }
}

function playerCreator(embedId, playerId, divId) {
    divId = typeof divId !== 'undefined' ? divId : false;
    if (divId) {
        $(divId).animate({backgroundColor:'rgba(0,70,70,0.3)',paddingLeft:'.5em',paddingRight:'.5em'}, 350).delay(2000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},1000);
    }
    $('#' + embedId).html('<iframe src="http://launch.newsinc.com/?type=VideoPlayer/Single&widgetId=1&trackingGroup=90115&siteSection=denverpost&playlistId=18572&videoId=' + playerId + '" class="informvideo" noscroll style="width:100%; height:100%;" frameborder="no" scrolling="no" noresize></iframe>');
    $('#' + embedId).css('cursor','default');
}

function removeMuter() {
    $('.removeOnVid').each( function() {
        $(this).remove();
    });
    playerCreator('mainvideo', '30136714');
}

$(document).on('close.fndtn.reveal', '[data-reveal]', function(){
    $('.reveal-modal iframe.informvideo').each(function(){
        $(this).remove();
    });
});

function muteAudio() {
    var audio = document.getElementById('background_audio');
    var muteimg = document.getElementById('mute_img');
    audio.muted = !audio.muted;
    console.log(muteimg.src);
    if (muteimg.src.match('mute.png')) {
        muteimg.src = './img/sound.png';
    } else {
        muteimg.src = './img/mute.png';
    }
}

$(document).keyup(function(e) {
    if (!moreAd && e.keyCode == 27) {
        hideAdManual();
    }    
});

$('.top-top').click(function(evt) {
    $('.toggle-topbar').click();
});

function fadeTitles() {
    var s = $(window).scrollTop();
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    opacityNew = s / h;
    if (opacityNew > 1 && opacityNew < 1.1) {
        showAd();
    }
    $('#name1').css("opacity", 1 - opacityNew * .75);
    $('#name2').css("opacity", opacityNew * .75);
}

$('document').ready(function() {
    fadeTitles();
});

$(window).scroll(function() {
    fadeTitles();
    if (!isVisible('#background_audio') && muted == false) {
        muteAudio();
        muted = true;
    }
});

function hideAdManual() {
    $('#adwrapper').fadeOut(200);
    $('a.boxclose').css('display', 'none');
    $('#footer-bar').delay(150).animate({marginBottom:'0'},300);
    $('#adframewrapper').html('');
    moreAd = false;
}

function showAd() {
    if (moreAd && $("#adwrapper").html().length > 3100) {
        $('#adwrapper').fadeIn(300);
        $('a.boxclose').fadeIn(300);
        moreAd = false;
        var adH = $('#adwrapper').height();
        $('#footer-bar').css('margin-bottom',adH);
    }
}

document.getElementById('mute').addEventListener('click', function () {
    muteAudio();
}, false);