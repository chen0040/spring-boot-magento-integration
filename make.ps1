
$profile="local"

$currentPath = $pwd

if($args.length -gt 0) {
    $profile=$args[0]
}

Invoke-Expression -Command:"mvn -f pom.xml clean package -P$profile -U"

$proj="magento-site-spring-integration"
$source=$PSScriptRoot + "/target/" + $proj + ".jar"
$dest=$PSScriptRoot + "/bin/" + $proj + ".jar"
copy $source $dest

cd $currentPath
