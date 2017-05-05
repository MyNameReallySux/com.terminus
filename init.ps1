
$process = Get-Process -id $pid

new "webpack --watch" -side left -pos 1 -max 2
new "node app.js" -side left -pos 2 -max 2

setWindowPosition $process right
