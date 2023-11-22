import "./App.css";
import "./index.css";

import { useEffect, useState } from "react";

import Create_Parent from "./components/Create_Parent.tsx";
import Item_Block from "./components/Item_Block.jsx";
function App() {
    // 123
    const locales = ["en", "sc", "tc"];
    const [allItems, setItems] = useState({});
    function setParent(parent) {
        setItems((prev) => {
            prev[parent] = {};
            return { ...prev };
        });
        console.log(allItems);
    }
    function setChild(payload) {
        setItems((prev) => {
            let langs = {};
            let splitted = payload.value
                .split("\t")
                .filter((x) => x !== "");
            locales.forEach((item, index) => {
                {
                    langs[item] = splitted[index];
                }
            });
            prev[payload.name][payload.key] = langs;
            return { ...prev };
        });
        console.log(allItems);
    }

    const [listItemKeys, setListItemKeys] = useState([]);
    useEffect(() => {
        setListItemKeys(Object.keys(allItems));
    }, [allItems]);

    return (
        <div className="App">
            <main>
                <h1 className="py-6">i18n handler</h1>
                <ul className="mb-10">
                    {listItemKeys.map((item) => {
                        return (
                            <Item_Block
                                key={`item-parent-${item}`}
                                itemName={item}
                                itemChild={allItems[item]}
                                setChildItem={setChild}
                            />
                        );
                    })}
                </ul>
                <Create_Parent setParentItem={setParent} />
            </main>
        </div>
    );
}

export default App;
