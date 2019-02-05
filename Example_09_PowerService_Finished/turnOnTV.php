<!-- This is a simple html page that will be displayed as a Custom Dashboard on a TV -->
<!-- This can be reused in as is or even modified freely. -->

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC 
"-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
        <meta http-equiv="content-type" content="application/ce-html+xml; charset=UTF-8"/>  
        <link rel="stylesheet" type="text/css" href="ExerciseStyles.css" />
        <style type="text/css">
            body{
                background-image: "bg.jpg";
            }
        </style>
    </head>

    <body onload="document.getElementById('ButtonRefreshPage').focus();">

        <div id="container" style="z-index: 1;">
        
            <div class="nav" style="position: absolute;">
            
                <header>
                    <h1>Exercise07</h1>
                </header>
            
                <a href="turnOnTv.php" class="button">Turn On TV</a>
                <a href="turnOffTv.php" class="button">Turn Off TV</a>

                <br>
         
                <div class="PHILIPS_LOGO">
                    <img src="PhilipsLogo.png" height="43" width="175"> </img>
                </div>

            </div>
    
        </div>
                                <?php


                        $jsonObj = "{
                                    \"Svc\": \"WebListeningServices\",
                                    \"SvcVer\": \"1.0\",
                                    \"Cookie\": 295,
                                    \"CmdType\": \"Change\",
                                    \"Fun\": \"PowerService\",
                                    \"CommandDetails\":
                                        {
                                            \"ToPowerState\": \"On\"
                                        }
                            }";
                    $m_arr_myvar = json_decode($jsonObj);
                    $m_arr_myvar->CommandDetails->ToPowerState = "On";
                    
                    
                    $DecodedData = json_encode($m_arr_myvar); 
                    
                    $postParams = array('http' => array( 
                                'method' => 'POST',
                                'header' => (
                                                'Content-Type: application/x-www-form-urlencoded\r\n'.
                                                //'Content-Type: text/plain\r\n'.
                                                'Content-Length:'. strlen($DecodedData).'\r\n'.
                                                'Connection: close\r\n'
                                            ),
                                'content' => $DecodedData 
                                ));
                                                    $ctx = stream_context_create( $postParams );
                    //fwrite($fh, "stream_context_create".$ctx."\n");
                    
                    //apply power request for all selected IP addresses
                    $ipaddr = "192.168.103.208";
                    // fwrite($fh, "IP address = ".$ipaddr."\n");
                    $fp = fopen("http://".$ipaddr.":9080/WIXP", 'rb', false, $ctx );
        ?>

    </body> 
</html>
