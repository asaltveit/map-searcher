// Utility: Strip comments from JSON (for config files that may have comments)
// This is used when processing config files that contain // or /* */ comments

function stripJsonComments(jsonString) {
  // Remove single-line comments
  let result = jsonString.replace(
    /\/\/.*$/gm,
    "",
  );

  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");

  return result;
}

module.exports = { stripJsonComments };
