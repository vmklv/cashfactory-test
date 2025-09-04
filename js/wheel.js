;(function(){
  var resultWrapper = document.querySelector('.overlay');
  var wheel = document.querySelector('.prize-wheel');
  var timerSpan = document.querySelector('.in-timer-new-bl .time');

  function getEndsAt(){ var v = localStorage.getItem('wheelEndsAt'); return v?parseInt(v,10):0; }
  function isTimerActive(){ return getEndsAt() > Date.now(); }
  function startPersistentTimer(endTs){
    if(!timerSpan) return;
    function render(){
      var diff = Math.max(0, Math.floor((endTs - Date.now())/1000));
      var m = Math.floor(diff/60), s = diff%60;
      timerSpan.textContent = (m<10?'0'+m:m) + ' ' + (s<10?'0'+s:s);
      if(diff<=0){ clearInterval(iid); localStorage.removeItem('wheelEndsAt'); $(".wheel__wrapper").slideDown(); }
    }
    render(); var iid = setInterval(render,1000);
  }

  if(isTimerActive()){ $(".wheel__wrapper").hide(); $(".order").show(); startPersistentTimer(getEndsAt()); }

  $(document).on('click', '.wheel__cursor', function(){
    if(!wheel || isTimerActive()) return;
    if(!wheel.classList.contains('rotated')){
      wheel.classList.add('spin');
      var endsAt = Date.now() + 10*60*1000; localStorage.setItem('wheelEndsAt', String(endsAt)); startPersistentTimer(endsAt);
      setTimeout(function(){ if(resultWrapper){ resultWrapper.style.display = 'block'; } }, 8000);
      wheel.classList.add('rotated');
    }
  });

  $(document).on('click', '.close-popup, .btn-popup', function(e){
    e.preventDefault(); $(".wheel__wrapper").slideUp(); $(".order").slideDown(); $(".overlay").fadeOut();
  });

  function updateFieldState(input){
    var $inp=$(input), $wrap=$inp.closest('.field-gkk'); if(!$wrap.length) return;
    if($inp.is(':focus') || String($inp.val()||'').trim()!==''){ $wrap.addClass('act-gkk'); } else { $wrap.removeClass('act-gkk'); }
  }
  $(document).on('focus input change blur', '.field-gkk input', function(){ updateFieldState(this); });
  $('.field-gkk input').each(function(){ updateFieldState(this); });
})();
