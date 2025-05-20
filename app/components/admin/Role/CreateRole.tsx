"use client";

import React, { useEffect } from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
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
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetRoleByIdQuery,
} from "@lib/admin/store/services/role.service";
import { useGetAllResourcesQuery } from "@lib/admin/store/services/resource.service";
import CircularProgress from "@mui/material/CircularProgress";

const roleSchema = z.object({
  id: z.string().optional(),
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

interface CreateRoleProps {
  roleId?: string;
  onSuccess?: () => void;
}

const CreateRole = ({ roleId, onSuccess }: CreateRoleProps) => {
  const isEditMode = Boolean(roleId);

  // Data fetching
  const { data: existingRole, isLoading: isRoleLoading } = useGetRoleByIdQuery(
    roleId || "",
    {
      skip: !roleId,
    }
  );
  const { data: resourcesData, isLoading: isResourcesLoading } =
    useGetAllResourcesQuery();

  // Mutations
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

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

  // Initialize form based on mode (create/edit)
  useEffect(() => {
    if (resourcesData) {
      const initialResources = resourcesData.map((resource) => ({
        id: resource.id,
        name: resource.name,
        selected: isEditMode
          ? existingRole?.resources?.some((r) => r.id === resource.id) || false
          : false,
      }));

      const defaultValues =
        isEditMode && existingRole
          ? {
              id: existingRole.id,
              name: existingRole.name,
              description: existingRole.description || "",
              resources: initialResources,
            }
          : {
              name: "",
              description: "",
              resources: initialResources,
            };

      reset(defaultValues);
    }
  }, [resourcesData, existingRole, isEditMode, reset]);

  const onSubmit = async (data: RoleFormData) => {
    try {
      const payload = {
        // id: roleId,
        name: data.name,
        description: data.description,
        resourceIds: data.resources
          .filter((resource) => resource.selected)
          .map((resource) => resource.id),
      };

      if (roleId) {
        await updateRole({ id: roleId, ...payload }).unwrap();
      } else {
        await createRole(payload).unwrap();
      }

      onSuccess?.();
      if (!isEditMode) reset();
    } catch (error) {
      console.error("Failed to submit role:", error);
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

  if (isEditMode && isRoleLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {isEditMode ? "Edit Role" : "Create New Role"}
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
            disabled={isCreating || isUpdating}
            startIcon={
              isCreating || isUpdating ? <CircularProgress size={20} /> : null
            }
          >
            {isCreating || isUpdating
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Role"
              : "Create Role"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CreateRole;
