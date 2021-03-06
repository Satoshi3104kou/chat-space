$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id} >
        <div class="chat-main__message">
          <div class="chat-main__message__upper__message">
            <div class="chat-main__message__upper__message__user-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message__upper__message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>
       </div>`
     return html;
   } else {
    var html =
    `<div class="message" data-message-id=${message.id}>
      <div class="chat-main__message">
        <div class="chat-main__message__upper__message">
          <div class="chat-main__message__upper__message__user-name">
            ${message.user_name}
          </div>
          <div class="chat-main__message__upper__message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
       </div>
    </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__messages').append(html);      
    $('form')[0].reset();
    $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  .always(function(){    
    $('.chat-main__message-form__new-message__submit__btn').attr('disabled', false);
  });
})
var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
    $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
   $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.chat-main__messages').append(insertHTML);
    $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    $("#new_message")[0].reset();
    $(".form__submit").prop("disabled", false);
  }
  })
  .fail(function() {
    alert("fail")
  });
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}

});