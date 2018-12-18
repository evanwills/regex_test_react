export const regexEngineConfig = [
  {
    "id": "vanillaJS",
    "apiURL": "",
    "defaultDelimiter": "",
    "delimiterRequired": false,
    "docsURL": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
    "modifiers": ["g", "i", "m", "u", "y"],
    "name": "Vanilla JS",
    "pairedDelimiters": {},
    "type": "local"
  },
  {
    "id": "xRegEx",
    "apiURL": "",
    "defaultDelimiter": "",
    "delimiterRequired": false,
    "docsURL": "http://xregexp.com/",
    "modifiers": ["g", "i", "m", "u", "y", "n", "s", "x", "A"],
    "name": "X RegEx",
    "pairedDelimiters": {},
    "type": "local"
  },
  {
    "id": "pcre",
    "apiURL": "",
    "defaultDelimiter": "`",
    "delimiterRequired": true,
    "docsURL": "http://php.net/manual/en/book.pcre.php",
    "modifiers": ["i", "m", "s", "x", "A", "D", "S", "U", "X", "J", "u"],
    "name": "PHP PCRE",
    "pairedDelimiters": {
      "(": ["(", ")"],
      "<": ["<", ">"],
      "[": ["[", "]"],
      "{": ["{", "}"]
    },
    "type": "remote"
  }
];
