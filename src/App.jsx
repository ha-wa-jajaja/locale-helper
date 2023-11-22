import "./App.css";
import "./index.css";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Create_Parent from "./components/Create_Parent.tsx";
import Item_Block from "./components/Item_Block.jsx";
function App() {
    const [cookies, setCookie] = useCookies([
        "localeHelperContent",
    ]);
    const locales = ["en", "tc", "sc"];
    const [allItems, setItems] = useState({});
    useEffect(() => {
        if (
            Object.keys(cookies).includes(
                "localeHelperContent"
            )
        ) {
            setItems(cookies.localeHelperContent);
        }
    }, []);

    function setParent(parent) {
        setItems((prev) => {
            prev[parent] = {};
            return { ...prev };
        });
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
    }

    function delParent(parent) {
        let check = prompt(
            `Delete ${parent} and all its child? type y to continue`,
            "no"
        );

        if (check === "y") {
            setItems((prev) => {
                let items = { ...prev };
                delete items[parent];
                return items;
            });
        }
    }

    function delChild(payload) {
        let check = prompt(
            `Delete ${payload.key}? type y to continue`,
            "no"
        );

        if (check === "y") {
            setItems((prev) => {
                delete prev[payload.parent][payload.key];
                return { ...prev };
            });
        }
    }

    const [listItemKeys, setListItemKeys] = useState([]);
    useEffect(() => {
        setListItemKeys(Object.keys(allItems));
        setCookie(
            "localeHelperContent",
            JSON.stringify(allItems)
        );
    }, [allItems]);

    async function GenerateLocaleContent(locale) {
        try {
            const rawObj = JSON.parse(
                JSON.stringify(allItems)
            );
            Object.keys(rawObj).forEach((parent) => {
                Object.keys(rawObj[parent]).forEach(
                    (item) => {
                        rawObj[parent][item] =
                            rawObj[parent][item][locale];
                    }
                );
            });

            await navigator.clipboard.writeText(
                JSON.stringify(rawObj)
            );
            alert("Copied to clipboard");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    }

    return (
        <div className="App">
            <main className="pb-20">
                <h1 className="py-6">i18n handler</h1>
                <div className="w-[500px] grid grid-cols-3 gap-6 mb-8 ">
                    <button
                        className="p-6 bg-white rounded-xl text-black"
                        onClick={() =>
                            GenerateLocaleContent("en")
                        }
                    >
                        Generate en
                    </button>
                    <button
                        className="p-6 bg-red-400 rounded-xl text-white"
                        onClick={() =>
                            GenerateLocaleContent("tc")
                        }
                    >
                        Generate tc
                    </button>
                    <button
                        className="p-6 bg-green-400 rounded-xl text-white"
                        onClick={() =>
                            GenerateLocaleContent("sc")
                        }
                    >
                        Generate sc
                    </button>
                </div>
                <ul className="mb-10">
                    {listItemKeys.map((item) => {
                        return (
                            <Item_Block
                                key={`item-parent-${item}`}
                                itemName={item}
                                itemChild={allItems[item]}
                                setChildItem={setChild}
                                delParent={delParent}
                                delChild={delChild}
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
