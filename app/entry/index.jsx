import App from '../containers/home'

import '../static/less/reset.less'
import '../static/less/base.less'

ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);

if (module.hot) {
  module.hot.accept()
}