$(document).ready(function () {
  'use strict'
  var extraOpen = {}

  console.log('document is ready')
  $('.regex-pair__extra-action').on('click', function () {
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
  $('.regex-pair__extra-action--open').trigger('click')
})
