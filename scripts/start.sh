#!/usr/bin/env bash

if [[ "$OSTYPE" == "darwin"* ]]; then
	realpath() { [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"; }
	ROOT=$(dirname $(dirname $(realpath "$0")))
else
	ROOT=$(dirname $(dirname $(readlink -f $0)))
fi

function main() {
  cd $ROOT

	NODE=$(node lib/node.js)
  if [ ! -e $NODE ]; then
    yarn gulp node
  fi

  NODE=$(node lib/node.js)
  $NODE ./scripts/server.js "$@"
}

main "$@";