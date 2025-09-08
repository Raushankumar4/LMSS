import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddBook } from "../../hooks/useAdmin";
import { useQueryClient } from "@tanstack/react-query";

const AddBook = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addBook, isPending } = useAddBook();

  const queryClient = useQueryClient();

  const onSubmit = (formData) => {
    addBook(
      { formData },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["books"] });
          toast.success(data.message || "Book added successfully!");
          reset();
          onClose();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Creation failed");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              type="text"
              {...register("isbn", { required: "ISBN is required" })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            {errors.isbn && (
              <p className="text-red-600 text-xs mt-1">{errors.isbn.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
