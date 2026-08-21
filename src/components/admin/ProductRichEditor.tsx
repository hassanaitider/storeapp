"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Extension } from "@tiptap/core";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadMediaFile } from "@/components/shop/ImageUploadButton";

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) =>
              element.style.fontSize?.replace(/['"]+/g, "") || null,
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run(),
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const COLORS = [
  "#121816",
  "#27594b",
  "#3f8b74",
  "#b09274",
  "#c62828",
  "#1565c0",
  "#6a1b9a",
  "#ffffff",
];

const SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];

type Props = {
  value: string;
  onChange: (html: string) => void;
  dir?: "rtl" | "ltr";
  placeholder?: string;
  label?: string;
};

export function ProductRichEditor({
  value,
  onChange,
  dir = "rtl",
  placeholder = "اكتب وصف المنتج هنا… يمكنك إدراج صور وGIF وتنسيق النص",
  label,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto my-3 mx-auto block",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-brand-700 underline" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        dir,
        class: cn(
          "prose-product min-h-[280px] max-h-[520px] overflow-y-auto px-4 py-3 outline-none focus:outline-none",
          dir === "rtl" ? "text-right" : "text-left"
        ),
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (normalizeHtml(current) !== normalizeHtml(next)) {
      editor.commands.setContent(next || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-sand-300 bg-white p-8 text-center text-sm text-[var(--muted)]">
        …
      </div>
    );
  }

  const insertImage = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadMediaFile(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt(
      dir === "rtl" ? "رابط URL" : "URL",
      prev || "https://"
    );
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <>
      {fullscreen ? (
        <button
          type="button"
          className="fixed inset-0 z-[70] bg-black/40"
          aria-label="Close fullscreen"
          onClick={() => setFullscreen(false)}
        />
      ) : null}

      <div
        className={cn(
          "overflow-hidden rounded-xl border border-sand-300 bg-white shadow-sm",
          fullscreen &&
            "fixed inset-3 z-[80] flex flex-col rounded-2xl shadow-2xl"
        )}
      >
        {label ? (
          <div className="border-b border-sand-200 bg-sand-50 px-4 py-2 text-sm font-bold text-ink-800">
            {label}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-0.5 border-b border-sand-200 bg-[#faf9f8] px-2 py-1.5">
          <ToolBtn
            title="Fullscreen"
            onClick={() => setFullscreen((v) => !v)}
            active={fullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <ToolBtn
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold className="h-4 w-4" strokeWidth={2.5} />
          </ToolBtn>
          <ToolBtn
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Strikethrough className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <select
            className="rounded border border-sand-300 bg-white px-1.5 py-1 text-xs"
            defaultValue="16px"
            title="Font size"
            onChange={(e) => {
              editor.chain().focus().setFontSize(e.target.value).run();
            }}
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s.replace("px", "")}
              </option>
            ))}
          </select>
          <div className="relative">
            <ToolBtn
              title="Text color"
              onClick={() => setShowColors((v) => !v)}
            >
              <span className="flex flex-col items-center leading-none">
                <span className="text-sm font-bold">A</span>
                <span
                  className="mt-0.5 h-0.5 w-4 rounded"
                  style={{
                    background:
                      (editor.getAttributes("textStyle").color as string) ||
                      "#121816",
                  }}
                />
              </span>
            </ToolBtn>
            {showColors ? (
              <div className="absolute start-0 top-full z-20 mt-1 flex gap-1 rounded-lg border border-sand-200 bg-white p-2 shadow-lg">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="h-6 w-6 rounded-full border border-sand-300"
                    style={{ background: c }}
                    onClick={() => {
                      editor.chain().focus().setColor(c).run();
                      setShowColors(false);
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <ToolBtn
            title="Clear formatting"
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <Eraser className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <ToolBtn
            title="Align right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
          >
            <AlignRight className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Align center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
          >
            <AlignCenter className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Align left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
          >
            <AlignLeft className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <ToolBtn
            title="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Link"
            onClick={setLink}
            active={editor.isActive("link")}
          >
            <Link2 className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <ToolBtn
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
          </ToolBtn>
          <ToolBtn
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
          </ToolBtn>
          <Sep />
          <ToolBtn
            title="Insert image / GIF"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            <ImagePlus className="h-4 w-4" />
          </ToolBtn>
          <input
            ref={fileRef}
            type="file"
        accept="*/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void insertImage(f);
              e.target.value = "";
            }}
          />
        </div>

        <EditorContent
          editor={editor}
          className={cn(
            "bg-white",
            fullscreen && "min-h-0 flex-1 overflow-auto"
          )}
        />
      </div>
    </>
  );
}

function ToolBtn({
  children,
  onClick,
  active,
  title,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-800 transition hover:bg-sand-100 disabled:opacity-40",
        active && "bg-brand-100 text-brand-800"
      )}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-sand-300" aria-hidden />;
}

function normalizeHtml(html: string) {
  return html.replace(/\s+/g, " ").trim();
}
