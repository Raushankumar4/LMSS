import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUser } from "../../hooks/useAuth";
import { useAuth } from "../../context/AuthContex";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useLoginUser();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        login({ token: data.token, user: data.user });
        toast.success(data?.message || "Login successful!");
        navigate("/");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center max-w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
