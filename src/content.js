import { createStore } from 'redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import reducers from './reducers';
import { setStats } from './actions/marker';
import { mark, unmark } from './mark';

let stateJson0;
let toUnmark = false;
let stats = false;

const render = (store, tabHidden) => {
  const o = store.getState();
  const {account, marker, settings} = o;
  const state = {
    account: account && { keywords: account.keywords },
    marker: marker && { enabled: marker.enabled },
    settings
  };
  const stateJson = JSON.stringify(state);
  if (stateJson === stateJson0)
    return false;
  const toMark = account.keywords && marker.enabled;
  if (toUnmark) {
    unmark();
  }
  stateJson0 = stateJson;
  if (tabHidden)
    return false;
  stats = false;
  if (!toMark)
    return false;
  toUnmark = toMark;
  const {keywords} = account;
  const {matchWhole, matchCase} = settings;
  stats = mark({
    keywords, matchWhole, matchCase, style: style(settings)
  });
  updateStats(store);
  return true;
};

const style = settings => {
  const {color, colorBg, bold, underline} = settings;
  const acc = [];
  color && acc.push( ['color', color] );
  colorBg && acc.push( ['background-color', colorBg] );
  (color || colorBg) && acc.push( ['padding', '0.2em'] );
  bold && acc.push( ['font-weight', 'bold'] );
  underline && acc.push( ['text-decoration', 'underline'] );
  return acc.map( v => v[0] + ':' + v[1] ).join( ';' );
};

const updateStats = (store) => {
  stats && store.dispatch(setStats(stats));
};

// No advertising:
const removeAdv = () => {
  const conds = [
    // Яндекс.Почта:
    // 'div[data-key="view=ewmslep"]',
    '.mail-DirectLineContainer',

    '.ns-view-left-box > div:nth-child(7)',
    '.ns-view-left-box > div:nth-child(8)'
  ];
  for (const cond of conds) {
    const elm = document.querySelector(cond);
    if (!!elm) {
      elm.style.transition = "all 0.3s linear";
      elm.style.border = "1px dashed red";
      elm.style.opacity = 0.5;
      elm.style['background-color'] = "rgba(255,0,0,0.25)";
      setTimeout(() => {
        elm.style.display = "none";
      }, 3000)
    }
  }
}

(async () => {
  chrome.runtime.onMessage.addListener( data => {
    // if current tab received focus, apply mark/unmark operations (if any),
    // then, if there was no mark operation, update marker stats
    switch (true) {
      case (data && data.id === 'tabFocused'):
        !render(store) && updateStats(store);

        // No advertising:
        setTimeout(removeAdv, 5000)
        break;
      default: break;
    }
  });

  const store = await storeCreatorFactory({createStore})(reducers);
  store.subscribe(() => {
    render(store, document.hidden);
  });
  render(store);
})();

