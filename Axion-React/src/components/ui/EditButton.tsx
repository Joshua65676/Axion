import { useState } from "react";
import { API_BASE_URL } from "../../constants/api";

interface Props {
  tweet_id: number;
  currentCategory: string;
  onUpdated: () => void;
}

const EditCategory: React.FC<Props> = ({
  tweet_id,
  currentCategory,
  onUpdated,
}) => {
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(currentCategory);

  const handleUpdate = () => {
    if (!newCategory.trim()) return;

    fetch(`${API_BASE_URL}/update_category.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `tweet_id=${tweet_id}&category=${encodeURIComponent(newCategory)}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditing(false);
          onUpdated();
        }
      });
  };

  return (
    <div className="flex items-center text-center gap-2 -mt-1.5 pl-3 justify-center">
      {editing ? (
        <div className="flex flex-row gap-2 pl-[5.5rem] justify-center items-center">
          <input
            type="text"
            title="update category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border px-2 py-1 rounded-[20px] w-[8rem] flex flex-row"
          />
          <button
            onClick={handleUpdate}
            className="px-2 py-1 bg-blue-600 text-white rounded cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setNewCategory(currentCategory);
            }}
            className="text-gray-500 text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="text-[12px] font-medium text-center text-Black flex flex-row mt-1">
            {currentCategory}
          </span>
          <div className="mt-1">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-sm cursor-pointer"
            >
              ✏️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditCategory;
