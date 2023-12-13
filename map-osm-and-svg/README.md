## Map with OSM and SVG

This preset is suitable for a list of places, that may have a name and at least latitude
and longitude to describe the geographic location. The coordinates use the number
field to avoid problems with the encoding when used in the templates inside Javascript.

Furthermore, tags can be used to classify the location, whether it's a village,
road, waters or something else. In this case the dots in the map are painted in
different colors.

<div style="margin: 0 25%;">

![List view](list_view.png "List view")

The different colors are based on the tag, that is given for the location. The
template recognizes these tags: `settlement` (red), `waters` (blue), `road` (orange).
All other locations get a black dot.

![Single view](single_view.png "Single view")

Although there exists a special datatype for geo coordinates, I have used the number
datatype to have less trouble when the values are put into the template. The geo coordinate
datatype would replace the `[[lat]]` placeholder with some HTML that cannot be used
in the javascript directly.

![New entry](new_entry.png "New entry")

You can enter the coordinates directly but also click on a location in the map to
define the coordinates for the new dataset. When editing an existing dataset, the
map shows the current location as well.

</div>

A very similar example is [Switzerland place names](../ch-place-names).

## Installation

After importing the zip file with the templates and the preset, tags for classification
can be adapted in the template *Custom Javascript* in the function `getColor4Tag()`. Just
extend the object that defined a tag name and a color.

The Geojson that contains the map must be stored somewhere. By default, the template
points to the version from this repository. You might want to download the Geojson
put it as a file activity into your Moodle course and the copy the link of that file
into the variable `geojsonLocation` at the very top of the *Custom Javascript* template.

## Credits

The map data with the swiss border was taken from 
https://www.naturalearthdata.com/ from the Admin 0 Countries.
