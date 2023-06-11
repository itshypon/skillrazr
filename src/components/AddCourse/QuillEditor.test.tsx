import { render, screen, fireEvent } from "@testing-library/react";
import QuillEditor from "./QuillEditor";

const chapter = {
  id: 1,
  title: "Chapter Title",
  content: "Chapter Content",
};

describe("QuillEditor", () => {
  test("renders editor by default", () => {
    render(<QuillEditor chapter={chapter} chapterSaveHandler={jest.fn()} />);

    const editorElement = screen.getByRole("textbox");
    expect(editorElement).toBeInTheDocument();
  });

  test("renders preview when toggle switch is clicked", () => {
    render(<QuillEditor chapter={chapter} chapterSaveHandler={jest.fn()} />);

    const quiEditor = screen.getByTestId("quill-edit-mode");
    expect(quiEditor).toBeInTheDocument();

    const toggleSwitch = screen.getByLabelText("Preview");

    fireEvent.click(toggleSwitch);

    expect(quiEditor).not.toBeInTheDocument();
  });

  test("renders in read-only mode when readOnly prop is true", () => {
    render(
      <QuillEditor chapter={chapter} chapterSaveHandler={jest.fn()} readOnly />
    );

    const previewElement = screen.getByText(chapter.content);
    expect(previewElement).toBeInTheDocument();

    const toggleSwitch = screen.queryByLabelText("Preview");
    expect(toggleSwitch).not.toBeInTheDocument();
  });
});
