<%--@elvariable id="indexModel" type="racegrid.web.model.IndexModel"--%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Race Grid</title>

    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css"/>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>
    <script>
        System.import('app');
    </script>

</head>

<html>

<!-- 3. Display the application -->
<body>

<app>
    <div class="container">
        <p></p>
        <div class="row">
            <div class="col-xs-12">
                <div class="well well-md text-center">Loading...</div>
            </div>
        </div>
    </div>

</app>

</body>
</html>

</html>