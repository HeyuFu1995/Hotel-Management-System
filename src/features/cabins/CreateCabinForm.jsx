import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreaateAndMutateCabin from "./useCreateAndMutateCabin";



function CreateCabinForm({ cabinToEdit = {}, onClose }) {

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createOrMutateCabin: mutate } = useCreaateAndMutateCabin(cabinToEdit);

  function onSubmit(data) {
    mutate({ ...data, id: cabinToEdit?.id, image: (data.image && !(typeof data.image === "string")) ? data.image[0] : data.image }, {
      onSuccess: () => {
        reset();
        onClose?.();
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? "modal" : "regulary"}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input type="text" id="name" {...register("name", {
          required: "This field is required",
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should at least 1",
          },
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 100,
            message: "Price should at least 100",
          },
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price",
        })} disabled={isCreating} />
      </FormRow>

      <FormRow error={errors?.description?.message} label="description">
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required",
        })} disabled={isCreating} />
      </FormRow>

      <FormRow label="image">
        <FileInput id="image" accept="image/*" disabled={isCreating} {...register("image", {
          required: isEditSession ? false : "This field is required",
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession ? "Edit cabin" : "Create cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
