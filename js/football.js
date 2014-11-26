$(document).foundation('reveal', {
    animation: 'fade',
    animationspeed: 200
});

function revealCredits() {
    $('#credits').foundation('reveal', 'open');
}

function scrollDownTo(whereToScroll, scrollOffset) {
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}

function removeMuter() {
    $('.removeOnVid').each( function() {
        $(this).remove();
    });
    OO.Player.create('ooyalaplayer', '9wbDBwcToX6cC_VcoWQ1VrGLMTqDxlDz', {'autoplay':true});
}

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
});

$(document).ready(function() {
    $('.centergallery').slick({
        centerMode: true,
        centerPadding: '20%',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><span>&lt;</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span>&gt;</span></button>',
        responsive: [{
            breakpoint: 800,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '8%',
                slidesToShow: 1
            }
        }]
    });
});

var moreAd = true;

function hideAdManual() {
    $('#adwrapper').fadeOut(200);
    $('a.boxclose').css('display', 'none');
    moreAd = false;
}

function showAd() {
    if (moreAd && $("#adwrapper").html().length > 3100) {
        $('#adwrapper').fadeIn(300);
        $('a.boxclose').fadeIn(300);
        moreAd = false;
    }
}


document.getElementById('mute').addEventListener('click', function (e)
{
    var audio = document.getElementById('background_audio');
    var muteimg = document.getElementById('mute_img');
    e = e || window.event;
    audio.muted = !audio.muted;
    console.log(muteimg.src);
    if (muteimg.src.match('mute.png')) {
        muteimg.src = './img/sound.png';
    } else {
        muteimg.src = './img/mute.png';
    }
    e.preventDefault();
}, false);