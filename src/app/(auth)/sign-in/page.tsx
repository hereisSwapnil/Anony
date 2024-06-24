"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schema/signInSchema";
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
import { signIn } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const formMethods = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    signIn("credentials", values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .post("/api/signin", values)
    //   .then((response) => {
    //     if (response.data.success) {
    //       router.push("/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("---error---");
    //     console.log(error.response.data.message);
    //     console.log("---error---");
    //   });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white md:bg-[#f7f3ff]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md justify-center flex flex-col items-center">
        <img
          src="https://i.postimg.cc/zXVGFHCC/Anony-removebg-preview-1.png"
          alt=""
          className="w-[200px] md:w-[300px] mb-10 md:mb-20"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
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
            <Button type="submit">Login</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
