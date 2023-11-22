import { useEffect, useState } from "react";

import Child_Block from "./Child_Block";
function Item_Block({
    itemName,
    itemChild,
    setChildItem,
    delChild,
    delParent,
}) {
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
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl">{itemName}</h4>
                    <div className="grid grid-cols-2 w-fit gap-2">
                        <button
                            className="p-2 bg-red-600 rounded-full text-white"
                            onClick={() =>
                                delParent(itemName)
                            }
                        >
                            Delete Parent
                        </button>
                        <button
                            className="p-2 bg-black rounded-full text-white"
                            onClick={() =>
                                setExpandChild(!expandChild)
                            }
                        >
                            {expandChild ? (
                                <p>hide items</p>
                            ) : (
                                <p>show items</p>
                            )}
                        </button>
                    </div>
                </div>

                <table
                    className={`w-full mb-6 ${
                        !expandChild ? " hidden" : ""
                    }`}
                >
                    <thead>
                        <tr>
                            <th>key</th>
                            <th>values</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.keys(itemChild).map(
                            (key) => (
                                <Child_Block
                                    key={`${itemName}-item-${key}`}
                                    parentName={itemName}
                                    itemName={key}
                                    itemData={
                                        itemChild[key]
                                    }
                                    delChild={delChild}
                                />
                            )
                        )}
                    </tbody>
                </table>

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
