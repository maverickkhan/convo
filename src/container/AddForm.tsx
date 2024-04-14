import { Button, Card, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "./FormField";
import { Data } from "../App";

export const AddForm: FC<{ defaultValues?: Data; onSubmit: (value: Data) => Promise<void>; }> = ({
  onSubmit, defaultValues,
}) => {
  const form = useForm<Data>({ mode: "onTouched", defaultValues: {} });

  const handleSubmit = (values: Data) => {
    onSubmit(values).then(() => form.reset({
      id: "",
      date: "",
      title: "",
      upvotes: "" as any,
    })
    );
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Card>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
        <div>Add Record</div>
        <FormField
          control={form.control}
          name="title"
          rules={{
            required: { value: true, message: "Please enter some value" },
          }}
        >
          <TextField fullWidth placeholder="Enter title..." />
        </FormField>
        <FormField
          control={form.control}
          name="upvotes"
          rules={{
            min: { value: 0, message: "Value must be between 0 and 100" },
            max: { value: 100, message: "Value must be between 0 and 100" },
          }}
          transformChange={(value) => Number(value)}
        >
          <TextField fullWidth placeholder="Enter upvote number between 0 and 100..." type="number" />
        </FormField>
        <FormField
          key={String(form.formState.isSubmitted)}
          control={form.control}
          name="date"
          transformChange={(value: Date) => value.toISOString()}
          transformValue={(value: string) => (value ? new Date(value) : undefined)}
          rules={{
            required: { value: true, message: "Please enter some value" },
          }}
        >
          <DatePicker
            slotProps={{ textField: { fullWidth: true, placeholder: "Enter Data" } }}
            label="Basic date picker" />
        </FormField>
        <Button disabled={!form.formState.isValid} type="submit" variant="contained">
          {form.getValues("id") ? "Update" : "Add Data"}
        </Button>
      </form>
    </Card>
  );
};
