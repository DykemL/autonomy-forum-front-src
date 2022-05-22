import { Routes, Route } from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import Forum from "./Pages/Forum";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Test from "./Pages/Test";

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Forum />} />
        <Route path='forum' element={<Forum />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='test' element={<Test />} />
      </Route>
    </Routes>
  )
}

export default AppRouter;