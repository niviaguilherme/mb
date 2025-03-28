import { Fragment } from "react";

interface HighlightMatchProps {
  text: string;
  query: string;
}

export default function HighlightMatch({ text, query }: HighlightMatchProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part.toLowerCase() === query.toLowerCase() ? (
            <span
              style={{
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 0, 0.3)",
              }}
            >
              {part}
            </span>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
}
