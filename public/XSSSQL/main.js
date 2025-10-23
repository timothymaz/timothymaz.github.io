$(document).ready(function() {
    $('#testButton').click(function() {
        var userInput = $('#userInput').val();
        $('#output').html(userInput);
        $('#myModal').modal('show');
    });
});
