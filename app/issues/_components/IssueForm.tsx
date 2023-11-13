"use client";
import { Select } from "@/app/components";
import ErrorMessage from "@/app/components/ErrorMessage";
import { statusOptions } from "@/app/components/Select";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
  isEdit: boolean;
}

const IssueForm = ({ issue, isEdit }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultStatus =
    statusOptions.find((option) => option.value === issue?.status)?.value ||
    statusOptions[0].value;
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const requestData = issue ? { ...data, status: selectedStatus } : data;
      if (issue) axios.patch(`/api/issues/${issue.id}`, requestData);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Flex justify={"between"} gap={"4"}>
          <TextField.Root className="w-full">
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>
          {isEdit && (
            <Select
              selectedStatus={selectedStatus}
              onChange={handleStatusChange}
            />
          )}
        </Flex>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
