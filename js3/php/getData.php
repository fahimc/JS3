<?php
$url = $_GET["url"];

if(isset($url))
{
//$str = file_get_contents($url);


$str = file_get_contents($url);
function get_url_contents($url){
        $crl = curl_init();
        $timeout = 5;
        curl_setopt ($crl, CURLOPT_URL,$url);
        curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
        $ret = curl_exec($crl);
        curl_close($crl);
        return $ret;
}

?>
<script type="text/javascript">
 function dataFeedback() {return  <?php print_r("'".$str."'"); ?>};
</script>
<?php
echo $str;
}else{
echo "error";
}
?>