"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      // QueueCare: Create user locally (no Appwrite)
      const user = {
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        createdAt: new Date().toISOString(),
      };

      // Store user in localStorage temporarily
      localStorage.setItem('queuecare-current-user', JSON.stringify(user));

      // Navigate to registration page
      router.push(`/patients/${user.id}/register`);
    } catch (error) {
      console.log("QueueCare registration error:", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome to QueueCare 👋</h1>
          <p className="text-dark-700">Smart queue management for South African clinics. Let's get you registered.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Thabo Mthembu"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email address"
          placeholder="thabo.mthembu@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="+27 82 123 4567"
        />

        <SubmitButton isLoading={isLoading}>Join Queue</SubmitButton>
      </form>
    </Form>
  );
};