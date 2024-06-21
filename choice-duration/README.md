## Choice of items with duration

This set is an adaption of the [First, second and third choice](../choice/)
preset. The usecase here is to let participans choose from several events at a
conference. There is a block when several workshops,talks and demos take place
at the same time and the participants should choose which of the events to
select for themselves.

The result can be used in several ways:

* See which event is well attended and which is not.
* In case the selection is presented before the events are scheduled, depending
on the interests, events may be planed in parallel.

To serve the second case, it's the best to export the collected data and process
them offline. In this preset the *List view template* shows the list of events
together with the votes each received.

### General setup of the activity

The database fields consist of one single short text field which is mandatory.
The field itself is hidden. The list of events is defined in the
*Custom JavaScript* template in the `listOfChoices` array. Each element of
that array represents one event e.g.
```
{
  name: 'Workshop 2 Title',
  user: 'Presenter Name',
  duration: 90
}
```

The duration is important. The idea is that the events run in parallel in
several timeslots. People can only choose events that fit into an overall
duration time which is set in `const maxDuration = 180;` (here 3 hours).

Because the field `[[choice]]` is mandatory and there is a check if the
selected item list is empty, the user must check at least one checkbox.

Also the user cannot select events that together would exceed the maximum
time. After each click, the duration of the selected events is summarized
and all other events that would exceed the maximum time, when selected
as well, are disabled.

The data that is stored is an array of selected events in the JSON notation
e.g. if the Workshop 2, Talk 5 and Demo 8 are selected the stored
value is

```
["1","4","7"]
```

The numbers refer to the item index of the `listOfChoices` array starting
at 0.

Note: the indices are stored as a string. When these are read to display
the seleced values in the view template, the index is casted into an
integer before it can be used as an index for the array.

### Customization

To customize the event list, change the `listOfChoices` array must be
adapted in the *Custom JavaScript* template. The display of the data is
also done mainly in that template.

The display of the input list in the *Add entry template* is handled
via the variable `TMPL_INPUT_ENTRY`. The content of the
*Single view template* is done via `TMPL_ITEM_ENTRY`. The *List view
template* makes use of the `TMPL_LIST_ENTRY`. In the function
`displayVotes()` the two labels of the list header are defined.

The *Custom CSS* template contains the "min." suffix that is displayed
at the duration of a single event. If you have other or no units, you
can change it there as well as control the output of the data. In this
example the event name is displayed as a block element, the presenter
name and the duration are inline elements.