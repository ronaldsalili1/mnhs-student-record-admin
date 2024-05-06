import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom';

// Layouts
import Basic from './layouts/Basic';
import Navigation from './layouts/Navigation';

import LoginPage from './containers/LoginPage/LoginPage';

// Administrator Page
import AdministratorPage from './containers/AdministratorPage/AdministratorPage';
import AdministratorDetailPage from './containers/AdministratorDetailPage/AdministratorDetailPage';

// Student Page
import StudentPage from './containers/StudentPage/StudentPage';
import StudentDetailPage from './containers/StudentDetailPage/StudentDetailPage';

// Teacher Page
import TeacherPage from './containers/TeacherPage/TeacherPage';
import TeacherDetailPage from './containers/TeacherDetailPage/TeacherDetailPage';

// School Information Page
import SchoolInformationPage from './containers/SchoolInformationPage/SchoolInformationPage';

// Subject Page
import SubjectPage from './containers/SubjectPage/SubjectPage';
import SubjectDetailPage from './containers/SubjectDetailPage/SubjectDetailPage';

// Semester Page
import SemesterPage from './containers/SemesterPage/SemesterPage';
import SemesterDetailPage from './containers/SemesterDetailPage/SemesterDetailPage';

// Section Page
import SectionPage from './containers/SectionPage/SectionPage';
import SectionDetailPage from './containers/SectionDetailPage/SectionDetailPage';

// Student Form Page
import FormPage from './containers/FormPage/FormPage';

// Grade Submissions
import GradeSubmissions from './containers/GradeSubmissions/GradeSubmissions';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Basic />}>
                <Route
                    path="/"
                    element={<LoginPage/>}
                />
                <Route
                    path="login"
                    element={<LoginPage/>}
                />
            </Route>
            <Route element={<Navigation/>}>
                <Route
                    path="grade-submissions"
                    element={<GradeSubmissions/>}
                />
                <Route
                    path="students"
                    element={<StudentPage/>}
                />
                <Route
                    path="teachers"
                    element={<TeacherPage/>}
                />
                <Route
                    path="subjects"
                    element={<SubjectPage/>}
                />
                <Route
                    path="semesters"
                    element={<SemesterPage/>}
                />
                <Route
                    path="school-info"
                    element={<SchoolInformationPage/>}
                />
                <Route
                    path="sections"
                    element={<SectionPage/>}
                />
                <Route
                    path="forms"
                    element={<FormPage/>}
                />
                <Route
                    path="administrators"
                    element={<AdministratorPage/>}
                />
            </Route>
            <Route element={<Navigation breadcrumb={true}/>}>

                {/* Student Pages */}
                <Route
                    path="students/:studentId/:tab"
                    element={<StudentDetailPage/>}
                />
                <Route
                    path="students/create"
                    element={<StudentDetailPage/>}
                />

                {/* Teacher Pages */}
                <Route
                    path="teachers/create"
                    element={<TeacherDetailPage/>}
                />
                <Route
                    path="teachers/:teacherId/:tab"
                    element={<TeacherDetailPage/>}
                />
                

                {/* Semester Pages */}
                <Route
                    path="semesters/:semesterId"
                    element={<SemesterDetailPage/>}
                />
                <Route
                    path="semesters/create"
                    element={<SemesterDetailPage/>}
                />

                {/* Subject Pages */}
                <Route
                    path="subjects/:subjectId/:tab"
                    element={<SubjectDetailPage/>}
                />
                <Route
                    path="subjects/create"
                    element={<SubjectDetailPage/>}
                />

                {/* Section Pages */}
                <Route
                    path="sections/:sectionId/:tab"
                    element={<SectionDetailPage/>}
                />
                <Route
                    path="sections/create"
                    element={<SectionDetailPage/>}
                />

                {/* Administrator Pages */}
                <Route
                    path="administrators/:adminId"
                    element={<AdministratorDetailPage/>}
                />
                <Route
                    path="administrators/create"
                    element={<AdministratorDetailPage/>}
                />
            </Route>
        </Route>,
    ),
    {
        basename: '/admin',
    },
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;