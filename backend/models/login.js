$('#form_login').validate({
    onkeyup: false,
    submitHandler: function () {
      return true;
    },
    rules: {
      username: {
        required: true,
        minlength: 6
      },
      password: {
        required: true,
        minlength: 8,
        remote: {
          url: '/users/login',
          type: 'post',
          data: {
            username: function () {
              return $('#username').val();
            }
          },
          dataFilter: function (data) {
            var data = JSON.parse(data);
            if (data.success) {
              return true
            } else {
              return "\"" + data.msg + "\"";
            }
          }
        }
      }
    }
  });