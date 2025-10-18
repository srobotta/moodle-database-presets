#!/bin/bash
# Create a zip from the directories with the database
# templates and preset.xml for direct upload in the
# database activity. Traverse the current directories
# and check for an preset.xml file. If this is present,
# then assume that we have a directory with templates,
# therefore zip the relevant files and place the zip archive
# in the root directory.
#
# Usage: bash make-zip.sh
# Result: a <directory>.zip in the root directory for
# every preset.

directories=$(ls -p | grep -e /$)

for dir in $directories
do
  if [ ! -e ${dir}preset.xml ]; then
    continue
  fi

  zipfile="${dir:0:-1}.zip"
  
  cd $dir
  zip -u ../$zipfile  \
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
    singletemplate.html 2&> /dev/null

  cd ..

done