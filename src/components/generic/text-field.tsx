import React from 'react'
import { GenericTextFieldProps, AutoTextFieldProps } from './generic.typeDefs'

/**
 * getDynamicAttrs() builds a list of HTML attributes to be added
 * to a text field
 *
 * @param pattern HTML5 pattern regular expression
 * @param describedByID if the field has an error this is the ID
 *        for the div containing the error message
 * @param disabled if this field should be disabled, this should
 *        be true
 * @param height specifies the number of "rows" high a textarea
 *        field should be
 */
const getDynamicAttrs = (pattern: string, describedByID: string, disabled: boolean, height?: number) => {
  let output = {};

  if (describedByID !== '') {
    output['aria-described-by'] = describedByID;
  }
  if (pattern !== '') {
    output['pattern'] = pattern;
  }
  if (disabled === true) {
    output['disabled'] = disabled;
  }
  if (height !== null) {
    output['rows'] = height;
  }

  return output;
};

/**
 * getTextareaRowCount() calculates the number of rows needed to
 * display all of the contents of the text area without a scroll bar
 *
 * @param value the contents of the text area
 */
const getTextareaRowCount = (value: string) : number => {
  let rows = 1;

  const regex = new RegExp('(?:\\r\\n|\\n\\r|\\r|\\n)');

  while (regex.exec(value)) {
    rows += 1;
  }

  return (rows > 3) ? rows : 3;
};

/**
 * TextInputField() renders an HTML text input field
 *
 * @param props
 */
export const TextInputField = (props: GenericTextFieldProps) => {
  const { labelID, fieldClass, value, pattern, describedByID, onKeyUpFunc, disabled } = props;
  const attrs = getDynamicAttrs(pattern, describedByID, disabled);

  return (
      <input
        type="text"
        className={fieldClass}
        id={labelID}
        name={labelID}
        value={value}
        {...attrs}
        onKeyUp={onKeyUpFunc} />
    );
};

/**
 * TextAreaField() Renders an HTML textarea field
 * @param props
 */
export const TextAreaField = (props: AutoTextFieldProps) => {
  const { labelID, fieldClass, value, pattern, describedByID, onKeyUpFunc, disabled, height } = props;

  const _height = (height === 0) ? getTextareaRowCount(value) : height;

  return (
      <textarea
        className={fieldClass}
        id={labelID}
        name={labelID}
        {...getDynamicAttrs(pattern, describedByID, disabled, _height)}
        onKeyUp={onKeyUpFunc}>
        {value}
      </textarea>
    );
};


