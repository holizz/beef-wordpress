BeEF WordPress modules
======================

Because I wanted to see what fun things can be done with XSS.

create_user
-----------

Creates a WordPress user.

Known issues:
* It says "successfully created user" when it hasn't
* The username/email/password are caching, so if you create a user called admin2, the next time you run it your admin will be called admin2 (at least when testing from one browser instance)
* Testing sounds like too much hard work so they've only been tested in Firefox
