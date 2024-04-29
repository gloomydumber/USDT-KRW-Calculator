import FormControl, { FormControlProps} from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type CustomInputProps = FormControlProps & {
  selectId: string,
  labelId: string,
  label: string,
  value: string,
  items: string[],
  disabled: boolean,
  handleChange: (e: SelectChangeEvent) => void,
}

export default function CustomizedSelect(props: CustomInputProps) {
  const lists = props.items;

  return (
    <FormControl sx={{ mb: 2 }} fullWidth disabled={props.disabled}>
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select
        labelId={props.labelId}
        id={props.selectId}
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
      >
        {lists.map(e => <MenuItem value={e} key={e}>{e}</MenuItem>)}
      </Select>
    </FormControl>
  );
}