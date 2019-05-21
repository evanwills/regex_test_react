
interface FieldLabelProps {
  fieldID: string,
  labelText: string
}

export const FieldLabel = (props: FieldLabelProps) => {
  return (
    <label htmlFor={props.fieldID}>{props.labelText}</label>
  );

}
