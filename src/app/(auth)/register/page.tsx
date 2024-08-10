'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { EyeOff, Eye } from 'lucide-react';
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { signup } from '@/store/slice/auth';
import { getOrganizationAll } from '@/store/slice/organization';


interface RegisterInterface {
  email: string | null
  password: string | null
  organization: number | null
}

const initialValues: RegisterInterface = {
  email: null,
  password: null,
  organization: null
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8).required('Required'),
  organization: Yup.number().required('Please choose an organization')
});


export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useAppSelector((state) => state.auth.loading);
  const organizations: any = useAppSelector((state) => state.organization.organizations);

  useEffect(() => {
    dispatch(getOrganizationAll());
  }, []);

  console.log({ organizations, loading });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (values: any) => {
    const payload = { ...values, organizationId: values.organization };
    delete payload.organization
    console.log({ payload });
    dispatch(signup(payload))
      .unwrap()
      .then((res: any) => {
        toast({
          title: res.message || 'Success',
        });
        router.push("/login");
      })
      .catch((error: any) => {
        console.log("email verification failed:", error);
        toast({
          title: error.message || 'Error occured',
          description: "Please try again"
        });
      });
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[440px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below
          </p>
        </div>
        <div className="grid gap-6">
          <Formik
            className="grid gap-4"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, setFieldValue }) => (
              <Form>
                <div className="grid gap-2">
                  <div className="grid gap-1 mb-4">
                    <Label className="mb-1" htmlFor="organization">
                      Select Organization
                    </Label>
                    <Field name="organization">
                      {({ field }: FieldProps) => (
                        <Select onValueChange={(value) => setFieldValue(field.name, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Organization" />
                          </SelectTrigger>
                          {organizations && organizations.length > 0
                            ? <SelectContent>
                              {organizations.map((org: { name: string, id: number }, index: number) => (
                                <SelectItem key={org.name} value={org.id.toString()}>
                                  {org.name.charAt(0).toUpperCase() + org.name.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                            : null}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage name="organization" component="div" className="text-red-500 !text-sm" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          className="focus:outline-none"
                          placeholder="user@example.com"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="email" component="div" className="text-red-500 !text-sm" />
                  </div>
                  <div className="mt-6 grid gap-1.5">
                    <Label htmlFor="password" className="mb-0">Password</Label>
                    <div className="relative">
                      <Field name="password" className="block">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className="bg-borderBg focus:outline-none"
                            placeholder="Enter Password"
                          />
                        )}
                      </Field>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-[25%]"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 !text-sm" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-4 disabled:cursor-not-allowed"
                    variant={isValid ? "default" : "secondary"}
                    disabled={!isValid || loading}
                  >
                    {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create account
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Have an account? {" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
