import {useCallback, useEffect, useState} from "react";
import {EditorView} from "@codemirror/view";
import {placeholder} from "@codemirror/view";
import {EditorState} from "@codemirror/state";
import {basicSetup} from "codemirror";
import {darcula} from "@uiw/codemirror-theme-darcula";

export default function useCodeMirror() {
    const [element, setElement] = useState();

    const ref = useCallback((node) => {
        if (!node) return;

        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const myState = EditorState.create({
            extensions: [
                basicSetup,
                darcula,
                placeholder("Share the link for collaborative editing")
            ],
        })

        const view = new EditorView({
            state: myState,
            parent: element,
        });
        console.log(view.state.doc)

        return () => view.destroy();
    }, [element]);
    return {ref};
}