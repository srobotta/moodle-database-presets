# moodle-database-presets
Presets for the Moodle database activity

## Overview

With the Moodle database activity many cool things can be created. In this repo I share some of my presets.
Inside the subdirectories the template files of the preset are included. Other files that are in the subdirectory
may contain additional data (images, metadata) so that the database activity works in the expected way.

## Content

Inside each subdirectory is an additional README.md that explains the specific preset.

### [Map with OSM and SVG](map-osm-and-svg)

Create SVG maps from the data, use Open Street Map to enter data sets.<br/>
Download Link: [map-osm-and-svg.zip](map-osm-and-svg.zip)

### [Switzerland place names](ch-place-names)

Create SVG maps from the data, download the dynamically created SVG and have a QR code for the parameterized search.<br/>
Download Link: [ch-place-names.zip](ch-place-names.zip)

### [Image gallery v2](image-gallery-v2)

Improved image gallery that looks more modern than the original preset from Moodle.<br/>
Download Link: [image-gallery-v2.zip](image-gallery-v2.zip)

### [Animated bar chart](barchart-animated)

Pick one choice from a selection list. Results are displayed in a animated bar chart and can be periodically refreshes while the activity is ongoing.<br/>
Download Link: [barchart-animated.zip](barchart-animated.zip])

### [Accumulated pie chart](piechart-accumulated)

Kind of a voting machine, vote for one or more options in a well-designed new entry page. The result is displayed as a pie chart.<br/>
Download Link: [piechart-accumulated.zip](piechart-accumulated.zip)

### [Wordcloud list](wordcloud-list)

A wordcloud built from terms entered as datasets.
Download Link: [wordcloud-list.zip](wordcloud-list.zip)

### [Wordclound text](wordcloud-text)

A wordcloud built from texts entered as datasets.
Download Link: [wordcloud-text.zip](wordcloud-text.zip)

## Installation

Any of these examples can be installed in your Moodle installation in the
following way:
1. In your course, create a new database activity. Give it a name and click on "Save and display".
2. In the next screen click the button "Import a preset", select the zip file for upload and click "Import preset and apply".
3. When the import was successful you should see a list of the field definitions.
To check the templates navigate in the tab to the template section and check them.

Before you see anything, start creating a few entries or import a sample dataset when provided.

Detailed instructions how templates should be applied to fit your needs are described
at each readme file inside the subdirectory of the preset.

## Additional data in templates

Some of the examples use additional data (such as images or json) in the templates
of the database activity. This data can be stored elsewhere (e.g. public available resources
such as wikipedia etc.) and then referred by the URL inside the template.

If you do not want to rely on external resources you also have the change to upload
the data into the Moodle course itself. What I find useful is to create a new
file resource, upload the file there and then use the preview link of that file inside
the template. In order to hide the resource from general access, I created an
additional section which is invisible in the course. The uploaded files would be
invisible as well, however you can make them accessible even they do not show up
in the course overview.

![Hidden resource files](resources_hidden.png "Hidden resource files")

**Note**: whenever you export/import or copy the database activity these files must
be copied as well and the links in the templates must be adapted to the new location.
If you use external URLs then this is not necessary.

## Other resources

Mebis has got a large collection of database presets and other resources for
Moodle at https://fdagner.notion.site/0cfe4ce41b2d463da99e0d08c825a461