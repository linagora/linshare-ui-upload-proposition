#!/bin/bash
set -e
set -x

l_mode=$1

l_version=$(grep version package.json | cut -d'"' -f4)
l_output="linshare-ui-upload-proposition-${l_version}.tar.bz2"
l_git_uuid=$(git log -n 1 --format=oneline|cut -d' ' -f1)
l_dist=linshare-ui-upload-proposition-${l_version}


echo "INFO: Cleaning ..."
rm -fr linshare-ui-upload-proposition-*
echo "INFO: Building ..."
node_modules/.bin/gulp build
echo "INFO: Packaging..."
if [ "${l_mode}" == "dev" ] ; then
  l_dist="linshare-ui-upload-proposition-${l_version}-${l_git_uuid}"
  l_output="linshare-ui-upload-proposition-${l_version}-${l_git_uuid}.tar.bz2"
fi

mv -v dist ${l_dist}
if [ "${l_mode}" != "dev" ] ; then
  sed -i -e 's/debug: true/debug: false/g' ${l_dist}/config.js
fi

tar cjf ${l_output} ${l_dist}

echo "INFO: Done"

