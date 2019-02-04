/* jslint browser: true */
/* global $ */
/* jslint evil: true */

var hasTextarea = {}
var isLongLine = {}

function resizeTextarea (main, id) {
  var lines = 3
  var maxHeight = 15
  var regex = new RegExp('(?:\\r\\n|\\n\\r|\\r|\\n)', 'g')

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
    // console.log(lines)
  })
}

function autoResizeLongLine () {
  // console.log('inside autoResizeLongLine()')
  resizeTextarea($(this))
}

function autoResizeMultiLine () {
  var id = $(this).data('id')
  var main = '#regex-pair--' + id
  console.group('autoResize')
  console.log('$(this):', $(this))
  console.log('inside autoResizeMultiLine()')
  console.log('main:', main)
  console.log('id:', id)
  console.groupEnd('autoResize')

  $(main).find('textarea').each(function () {
    resizeTextarea($(this), id)
  })
}

function getID (element) {
  var id = $(element).attr('id')
  if (typeof id !== 'undefined') {
    return id.replace(/^.*?--([0-9])__.*$/, '$1')
  } else {
    return id
  }
}

function longLine () {
  var doLongLine = $(this).is(':checked')
  var isMulti = false
  var id = getID($(this))
  var prefix = 'regex-pair--'
  var ID = '#' + prefix + id

  isMulti = hasTextarea[ID]

  isLongLine[ID] = doLongLine
  if (doLongLine === true) {
    $(ID).addClass(prefix + 'long-line').removeClass(prefix + 'multi-line')
    $(ID).off('keyup').on('keyup', autoResizeLongLine)
    return true
  } else {
    $(ID).removeClass(prefix + 'long-line')
    $(ID).off('keyup').on('keyup', autoResizeMultiLine)
    if (isMulti) {
      $(ID).addClass(prefix + 'multi-line')
    }
    return false
  }
}

function modifiersMultiLine () {
  var id = 'regex-pair--' + getID($(this))
  var wasTextarea = false
  var val = $(this).val()
  var ID = '#' + id

  wasTextarea = hasTextarea[id]
  if (val.match('m')) {
    if (wasTextarea === false) {
      hasTextarea[id] = true
      // convert find & replace input fields to textarea
      console.log('should now be textarea')

      // add on keyup listener for appropriate layout (isLong)
      if (isLongLine[id] === true) {
        $(ID + ' textarea').on('keyup', autoResizeLongLine)
      } else {
        $(ID + ' textarea').on('keyup', autoResizeMultiLine)
      }
      $(ID + ' textarea').trigger('change')
    }
  } else {
    if (wasTextarea === true) {
      // remove on keyup listener
      $(ID + ' textarea').off('keyup')

      hasTextarea[id] = false

      // convert find & replace textarea fields to input
    }
  }
}

$(document).ready(function () {
  'use strict'
  var extraOpen = {}

  $('input, textarea, select').each(function () {
    var id = getID($(this))
    // console.log('id:', id)
    if (typeof id !== 'undefined') {
      $(this).data('id', id)
    }
  })

  $('.regex-pair__open-close').on('click', function () {
    var ID = getID($(this))
    var extraID = '#regex-pair--' + ID + '__extra'
    var tabIndex = 1

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
  $('.regex-pair').each(function () {
    var id = $(this).attr('id')
    hasTextarea[id] = false
    isLongLine[id] = $(this).hasClass('regex-pair--long-line')
  })
  $('textarea').each(function () {
    var id = 'regex-pair--' + getID($(this))
    hasTextarea[id] = true
  })
  $('.regex-pair__open-close--open').trigger('click')
  $('.regex-pair--multi-line .regex-pair__input--find').on('focus', function (e) {
    $('#regex-pair--' + $(this).data('id')).find('.regex-pair__modifiers').addClass('regex-pair__modifiers--blured')
  })

  $('.regex-pair--multi-line .regex-pair__input--find').on('blur', function (e) {
    $('#regex-pair--' + $(this).data('id')).find('.regex-pair__modifiers').removeClass('regex-pair__modifiers--blured')
  })
  $('.regex-pair__input--modifiers').on('blur', modifiersMultiLine)

  $('input.regex-pair__longLine').on('change', longLine)
  $('.regex-pair--multi-line textarea').on('keyup', autoResizeMultiLine)
  $('.regex-pair--long-line textarea').on('keyup', autoResizeLongLine)

  // $('.regex-pair--multi-line textarea').trigger('keyup')
  // $('.regex-pair--long-line textarea').trigger('keyup')
  $('input.regex-pair__longLine').trigger('change')
  $('.regex-pair__main textarea').trigger('keyup')
})
