import { Posts } from "./components/Posts";
import { AddPost } from "./components/AddPost";

import "./App.css";

function App() {
  return (
    <main>
      <Posts />
      <AddPost onSaved={console.log} />
    </main>
  );
}

export default App;
