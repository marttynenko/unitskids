$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


function setValidatorDefaults() {
  jQuery.validator.setDefaults({
    errorClass: 'invalid',
    successClass: 'valid',
    focusInvalid: false,
    errorElement: 'span',
    errorPlacement: function (error, element) {
      if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
        element.closest('label').after(error);
        
      } else if (element.parent().hasClass('jq-selectbox')) {
        element.closest('.jq-selectbox').after(error);
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function(element, errorClass, validClass) {
      if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
        $(element).parent().addClass(errorClass).removeClass(validClass);
      } else {
        $(element).addClass(errorClass).removeClass(validClass);
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
        $(element).parent().removeClass(errorClass).addClass(validClass);
      } else {
        $(element).removeClass(errorClass).addClass(validClass);
      }
    }
  });
  //дефолтные сообщения, предупреждения
  jQuery.extend(jQuery.validator.messages, {
    required: "Обязательное поле",
    email: "Некорректный email адрес",
    url: "Некорректный URL",
    number: "Некорректный номер",
    digits: "Это поле поддерживает только числа",
    equalTo: "Поля не совпадают",
    maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
    minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
    require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
  });
  //кастомные методы валидатора
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
  }, "Только буквы");
  
  jQuery.validator.addMethod("telephone", function(value, element) {
    return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
  }, "Некорректный формат");
}





const FARBA = {
	//функция для навешивания изображений фоном
	backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.ui-backgrounded-bg').attr('src');
			if($this.find('.ui-backgrounded-bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	},

	//lazy load для сторонних либ
	lazyLibraryLoad(scriptSrc,linkHref,callback) {
		let script = document.createElement('script');
		script.src = scriptSrc;
		document.querySelector('#wrapper').after(script);
	
		if (linkHref !== '') {
			let style = document.createElement('link');
			style.href = linkHref;
			style.rel = 'stylesheet';
			document.querySelector('link').before(style);
		}
	
		script.onload = callback
	}
}

if (document.querySelector('.profile-notify-toggler')) {
  document.querySelector('.profile-notify-toggler').addEventListener('click',()=>{
    if (!document.querySelector('.notifications')) return;
    document.querySelector('.notifications').classList.toggle('active');
  })
}

if (document.querySelector('.profile-menu-toggler')) {
  document.querySelector('.profile-menu-toggler').addEventListener('click',()=>{
    document.querySelector('.profile-menu-toggler').classList.toggle('active');
    document.querySelector('.profile-menu-drop').classList.toggle('active');
  })
}

if (document.querySelector('.profile-menu-notify')) {
  document.querySelector('.profile-menu-notify').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.profile-menu-drop').classList.remove('active');
    document.querySelector('.notifications').classList.add('active');
  })
}



jQuery(document).ready(function($){

  if(document.querySelector('.ui-styler')) {
    FARBA.lazyLibraryLoad(
      '//cdnjs.cloudflare.com/ajax/libs/jQueryFormStyler/2.0.2/jquery.formstyler.min.js',
      '//cdnjs.cloudflare.com/ajax/libs/jQueryFormStyler/2.0.2/jquery.formstyler.min.css',
      () => {
        $('.ui-styler').styler()
      }
    )
  }
});