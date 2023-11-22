import { useEffect, useState } from "react";

function Create_Parent({ setParentItem }) {
    const [editingName, setEditingName] =
        useState<Boolean>(false);
    function toggleEdit() {
        setEditingName(!editingName);
    }

    const [parent, setParent] = useState<String>("");
    function sendParent(event: any) {
        if (event.key === "Enter") {
            setParentItem(parent);
            setParent("");
            toggleEdit();
        }
    }

    return (
        <div className="rounded-xl bg-white text-black px-6 py-4 w-full cursor-pointer">
            {!editingName ? (
                <div
                    className="w-full flex items-center justify-between text-2xl"
                    onClick={toggleEdit}
                >
                    <p className="">+</p>
                    <p>Add Parent</p>
                </div>
            ) : (
                <input
                    className="w-full"
                    type="text"
                    placeholder="parent name"
                    value={parent} // ...force the input's value to match the state variable...
                    onChange={(e) =>
                        setParent(e.target.value)
                    }
                    onKeyDown={(e) => sendParent(e)}
                />
            )}
        </div>
    );
}

export default Create_Parent;
