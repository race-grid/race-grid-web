function init(apiUrl) {

    console.log('init: ' + apiUrl);

    getUsers();

    $('#name-button').on('click', function (e) {
        var name = $('#name-input').val();
        console.log(name);
        createNewUser(name);
    });

}

function getUsers() {
    $.get(apiUrl + '/users').then(function (response) {
        console.log(response);
        console.log(response.join(', '));
        $('#users').html(response.join(', '));
    });
}

function createNewUser(name) {
    $.post(apiUrl + '/users?name=' + name).then(function (response) {
        if (response.createdNewUser) {
            $('#status').html('Created new user "' + name + '"!');
        } else {
            $('#status').html('Couldnt create new user!');
        }
        getUsers();
    });
}