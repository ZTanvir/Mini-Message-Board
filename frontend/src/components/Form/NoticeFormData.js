const NoticeFromData = [
  {
    id: crypto.randomUUID(),
    labelText: "Notice Title",
    type: "text",
    placeHolder: "Annual Sports Day",
    name: "noticeTitle",
    isRequired: true,
  },
  {
    id: crypto.randomUUID(),
    labelText: "Notice Descriptions",
    type: "textarea",
    placeHolder: "The school will be celebrating its Annual Sports Day on....",
    name: "noticeDescription",
    isRequired: true,
    rows: 6,
    cols: 40,
  },
];
export default NoticeFromData;
