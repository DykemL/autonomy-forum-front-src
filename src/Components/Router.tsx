import { Routes, Route } from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import Forum from "./Pages/Forum";
import Login from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import Register from "./Pages/Register";
import SectionPage from "./Pages/SectionPage";
import Test from "./Pages/Test";
import TopicPage from "./Pages/TopicPage";
import UserPage from "./Pages/UserPage";

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Forum />} />
        <Route path='forum' element={<Forum />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='test' element={<Test />} />

        <Route path='sections/:sectionId' element={<SectionPage />} />
        <Route path='topics/:topicId' element={<TopicPage />} />
        <Route path='users/:userId' element={<UserPage />} />
        <Route path='profile' element={<NotFoundPage />} />

      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter;