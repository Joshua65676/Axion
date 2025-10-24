import { useState } from "react";

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

    fetch("http://localhost/axion/Axion-PHP/update_category.php", {
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
    <div className="flex items-center text-center gap-2 -mt-2 justify-center pl-12">
      {editing ? (
        <div className="flex flex-row gap-2 pl-[5.5rem] justify-center items-center">
          <input
            type="text"
            title="update category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border px-2 py-1 rounded-[20px] w-[7rem] flex flex-row"
          />
          <button
            onClick={handleUpdate}
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setNewCategory(currentCategory);
            }}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="text-[12px] font-medium text-center text-Black flex flex-row">
            {currentCategory}
          </span>
          <div className="">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-sm"
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
