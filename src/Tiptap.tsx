import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Node } from "@tiptap/core";

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
    extensions: [StarterKit, Horse],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  return (
    <>
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() => editor?.chain().focus("end").insertContent({ type: "horse" }).run()}
          disabled={!editor}
        >
          horse
        </button>
      </div>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default Tiptap;
