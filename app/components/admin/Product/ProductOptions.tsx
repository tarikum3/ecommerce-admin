"use client";

import { Control, useFieldArray } from "react-hook-form";
import { Box, IconButton, Button, Typography, Paper } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ProductFormData } from "./CreateProduct";
import ProductOption from "./ProductOption";

interface ProductOptionsProps {
  control: Control<ProductFormData>;
}

const ProductOptions = ({ control }: ProductOptionsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Options</Typography>
        <Button
          variant="contained"
          onClick={() => append({ name: "", values: [] })}
          startIcon={<AddIcon />}
        >
          Add Option
        </Button>
      </Box>

      {fields.map((field, index) => (
        <ProductOption
          key={field.id}
          control={control}
          optionIndex={index}
          onRemove={() => remove(index)}
        />
      ))}
    </Paper>
  );
};

export default ProductOptions;
