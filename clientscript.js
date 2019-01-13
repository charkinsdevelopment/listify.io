$("document").ready(function() {
  var ScrollToElement = function(Selector){
    $([document.documentElement, document.body]).animate({
        scrollTop: Selector.offset().top
    }, 900);
  }
  var GetDelimiter = function(){
    var itemsText = $('#Items textarea').val();
    var delimiter = '/\n';
    if(itemsText.indexOf(',') != -1) delimiter = ',';
    if(itemsText.indexOf(';') != -1) delimiter = ';';
    return delimiter;
  }
  
  var ResetValidation = function(){
     //reset validation
    $('textarea').each(function(){
        $(this).removeClass('error');
      });
    $('#Alert').removeClass('success');
    $('#Alert').removeClass('error');
    
    $('#Results textarea').val('');
    $('#Results').removeClass('active');
  }
  
  var GenerateAlert = function(message, type){
    var alertBox = $('#Alert');
    var alertBoxMessage = $('#Alert .message');
    
    alertBoxMessage.text(message);
    alertBox.addClass(type);
    alertBox.slideDown();
    
    setTimeout(function(){
      alertBox.slideUp();
    }, 2000);
    
  }
  
  var ShowResults = function(arrResults){
    var resultsTextArea = $('#Results textarea');
    var results = $("#Results");
    var finalizedResults = '';
    for(var idx = 0; idx < arrResults.length; idx++){
      finalizedResults += arrResults[idx];
    }
    resultsTextArea.val(finalizedResults);
    results.addClass('active');
    ScrollToElement($('#Results'));
  };
  var MakeList = function(delimiter) {
    var bFail = false;
    var items = $("#Items textarea");
    if (items.val().length == 0){
      GenerateAlert('You did not enter anything', 'error');
      bFail = true;
    }
    if(bFail){
      $('textarea').each(function(){
        $(this).addClass('error');
      });
      return false;
    } 
    var resultsLines = [];
    
    $.each(
      $("#Items textarea")
        .val()
        .split(delimiter),
      function(i, line) {
        if (line) {
          resultsLines.push('\'' + line.trim() + '\',\n');
        } else {
          resultsLines.push("");
        }
      }
    );
    ShowResults(resultsLines);
  };
  
  $("#CmdListify").click(function() {
    ResetValidation();
    var delimiter = GetDelimiter(); 
    MakeList(delimiter);
  });
  
  $('#CmdCopy').click(function(){
    $('#Results textarea').select();
    document.execCommand('copy');
    GenerateAlert('Copied to Clipboard!','success');
    document.getSelection().removeAllRanges();
  });
});
