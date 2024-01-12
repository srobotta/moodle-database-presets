## FAQ to implementation details in the database activity

This is a collection of posts from the
[english database forum](https://moodle.org/mod/forum/view.php?id=3505) and
other resources. The questions
deal with some custom requirement that in most cases can be achieved easily with some
code or configuration. 

### Hide the footer area

The footer area might be empty in some setups ands therefore should not appear.

Link: https://moodle.org/mod/forum/discuss.php?d=454005

### Hide entries from other students

When the database activity is used th collect information from students, e.g.
some work they need to present, and each student must not see the work of others
but only his own.

In this case do the following:
* In the database settings, in the section *Entries* set *Approval required* to "no".
* Never approve any entry as a teacher.

Link: https://moodle.org/mod/forum/discuss.php?d=443555

### Rating should also be possible for students

By default, the rating (if enabled) for database entries can be done by the teacher
only. To allow student rating as well permissions have to be changed.

In the database activity go to the tab *More* and select *Permissions* from the
drop-down menu. On the left side search for the "Activity: Database" section.
There is a *Rate entries* permission (`mod/data:rate`). To the existing roles add
the "Student" role.

