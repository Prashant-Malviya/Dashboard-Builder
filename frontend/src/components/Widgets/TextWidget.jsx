import ReactQuill from "react-quill";


const modules = {
  toolbar: [
    ["bold", "italic"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }],
  ],
};

export default function TextWidget({ content, isSelected, onChange }) {
  return (
    <div className="widget-quill w-full h-full bg-white">
      <ReactQuill
        theme="snow"
        value={content.html}
        onChange={(html) => onChange({ ...content, html })}
        modules={modules}
        readOnly={!isSelected}
        placeholder="Click to edit this text..."
        className="h-full"
      />
    </div>
  );
}
