import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import './app/styles/global.scss';
import 'react-toastify/ReactToastify.css';

import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { BrowserRouter } from 'react-router-dom';

import { observeWindowResize } from './app/utils/resizeObserver';
import { setDocumentHeight } from './app/utils/setDocumentHeight';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';

Modal.setAppElement('#root');
observeWindowResize();
setDocumentHeight();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>,
);
