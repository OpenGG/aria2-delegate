# aria2-delegate

Deletgate cli command to remote aria2 json rpc call

## Usage

0. Install node: [node](https://nodejs.org/)
0. Install aria2-delegate with `npm install -g aria2-deletgate`
0. Check out the following mannual


    Usage:

      aria2-delegate [options] <download_url>

    Examples:

      Simple:
        aria2-delegate --rpc "http://127.0.0.1:6800/jsonrpc" <url>

      With password:
        aria2-delegate --rpc "http://user:pass@127.0.0.1:6800/jsonrpc" <url>

      With secret token:
        aria2-delegate --rpc "http://token:this_is_token@127.0.0.1:6800/jsonrpc"
        <url>

      Request header:
        aria2-delegate --rpc "http://127.0.0.1:6800/jsonrpc" --header "User-Agent:
        Mozilla/5.0" --header.User-Agent "Mozilla/5.0" <url>


    Options:
      --index-out  Index out                                  [string] [default: []]
      --header     Request http header                                 [default: []]
      --rpc        RPC service url                                          [string]
      --version    Show version number                                     [boolean]
      --help       Show help                                               [boolean]

## Example: setup flashgot

0. Install `aria2-delegate`
0. Find out `aria2-delegate`'s real path, with one of the following commands

        which aria2-delegate
        where aria2-delegate

0. Install `flashgot` in firefox browser
0. Enter `flashgot` options
0. Add a new custom download manager, named `aria2-delegate`
0. Set execuable path to `aria2-delegate`'s real path
0. Put the following content in template

        --rpc http://token:this_is_token@server_ip:6800/jsonrpc [--header.Cookie COOKIE] [--header.Referer REFERER] [--header.User-Agent UA] [--out FNAME] [URL]

