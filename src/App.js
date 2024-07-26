import { Body } from "./components/Body";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="flex flex-col gap-y-8">
      <Header />
      <Body />
    </div>
  );
}

export default App;
