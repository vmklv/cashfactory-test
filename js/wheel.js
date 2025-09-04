var videoWrap = $(".video-wrap")
  , videoCover = $(".video-cover")
  , videoFrame = $(".video-inner");
function countDown(e) {
    let t = document.querySelector(e);
    a = t.getAttribute("data-minutes"),
    b = t.getAttribute("data-seconds");
    var o = setInterval((function() {
        0 <= parseInt(a) && -1 !== parseInt(b) && (0 === parseInt(b) && 0 !== parseInt(a) && (a--,
        b = 59),
        t.innerText = (10 > a ? "0" + a : a) + " " + (10 > b ? "0" + b : b),
        0 === parseInt(b) && 0 === parseInt(a) && (a--,
        b = 0,
        t.innerText = "00 00",
        clearInterval(o)),
        b--)
    }
    ), 1e3)
}
videoWrap.click((function() {
    $(this).find($(".video-cover")).css("display", "none"),
    $(this).find($("video"))[0].play()
}
)),
$(".btn--submit").click((function() {
    countDown(".time"),
    $(".order").addClass("shown__")
}
));
var resultWrapper = document.querySelector(".overlay")
  , wheel = document.querySelector(".prize-wheel")
  , wheelWrapper = document.querySelector(".wheel__wrapper")
  , timerSpan = document.querySelector(".in-timer-new-bl .time");

function getEndsAt() {
    var v = localStorage.getItem("wheelEndsAt");
    return v ? parseInt(v, 10) : 0;
}

function isTimerActive() {
    return getEndsAt() > Date.now();
}

function startPersistentTimer(endTs) {
    if (!timerSpan) return;
    function render() {
        var now = Date.now();
        var diff = Math.max(0, Math.floor((endTs - now) / 1000));
        var m = Math.floor(diff / 60);
        var s = diff % 60;
        timerSpan.textContent = (m < 10 ? "0" + m : m) + " " + (s < 10 ? "0" + s : s);
        if (diff <= 0) {
            clearInterval(iid);
            localStorage.removeItem("wheelEndsAt");
            // Show wheel again when timer ends
            $(".wheel__wrapper").slideDown();
        }
    }
    render();
    var iid = setInterval(render, 1000);
}

// On load: if timer active, hide wheel and show form + run timer
if (isTimerActive()) {
    $(".wheel__wrapper").hide();
    $(".order").show();
    startPersistentTimer(getEndsAt());
}
$(".wheel__cursor").click((function() {
    if (isTimerActive()) return; // Prevent during active timer
    wheel.classList.contains("rotated") || (wheel.classList.add("spin"),
    // Start 10-minute persistent countdown
    (function(){
        var endsAt = Date.now() + 10 * 60 * 1e3;
        localStorage.setItem("wheelEndsAt", String(endsAt));
        startPersistentTimer(endsAt);
    })(),
    setTimeout((function() {
        resultWrapper.style.display = "block"
    }
    ), 8e3),
    wheel.classList.add("rotated"))
}
)),
$(".close-popup, .btn-popup").click((function(e) {
    e.preventDefault(),
    $(".wheel__wrapper").slideUp(),
    $(".order").slideDown(),
    $(".overlay").fadeOut()
}
));
var element = $("#teaser-comment")
  , teaserLoad = $("#comment-load")
  , count = localStorage.getItem("count") ? localStorage.getItem("count") : 0;
$(window).scroll((function() {
    $(window).scrollTop() + $(window).height() > element.offset().top && 0 == count && (teaserLoad.addClass("visible"),
    count = 1,
    localStorage.setItem("count", count))
}
));
var textAlert = document.getElementById("textarea")
  , textName = document.getElementById("textareaname")
  , vk_text = document.getElementById("comment-text")
  , vk_name = document.getElementById("comment-name")
  , vk_block = document.getElementById("comment-answer")
  , vk_image = document.querySelector("#base64Img")
  , bannerImage = document.getElementById("avatar")
  , bannerImg = document.getElementById("base64Img")
  , dataImage = localStorage.getItem("ImgBase64")
  , vk_userImage = document.querySelector("#userPic")
  , userFile = document.getElementById("foto")
  , user_foto = document.querySelector("#userPic")
  , dataUserImg = localStorage.getItem("userFotoImg");
