import { Routes, Route } from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import ForumPage from "./Pages/ForumPage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import RegisterPage from "./Pages/RegisterPage";
import SectionPage from "./Pages/SectionPage";
import TopicPage from "./Pages/TopicPage";
import UserPage from "./Pages/UserPage";

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<ForumPage />} />
        <Route path='forum' element={<ForumPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

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