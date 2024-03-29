import { Provider } from "react-redux";
import store from "./store";
import CommentWidget from "./pages/comment-widget";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CommentWidget />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
