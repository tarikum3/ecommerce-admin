// "use client";

// import { Control, useFieldArray } from "react-hook-form";
// import {
//   Box,
//   TextField,
//   IconButton,
//   Button,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import { ProductFormData } from "./CreateProduct";

// interface ProductOptionProps {
//   control: Control<ProductFormData>;
//   optionIndex: number;
//   onRemove: () => void;
// }

// const ProductOption = ({
//   control,
//   optionIndex,
//   onRemove,
// }: ProductOptionProps) => {
//   const {
//     fields: valueFields,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: `options.${optionIndex}.values`,
//   });

//   return (
//     <Paper sx={{ p: 2, mb: 2 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <TextField
//           {...control.register(`options.${optionIndex}.name`)}
//           label="Option Name"
//           sx={{ flexGrow: 1, mr: 2 }}
//           fullWidth
//         />
//         <IconButton onClick={onRemove}>
//           <DeleteIcon />
//         </IconButton>
//       </Box>

//       <Box sx={{ mt: 2 }}>
//         <Typography variant="subtitle2">Values</Typography>
//         {valueFields.map((field, valueIndex) => (
//           <Box
//             key={field.id}
//             sx={{ display: "flex", alignItems: "center", mt: 1 }}
//           >
//             <TextField
//               {...control.register(
//                 `options.${optionIndex}.values.${valueIndex}`
//               )}
//               label="Value"
//               sx={{ flexGrow: 1, mr: 2 }}
//               fullWidth
//             />
//             <IconButton onClick={() => remove(valueIndex)}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         ))}
//         <Button
//           variant="outlined"
//           onClick={() => append("")}
//           startIcon={<AddIcon />}
//           sx={{ mt: 1 }}
//         >
//           Add Value
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default ProductOption;

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
          onClick={() => append({ value: "" })}
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

// "use client";

// import { Control } from "react-hook-form";
// import { Controller, useFormContext } from "react-hook-form";
// import {
//   Box,
//   TextField,
//   IconButton,
//   Button,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import { ProductFormData } from "./CreateProduct";

// interface ProductOptionProps {
//   control: Control<ProductFormData>;
//   optionIndex: number;
//   onRemove: () => void;
// }

// const ProductOption = ({
//   control,
//   optionIndex,
//   onRemove,
// }: ProductOptionProps) => {
//   // const { watch, setValue } = control;
//   const { watch, setValue } = useFormContext<ProductFormData>();
//   const options = watch("options");
//   const values = options[optionIndex]?.values || [];

//   const handleAddValue = () => {
//     const newValues = [...values, ""];
//     setValue(`options.${optionIndex}.values`, newValues);
//   };

//   const handleRemoveValue = (valueIndex: number) => {
//     const newValues = values.filter((_, i) => i !== valueIndex);
//     setValue(`options.${optionIndex}.values`, newValues);
//   };

//   const handleValueChange = (valueIndex: number, newValue: string) => {
//     const newValues = [...values];
//     newValues[valueIndex] = newValue;
//     setValue(`options.${optionIndex}.values`, newValues);
//   };

//   return (
//     <Paper sx={{ p: 2, mb: 2 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <TextField
//           {...control.register(`options.${optionIndex}.name`)}
//           label="Option Name"
//           sx={{ flexGrow: 1, mr: 2 }}
//           fullWidth
//         />
//         <IconButton onClick={onRemove}>
//           <DeleteIcon />
//         </IconButton>
//       </Box>

//       <Box sx={{ mt: 2 }}>
//         <Typography variant="subtitle2">Values</Typography>
//         {values.map((value, valueIndex) => (
//           <Box
//             key={valueIndex}
//             sx={{ display: "flex", alignItems: "center", mt: 1 }}
//           >
//             <TextField
//               value={value}
//               onChange={(e) => handleValueChange(valueIndex, e.target.value)}
//               label="Value"
//               sx={{ flexGrow: 1, mr: 2 }}
//               fullWidth
//             />
//             <IconButton onClick={() => handleRemoveValue(valueIndex)}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         ))}
//         <Button
//           variant="outlined"
//           onClick={handleAddValue}
//           startIcon={<AddIcon />}
//           sx={{ mt: 1 }}
//         >
//           Add Value
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default ProductOption;
