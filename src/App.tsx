import { Outlet } from "react-router";
import Header from "./layouts/Header/Header";
import QuizesProvider from "./providers/QuizesProvider";
import MessageProvider from "./providers/MessageProvider";
import Message from "./ui/Message";
import Modal from "./ui/Modal";

function App() {
  return (
    <div className="max-sm:flex max-sm:flex-col-reverse  border-zinc-300 h-full max-h-full max-w-[480px] mx-auto">
        <div className="h-[12%]">
          <Header />
        </div>
        <main className="h-[88%]" >
          <MessageProvider>
            <Message/>
            <Modal/>
            <QuizesProvider>
              <Outlet/>
            </QuizesProvider>
          </MessageProvider>
        </main>
    </div>
  )
}

export default App
