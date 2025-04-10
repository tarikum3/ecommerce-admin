"use client";

import React, { useEffect } from "react";
import {
  Controller,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useCreateRoleMutation } from "@lib/admin/store/services/role.service";
import { useGetAllResourcesQuery } from "@lib/admin/store/services/resource.service";
const roleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  resources: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      selected: z.boolean(),
    })
  ),
});

export type RoleFormData = z.infer<typeof roleSchema>;

const CreateRole = () => {
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const { data: resourcesData, isLoading: isResourcesLoading } =
    useGetAllResourcesQuery();

  const methods = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      resources: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = methods;

  // Initialize resources in form when data is loaded
  useEffect(() => {
    if (resourcesData) {
      const initialResources = resourcesData.map((resource) => ({
        id: resource.id,
        name: resource.name,
        selected: false,
      }));
      setValue("resources", initialResources);
    }
  }, [resourcesData, setValue]);

  const onSubmit = async (data: RoleFormData) => {
    try {
      // Transform the data to match your API expectations
      const payload = {
        name: data.name,
        description: data.description,
        resourceIds: data.resources
          .filter((resource) => resource.selected)
          .map((resource) => resource.id),
      };

      await createRole(payload).unwrap();
      // Handle success (e.g., show notification, redirect)
      reset();
    } catch (error) {
      // Handle error
      console.error("Failed to create role:", error);
    }
  };

  const handleResourceToggle = (resourceId: string) => {
    const currentResources = watch("resources");
    const updatedResources = currentResources.map((resource) =>
      resource.id === resourceId
        ? { ...resource, selected: !resource.selected }
        : resource
    );
    setValue("resources", updatedResources);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Role
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Role Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Permissions
          </Typography>
          {isResourcesLoading ? (
            <Typography>Loading resources...</Typography>
          ) : (
            <Grid container spacing={2}>
              {watch("resources")?.map((resource) => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={resource.selected}
                        onChange={() => handleResourceToggle(resource.id)}
                        name={resource.name}
                      />
                    }
                    label={resource.name}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Role"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CreateRole;
