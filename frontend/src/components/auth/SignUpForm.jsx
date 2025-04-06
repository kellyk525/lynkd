import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import InputField from "../shared/InputField.jsx";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      //   const res = await fetch("http://localhost:3000/api/v1/auth/signup", {
      //     body: JSON.stringify(data),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //   });
      //   return await res.json();
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password });
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <InputField
        type="text"
        value={name}
        placeholder="Full Name"
        required={true}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        type="text"
        value={username}
        placeholder="Username"
        required={true}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="email"
        value={email}
        placeholder="Email"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        value={password}
        placeholder="Password (6+ characters)"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="submit-button w-full"
      >
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
