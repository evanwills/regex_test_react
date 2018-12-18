import {VanillaJSregex, XRegExpRegex} from './local-regex-engine.class'
import {RemoteRegex} from './remote-regex-engine.class'
import {RegexType, RegexConfig} from './regex-engine.interfaces'
import {RegexEngine} from './regex-engine.class'


export const getRegexEngine = (engineConfig: RegexConfig) : RegexEngine => {
  if (engineConfig.type === RegexType.remote) {
    return new RemoteRegex(engineConfig);
  } else if(engineConfig.id === 'vanillaJS') {
    return new VanillaJSregex(engineConfig);
  } else if(engineConfig.id === 'xRegEx') {
    return new XRegExpRegex(engineConfig);
  } else {
    throw new Error('Unknown regex type ID. "' + engineConfig.id + '" is not supported');
  }
}
