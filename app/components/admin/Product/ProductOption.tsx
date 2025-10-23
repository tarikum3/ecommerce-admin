"use client";

import { Control, useFieldArray } from "react-hook-form";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ProductFormData } from "./CreateProduct";

interface ProductOptionProps {
  control: Control<ProductFormData>;
  optionIndex: number;
  onRemove: () => void;
}

const ProductOption = ({
  control,
  optionIndex,
  onRemove,
}: ProductOptionProps) => {
  const {
    fields: valueFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `options.${optionIndex}.values` as any,
  });
  console.log("valueFieldsProductOptions", valueFields);
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          {...control.register(`options.${optionIndex}.name`)}
          label="Option Name"
          sx={{ flexGrow: 1, mr: 2 }}
          fullWidth
        />
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Values</Typography>
        {valueFields.map((field, valueIndex) => (
          <Box
            key={field.id}
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <TextField
              {...control.register(
                `options.${optionIndex}.values.${valueIndex}`
              )}
              label="Value"
              sx={{ flexGrow: 1, mr: 2 }}
              fullWidth
            />
            <IconButton onClick={() => remove(valueIndex)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          // onClick={() => append("")}
          onClick={() => append("")}
          startIcon={<AddIcon />}
          sx={{ mt: 1 }}
        >
          Add Value
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductOption;
