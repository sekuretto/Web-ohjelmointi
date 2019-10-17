<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Harjoitukset 1: Tehtävä 7</title>
    </head>
    <body>
        <?php
            header('Content-type: text/html');
            
            echo "<h3>HTTP-otsakkeet</h3>\n";
            foreach($_SERVER as $h=>$v)
                if(ereg('HTTP_(.+)',$h,$hp))
                    echo "<li>$h = $v</li>\n";
        
            echo "<h3>GET-metodilla saapunut data</h3>\n";
            foreach($_GET as $h=>$v)
                echo "<li>$h = $v</li>\n";
        
            echo "<h3>POST-metodilla saapunut data</h3>\n";
            foreach($_POST as $h=>$v)
                echo "<li>$h = $v</li>\n";
        ?>
    </body>
</html>