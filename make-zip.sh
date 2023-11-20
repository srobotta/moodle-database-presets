#!/bin/bash
# Create a zip from the directories with the database
# templates and preset.xml for direct upload in the
# database activity.
#
# Usage: bash make-zip-sh <directory>
# Result: a <directory>.zip in the root directory. 

if [ -z $1 ]; then
  echo 'missing directory argument'
  exit 1
fi

if [ ! -d $1 ]; then
  echo 'directory does not exist'
  exit 2
fi

zipfile="${1}.zip"
if [ -e "$zipfile" ]; then
  rm $zipfile
fi

cd $1
zip $zipfile  \
  addtemplate.html \
  jstemplate.js \
  listtemplateheader.html \
  preset.xml \
  rsstitletemplate.html \
  asearchtemplate.html \
  csstemplate.css \
  listtemplatefooter.html \
  listtemplate.html \
  rsstemplate.html \
  singletemplate.html

cd ..
mv $1/$zipfile .

