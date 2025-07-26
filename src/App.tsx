import { Outlet } from "react-router";
import Header from "./layouts/Header/Header";
import QuizesProvider from "./providers/QuizesProvider";
import MessageProvider from "./providers/MessageProvider";
import Message from "./ui/Message";
import Modal from "./ui/Modal";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-sm:flex max-sm:flex-col-reverse h-full max-h-full max-w-[480px] mx-auto glass-effect rounded-xl shadow-2xl overflow-hidden"
    >
        <div className="h-[12%] bg-gradient-to-r from-blue-600 to-purple-600">
          <Header />
        </div>
        <main className="h-[88%] bg-white/90" >
          <MessageProvider>
            <Message/>
            <Modal/>
            <QuizesProvider>
              <Outlet/>
            </QuizesProvider>
          </MessageProvider>
        </main>
    </motion.div>
  )
}

export default App
