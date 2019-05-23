import { engineAccess, flagsModifiers, IRegexConfig } from './regex-engine.interfaces';

export const regexEngineConfig : IRegexConfig[] = [
  {
    allowedDelimiters: [ '/' ],
    apiURL: '',
    defaultDelimiters: { open: '/', close: '/' },
    defaultModifiers: 'ig',
    delimiterRequired: false,
    docsURL: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions',
    id: 'vanillaJS',
    modifiers: ['g', 'i', 'm', 'u', 'y'],
    modifiersName: flagsModifiers.flags,
    name: 'Vanilla JS',
    pairedDelimiters: [],
    type: engineAccess.local
  },
  {
    allowedDelimiters: [ '/' ],
    apiURL: '',
    defaultDelimiters: { open: '/', close: '/' },
    defaultModifiers: 'ig',
    delimiterRequired: false,
    docsURL: 'http://xregexp.com/',
    id: 'XRegExp',
    modifiers: ['g', 'i', 'm', 'u', 'y', 'n', 's', 'x', 'A'],
    modifiersName: flagsModifiers.flags,
    name: 'XRegExp',
    pairedDelimiters: [],
    type: engineAccess.local
  },
  {
    allowedDelimiters: [ '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '|', '[', ']', ':', ';', '"', '', '<', '>', '?', ',', '.', '/' ],
    apiURL: '',
    defaultDelimiters: { open: '`', close: '`' },
    defaultModifiers: 'is',
    delimiterRequired: true,
    docsURL: 'http://php.net/manual/en/book.pcre.php',
    id: 'pcre',
    modifiers: ['i', 'm', 's', 'x', 'A', 'D', 'S', 'U', 'X', 'J', 'u'],
    modifiersName: flagsModifiers.modifiers,
    name: 'PHP PCRE',
    pairedDelimiters: [
      { open: '(', close: ')' },
      { open: '<', close: '>' },
      { open: '[', close: ']' },
      { open: '{', close: '}' }
    ],
    type: engineAccess.remote
  }
];
