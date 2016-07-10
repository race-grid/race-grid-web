<%--@elvariable id="indexModel" type="racegrid.web.model.IndexModel"--%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Race Grid</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="index.js"></script>
</head>

<body>
<h1> Race Grid </h1>

<p>
    <span>Users: </span>
    <span id="users"></span>
</p>

<p>
    <input type="text" id="name-input"/>
    <button id="name-button"> <- Create new</button>
</p>

<p id="status"></p>

</body>

<script>
    var apiUrl = '${indexModel.apiUrl}';
    init(apiUrl);
</script>

</html>