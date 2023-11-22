import { useEffect, useState } from "react";

function Child_Block({
    itemName,
    itemData,
    delChild,
    parentName,
}) {
    return (
        <tr>
            <td>{itemName}</td>
            <td className="">
                <p>en: {itemData.en}</p>
                <p>tc: {itemData.tc}</p>
                <p>sc: {itemData.sc}</p>
            </td>
            <td className="w-[20%]">
                <button
                    className="p-4 rounded-full bg-black text-white"
                    onClick={() =>
                        delChild({
                            parent: parentName,
                            key: itemName,
                        })
                    }
                >
                    DELETE
                </button>
            </td>
        </tr>
    );
}

export default Child_Block;
