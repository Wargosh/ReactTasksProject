const useFormatText = () => {
  // Avoid that the input to insert undeseable characters
  const formatText = (text) => {
    var map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return text.replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  };

  return {
    formatText
  }
}

export default useFormatText