"use client";

import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Heading } from "@tiptap/extension-heading";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import {
  FiBold,
  FiItalic,
  FiLink,
  FiList,
  FiGrid,
  FiImage,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiPlus,
  FiMinus,
  FiCopy,
} from "react-icons/fi";
import CloudinaryUploader from "./CloudinaryUploader";

export default function PostEditor({
  post = null,
  initialPost = null,
  onPostCreated = null,
  onPostUpdated = null,
}) {
  // Use `post` primarily, fallback to `initialPost` for backwards compatibility
  const activePost = post || initialPost;

  const [title, setTitle] = useState(activePost?.title || "");
  const [category, setCategory] = useState(activePost?.category || "");
  const [imageUrl, setImageUrl] = useState(activePost?.imageUrl || "");
  const [seoTitle, setSeoTitle] = useState(activePost?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    activePost?.seoDescription || "",
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        bold: false, // ← ADD THIS
        italic: false, // ← ADD THIS
        link: false, // ← ADD THIS
        heading: false, // ← ADD THIS
      }),
      Bold,
      Italic,
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        allowBase64: true,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-6",
        },
      }),
      ListItem,
    ],
    content: activePost?.content || "<p>Start writing...</p>",
    immediatelyRender: false,
  });

  // Sync state when editing a new post
  useEffect(() => {
    if (activePost) {
      setTitle(activePost.title || "");
      setCategory(activePost.category || "");
      setImageUrl(activePost.imageUrl || "");
      setSeoTitle(activePost.seoTitle || "");
      setSeoDescription(activePost.seoDescription || "");
      if (editor && editor.getHTML() !== activePost.content) {
        editor.commands.setContent(activePost.content || "");
      }
    } else {
      setTitle("");
      setCategory("");
      setImageUrl("");
      setSeoTitle("");
      setSeoDescription("");
      if (editor) {
        editor.commands.setContent("<p>Start writing...</p>");
      }
    }
  }, [activePost, editor]);

  const handleSavePost = async () => {
    if (!title.trim() || !category.trim() || !editor?.getHTML().trim()) {
      setMessage("Please fill in title, category, and content");
      setMessageType("error");
      return;
    }

    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const postData = {
        title: title.trim(),
        content: editor.getHTML(),
        category: category.trim(),
        ...(imageUrl && { imageUrl: imageUrl.trim() }),
        ...(seoTitle && { seoTitle: seoTitle.trim() }),
        ...(seoDescription && { seoDescription: seoDescription.trim() }),
      };

      // If editing existing post
      if (activePost?._id) {
        postData.id = activePost._id;
        const res = await fetch("/api/posts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        const data = await res.json();
        if (data.success) {
          setMessage("Post updated successfully");
          setMessageType("success");
          if (onPostUpdated) onPostUpdated(data.data);
          // Clear form after 2 seconds
          setTimeout(() => {
            setTitle("");
            setCategory("");
            setImageUrl("");
            setSeoTitle("");
            setSeoDescription("");
            editor.commands.clearContent();
            setMessage("");
          }, 2000);
        } else {
          setMessage(data.error || "Failed to update post");
          setMessageType("error");
        }
      } else {
        // Creating new post
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        const data = await res.json();
        if (data.success) {
          setMessage("Post created successfully");
          setMessageType("success");
          if (onPostCreated) onPostCreated(data.data);
          // Clear form after 2 seconds
          setTimeout(() => {
            setTitle("");
            setCategory("");
            setImageUrl("");
            setSeoTitle("");
            setSeoDescription("");
            editor.commands.clearContent();
            setMessage("");
          }, 2000);
        } else {
          setMessage(data.error || "Failed to create post");
          setMessageType("error");
        }
      }
    } catch (err) {
      console.error("Error saving post:", err);
      setMessage("Error saving post");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 6, cols: 6, withHeaderRow: true })
      .run();
  };

  const addTableRow = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteTableRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const addTableColumn = () => {
    editor.chain().focus().addColBefore().run();
  };

  const deleteTableColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const mergeCells = () => {
    editor.chain().focus().mergeCells().run();
  };

  const splitCell = () => {
    editor.chain().focus().splitCell().run();
  };

  if (!editor) return <div className="p-4">Loading editor...</div>;

  return (
    <div className="bg-white text-black p-6 rounded shadow">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Post Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category *
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Tech, Lifestyle, News"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Featured Image
        </label>
        <CloudinaryUploader
          imageUrl={imageUrl}
          onImageChange={setImageUrl}
        />
      </div>

      {/* SEO Title */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          SEO Title
        </label>
        <input
          type="text"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="SEO title for search engines"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* SEO Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          SEO Description
        </label>
        <textarea
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          placeholder="SEO description for search engines"
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap gap-2 bg-gray-100 p-3 rounded border border-gray-300">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Bold"
        >
          <FiBold size={18} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Italic"
        >
          <FiItalic size={18} />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Underline"
        >
          <u>U</u>
        </button>

        {/* Link */}
        <button
          onClick={addLink}
          className={`p-2 rounded ${editor.isActive("link") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Link"
        >
          <FiLink size={18} />
        </button>

        {/* Heading */}
        <select
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : ""
          }
          onChange={(e) => {
            if (e.target.value) {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(e.target.value) })
                .run();
            } else {
              editor.chain().focus().setParagraph().run();
            }
          }}
          className="p-2 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
          title="Heading"
        >
          <option value="">Paragraph</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        {/* Align Left */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Align Left"
        >
          <FiAlignLeft size={18} />
        </button>

        {/* Align Center */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Align Center"
        >
          <FiAlignCenter size={18} />
        </button>

        {/* Align Right */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Align Right"
        >
          <FiAlignRight size={18} />
        </button>

        {/* Table */}
        <button
          onClick={insertTable}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Insert Table"
        >
          <FiGrid size={18} />
        </button>

        {/* Add Row */}
        <button
          onClick={addTableRow}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Add Row"
        >
          <div className="flex items-center text-sm font-bold">+R</div>
        </button>

        {/* Delete Row */}
        <button
          onClick={deleteTableRow}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Delete Row"
        >
          <div className="flex items-center text-sm font-bold">-R</div>
        </button>

        {/* Add Column */}
        <button
          onClick={addTableColumn}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Add Column"
        >
          <div className="flex items-center text-sm font-bold">+C</div>
        </button>

        {/* Delete Column */}
        <button
          onClick={deleteTableColumn}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Delete Column"
        >
          <div className="flex items-center text-sm font-bold">-C</div>
        </button>

        {/* Image */}
        <button
          onClick={addImage}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-200"
          title="Insert Image"
        >
          <FiImage size={18} />
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded flex items-center justify-center ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Bullet List"
        >
          <FiList size={18} />
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded font-bold text-sm w-9 h-9 flex items-center justify-center ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
          title="Ordered List"
        >
          1.
        </button>
      </div>

      {/* Editor */}
      <div className="mb-4 border border-gray-300 rounded p-4 bg-white editor">
        <EditorContent editor={editor} className="min-h-96" />
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded text-sm ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSavePost}
        disabled={saving}
        className={`w-full py-3 rounded font-semibold text-white ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {saving ? "Saving..." : activePost ? "Update Post" : "Create Post"}
      </button>
    </div>
  );
}
