"use client";

import { Control } from "react-hook-form";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ProductFormData } from "./CreateProduct";

interface ProductVariantProps {
  control: Control<ProductFormData>;
  variantIndex: number;
  options: { name: string; values: string[] }[];
  onRemove: () => void;
}

const ProductVariant = ({
  control,
  variantIndex,
  options,
  onRemove,
}: ProductVariantProps) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Variant #{variantIndex + 1}</Typography>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField
            {...control.register(`variants.${variantIndex}.name`)}
            label="Variant Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...control.register(`variants.${variantIndex}.price`, {
              valueAsNumber: true,
            })}
            label="Price"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...control.register(`variants.${variantIndex}.quantity`, {
              valueAsNumber: true,
            })}
            label="Quantity"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                {...control.register(
                  `variants.${variantIndex}.availableForSale`
                )}
              />
            }
            label="Available for Sale"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Selected Options</Typography>
        {options.map((option, optionIndex) => (
          <Autocomplete
            key={optionIndex}
            options={option.values}
            renderInput={(params) => (
              <TextField
                {...params}
                label={option.name}
                fullWidth
                sx={{ mt: 1 }}
              />
            )}
            onChange={(_, value) => {
              const currentSelectedOptions = [
                ...(control._formValues.variants[variantIndex]
                  .selectedOptions || []),
              ];
              currentSelectedOptions[optionIndex] = {
                optionName: option.name,
                value: value || "",
              };
              control._formValues.variants[variantIndex].selectedOptions =
                currentSelectedOptions;
            }}
            value={
              control._formValues.variants[variantIndex]?.selectedOptions?.[
                optionIndex
              ]?.value || null
            }
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ProductVariant;
