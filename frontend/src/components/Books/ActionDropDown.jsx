import { useState } from "react";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";

const ActionDropdown = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-20">
          {onView && (
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
