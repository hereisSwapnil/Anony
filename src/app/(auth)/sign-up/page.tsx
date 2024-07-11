"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/signUpSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const formMethods = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const response = await axios.post("/api/auth/signup", values);
      toast.success(response.data.message);
      router.push("/signin"); // Redirect to sign-in page after successful registration
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        toast.error(error.response.data.error || "Sign-up failed");
      } else {
        toast.error("Sign-up failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white md:bg-[#f7f3ff]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md justify-center flex flex-col items-center">
        <img
          src="https://i.postimg.cc/zXVGFHCC/Anony-removebg-preview-1.png"
          alt=""
          className="w-[200px] md:w-[300px] mb-10 md:mb-20"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      className="mt-1 block w-full"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      className="mt-1 block w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="mt-1 block w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