function changeText() {
    if ("" != $("#textareaname").val())
        if ($("#textareaname").css("border-bottom", "1px solid #838383"),
        "" != $("#textarea").val()) {
            $("#textarea").css("border-bottom", "1px solid #838383");
            var e = document.getElementById("textarea").value
              , t = document.getElementById("textareaname").value
              , o = localStorage.getItem("ImgBase64");
            foto = localStorage.getItem("userFotoImg"),
            localStorage.setItem("textAlert", e),
            localStorage.setItem("textName", t),
            vk_text.innerHTML = e,
            vk_name.innerHTML = t,
            vk_block.style.display = "flex",
            vk_image.src = o || "assets/2.jpg",
            vk_userImage.src = foto || "assets/1.jpg",
            bannerImage.value = "",
            textAlert.value = "",
            textName.value = "",
            vk_image.scrollIntoView()
        } else
            $("#textarea").css("border-bottom", "1px solid #e90e0e");
    else
        $("#textareaname").css("border-bottom", "1px solid #e90e0e")
}
function loadImageFileAsURL(e, t, o) {
    if (0 < (e = document.getElementById(e.target.id).files).length) {
        e = e[0];
        var a = new FileReader;
        a.onload = function(e) {
            e = e.target.result,
            localStorage.setItem(o, e),
            document.querySelector(t).src = null == e ? "assets/1.jpg" : e
        }
        ,
        a.readAsDataURL(e)
    }
}
function loadImageFileAsURL2(e, t, o) {
    if (0 < (e = document.getElementById(e.target.id).files).length) {
        e = e[0];
        var a = new FileReader;
        a.onload = function(e) {
            e = e.target.result,
            localStorage.setItem(o, e),
            document.querySelector(t).src = null == e ? "assets/2.jpg" : e
        }
        ,
        a.readAsDataURL(e)
    }
}
localStorage.getItem("textAlert") && localStorage.getItem("textName") && (vk_text.innerHTML = localStorage.getItem("textAlert"),
vk_name.innerHTML = localStorage.getItem("textName"),
vk_block.style.display = "flex",
bannerImg.src = localStorage.getItem("ImgBase64") ? localStorage.getItem("ImgBase64") : "assets/2.jpg",
user_foto.src = localStorage.getItem("userFotoImg") ? localStorage.getItem("userFotoImg") : "assets/1.jpg"),
$('a[href="#policy"]').click((function(e) {
    e.preventDefault(),
    $(".overlay-policy").fadeIn()
}
)),
$(".policy-close").click((function() {
    $(".overlay-policy").fadeOut()
}
)),
$((function() {
    // Float labels on focus/value for form inputs
    function updateFieldState(input) {
        var $inp = $(input);
        var $wrap = $inp.closest('.field-gkk');
        if (!$wrap.length) return;
        if ($inp.is(':focus') || ($inp.val() && String($inp.val()).trim() !== '')) {
            $wrap.addClass('act-gkk');
        } else {
            $wrap.removeClass('act-gkk');
        }
    }
    $(document).on('focus input change blur', '.field-gkk input', function(){
        updateFieldState(this);
    });
    // initialize on load
    $('.field-gkk input').each(function(){ updateFieldState(this); });

    $("#calcweight").click((function(e) {
        e.preventDefault(),
        e = Math.ceil(Number($("#minus_weight").val()) / .666666),
        Number($("#weight").val()) > Number($("#minus_weight").val()) + 40 ? $(".formResult").html("<p><b>Si vous suivez les instructions ci-dessous, vous pourrez perdre " + $("#minus_weight").val() + " en seulement " + e + " jours sans régime ni exercice!</b></p><p>Pensez-vous que c'est impossible? Lisez l'article ci-dessous jusqu'à la fin et vous changerez d'avis. J'espère que cela changera votre vie!</p>") : $(".formResult").html("<p><b>Données incorrectes.</b></p>"),
        $(".formResult").css({
            transition: "background 1s",
            backgroundColor: "#92c3439e",
            border: "2px solid #92c343"
        }),
        setTimeout((function() {
            $(".formResult").css({
                backgroundColor: "#fff"
            })
        }
        ), 2e3)
    }
    ))
}
));
