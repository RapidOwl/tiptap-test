import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";

import { Node } from "@tiptap/core";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const Horse = Node.create({
  name: "horse",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  parseHTML() {
    return [{ tag: "span[data-horse]" }];
  },

  renderHTML() {
    return ["span", { "data-horse": "", class: "horse-atom" }, "horse"];
  },
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Horse],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  const json = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.getJSON(),
  });

  return (
    <>
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().insertContent({ type: "horse" }).run()
          }
          disabled={!editor}
        >
          horse
        </button>
      </div>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        This is the bubble menu (that we could perhaps use for parameters)
      </BubbleMenu>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </>
  );
};

export default Tiptap;
