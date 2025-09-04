;(function(){
  var form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var nameEl = form.querySelector('input[name="name"]');
    var phoneEl = form.querySelector('input[name="phone"]');
    var name = nameEl ? nameEl.value : '';
    var phone = phoneEl ? phoneEl.value : '';

    var token = window.TG_TOKEN || '';
    var chatId = window.TG_CHAT_ID || '';
    if (!token || !chatId) {
      alert('Telegram config missing');
      return;
    }

    var text = 'New lead:\n' +
               'Name: ' + name + '\n' +
               'Phone: ' + phone + '\n' +
               'URL: ' + location.href;

    fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    })
    .then(function(){
      alert('Sent!');
      try { form.reset(); } catch (e) {}
    })
    .catch(function(){
      alert('Error');
    });
  });
})();
