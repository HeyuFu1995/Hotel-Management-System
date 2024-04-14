import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './store.js';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './ui/ErrorFallback.jsx';

// 重写fetch方法
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
  // 获取cookie
  const session = localStorage.getItem("userInfo");
  // 如果有cookie，则添加到请求头中
  if (session) {
    options = options || {};
    options.headers = options.headers || new Headers();
    options.headers.append("userInfo", session);
  }
  // 执行原始的fetch请求
  return originalFetch(url, options);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
