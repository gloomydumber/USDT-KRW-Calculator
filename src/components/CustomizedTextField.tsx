import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

type CustomInputProps = TextFieldProps & {
  adornmentContent: string;
}

const CustomInput = styled(TextField)(() => ({
  width: '100%',
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none'
  },
  '& input[type=number]': {
    MozAppearance: 'textfield'
  },
}));

export default function CustomizedTextField(props: CustomInputProps) {
  return (
    <CustomInput id={props.id} label={props.label} variant='standard' type='number' inputRef={props.inputRef} InputProps={{
      startAdornment: <InputAdornment position="start">{props.adornmentContent}</InputAdornment>
    }} />
  );
}