const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const msgStyle = {
    color: message.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div className="message" style={msgStyle}>
      {message.content}
    </div>
  );
};

export default Notification;
