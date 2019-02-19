import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from '../static/i18n/zh-CN';
import en_US from '../static/i18n/en';
import getQueryLanguage from '../static/util/getQueryLanguage';

addLocaleData([...en, ...zh]);

let { language } = window;

/*将url中有可能获取到的lang格式化*/
const languageMap = {
  'zh-CN': 'zh-CN',
  'en-US': 'en-US',
  'zh': 'zh-CN',
  'en': 'en-US'
};

const urlLanguage = getQueryLanguage();
if (languageMap[urlLanguage]) {
  window.language = languageMap[urlLanguage];
}

const withLocale = Component => {
  const langMap = {
    'zh-CN': zh_CN,
    'en-US': en_US
  };

  return class extends Component {
    render() {
      return (
        <IntlProvider locale={window.language} messages={langMap[window.language]}>
          <Component {...this.props} />
        </IntlProvider>
      )
    }
  }
}
export default withLocale;