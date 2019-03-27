import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import intl from 'intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '../static/i18n/zh-CN';
import enUS from '../static/i18n/en';
import getQueryLanguage from '../static/util/getQueryLanguage';

addLocaleData([...en, ...zh]);

const { language } = window;

/* 将url中获取到的lang格式化 */
const languageMap = {
  'zh-CN': 'zh-CN',
  'en-US': 'en-US',
  'zh': 'zh-CN',
  'en': 'en-US'
};

const urlLanguage = getQueryLanguage('lang') || 'zh-CN';
if (languageMap[urlLanguage]) {
  window.language = languageMap[urlLanguage];
}

const withLocale = Component => {
  const langMap = {
    'zh-CN': zhCN,
    'en-US': enUS
  };

  return (props) => (
    <IntlProvider locale={window.language} messages={langMap[window.language]}>
      <Component {...props} />
    </IntlProvider>
  )
}
export default withLocale;