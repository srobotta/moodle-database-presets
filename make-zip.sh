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

zip $zipfile \
  $1/addtemplate.html \
  $1/jstemplate.js \
  $1/listtemplateheader.html \
  $1/preset.xml \
  $1/rsstitletemplate.html \
  $1/asearchtemplate.html \
  $1/csstemplate.css \
  $1/listtemplatefooter.html \
  $1/listtemplate.html \
  $1/rsstemplate.html \
  $1/singletemplate.html

