class Note {
  title: string;
  content: string;
  targetDate: Date | null;
  public creationDate: Date = new Date()
  bgColor: string;

  constructor(
    title: string,
    content: string,
    targetDate: Date | null,
    bgColor: string,
  ) {
    this.title = title;
    this.content = content;
    this.targetDate = targetDate;
    this.bgColor = bgColor;
  }
}
export default Note;

