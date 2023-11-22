import { useEffect, useState } from "react";

function Item_Block({ itemName, itemChild, setChildItem }) {
    const [expandChild, setExpandChild] = useState(false);
    const [key, setKey] = useState("");
    const [values, setValues] = useState("");

    function sendParent(event) {
        if (event.key === "Enter") {
            if (key === "" || values === "") {
                alert("cannot be empty");
                return;
            }
            setChildItem({
                name: itemName,
                key: key,
                value: values,
            });
            setKey("");
            setValues("");
        }
    }

    return (
        <li className="mb-6">
            <div className="w-full bg-white text-black p-4 rounded-xl text-left">
                <h4 className="text-xl">{itemName}</h4>

                <div className="w-full border border-grey-700 rounded-xl p-2">
                    <p className="mb-1">Add new item</p>
                    <div className="grid grid-cols-2 gap-4  rounded-lg ">
                        <input
                            className="border border-grey-300"
                            type="text"
                            placeholder="key"
                            value={key}
                            onChange={(e) =>
                                setKey(e.target.value)
                            }
                            onKeyDown={(e) => sendParent(e)}
                        />
                        <input
                            className="border border-grey-300"
                            type="text"
                            placeholder="values"
                            value={values}
                            onChange={(e) =>
                                setValues(e.target.value)
                            }
                            onKeyDown={(e) => sendParent(e)}
                        />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Item_Block;
