'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { signin } from '@/store/slice/auth';
import { EyeOff, Eye } from 'lucide-react';
interface LoginValues {
  email: string;
  password: string
}

const initialValues: LoginValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});


export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const loading = useAppSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);

  console.log({ loading });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (values: any) => {
    const payload = { ...values }

    dispatch(signin(payload))
      .unwrap()
      .then((res: any) => {
        toast({
          title: res.message || 'Success',
        });
        // router.push("/pokemons");
      })
      .catch((error: any) => {
        console.log("email verification failed:", error);
        toast({
          title: error.message || 'Error occured',
          description: 'Please try later',
        });
      });
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[440px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login here
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
            {({ isValid }) => (
              <Form>
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
                  <Label htmlFor="email" className="mb-0">Password</Label>
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
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Dont have an account? {" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Register here
          </Link>
        </p>
      </div>
    </div >
  )
}
