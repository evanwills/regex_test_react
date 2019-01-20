function autoResize () {
  var main = $(this).parent().parent()
  var lines = 3
  var maxHeight = 15
  var regex = new RegExp('(?:\r\n|\n\r|\r|\n)', 'g')

  $(main).find('textarea').each(function () {
    var tmp = $(this).val().match(regex)
    var thisLines = 0
    var css

    if (tmp !== null) {
      thisLines = (tmp.length + 1)
    }
    if (thisLines > lines) {
      lines = thisLines
    }

    css = {
      'min-height': (lines * 1.175) + 'rem',
      'overflow-y': 'auto'
    }

    if (lines >= maxHeight) {
      css = {
        'min-height': (maxHeight * 1.175) + 'rem',
        'overflow-y': 'scroll'
      }
    }

    if (lines > 3) {
      $(main).find('textarea').css(css)
    } else {
      $(main).find('textarea').removeAttr('style')
    }
    console.log(lines)
  })
}

$(document).ready(function () {
  'use strict'
  var extraOpen = {}

  console.log('document is ready')
  $('.regex-pair__open-close').on('click', function () {
    var ID = $(this).data('id')
    var extraID = '#regex-pair--' + ID + '__extra'
    var tabIndex = 1
    // var isOpen = $(this).hasClass('regex-pair__extra--open');
    console.log('extraID:', extraID)
    if (typeof extraOpen[ID] === 'undefined') {
      extraOpen[ID] = true
    }
    $(extraID).toggleClass('regex-pair__extra--open')
    if (extraOpen[ID] === true) {
      extraOpen[ID] = false
      $(extraID).find('input, button').attr('tabindex', -1)
    } else {
      extraOpen[ID] = true
      $(extraID).find('input, button').each(function () {
        $(this).attr('tabindex', tabIndex)
        tabIndex += 1
      })
      $('#regex-pair--' + ID + '__delimiter').focus()
    }
  })
  $('.regex-pair__open-close--open').trigger('click')
  $('.regex-pair--multi-line .regex-pair__input--find').on('focus', function (e) {
    console.log('focused')
    $(this).parent().parent().find('.regex-pair__modifiers').addClass('regex-pair__modifiers--blured')
  })

  $('.regex-pair--multi-line .regex-pair__input--find').on('blur', function (e) {
    console.log('blurred')
    $(this).parent().parent().find('.regex-pair__modifiers').removeClass('regex-pair__modifiers--blured')
  })

  // $('.regex-pair--multi-line').autoResize()

  $('.regex-pair--multi-line textarea').on('keyup', autoResize)
  $('.regex-pair--multi-line textarea').trigger('keyup')
})
