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

  def post_execute
    save({'answer' => @datastore['answer']})
  end

end
