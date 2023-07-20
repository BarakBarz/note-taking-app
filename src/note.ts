class Note {
  title: string;
  content: string;
  targetDate: Date | null;
  creationDate: Date;
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
    this.creationDate = new Date(); // current date and time
    this.bgColor = bgColor;
  }
}
export default Note;

