import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProgramList } from '@/components/ProgramList';
import { ProgramDetail } from '@/components/ProgramDetail';
import { IoTProgramList, IoTProgramDetail } from '@/components/iot';
import { BasicProgramsCollection } from '@/components/BasicProgramsCollection';
import { Landing } from '@/pages/Landing';
import { About } from '@/pages/About';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Terms } from '@/pages/Terms';
import { Documentation } from '@/pages/Documentation';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Dashboard } from '@/pages/Dashboard';
import { AdminUserActivity } from '@/pages/AdminUserActivity';
import { NotFound } from '@/pages/NotFound';
import { getProgramsByLab, iotPrograms } from '@/data/programs';

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-10 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function AdminRoute() {
  const { user, isAdmin } = useAuth();
  // ProtectedRoute already guarantees a logged-in user; this guard additionally
  // restricts access to the configured admin account only.
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function GuestOnly() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route element={<GuestOnly />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/pc-lab"
            element={<ProgramList programs={getProgramsByLab('pc')} isLoading={false} error={null} lab="pc" />}
          />
          <Route
            path="/pc-lab/basic-programs"
            element={<BasicProgramsCollection />}
          />
          <Route
            path="/iot-lab"
            element={<IoTProgramList programs={iotPrograms} isLoading={false} error={null} />}
          />
          <Route path="/program/iot/:number" element={<IoTProgramDetail />} />
          <Route path="/program/:lab/:number" element={<ProgramDetail />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/user-activity" element={<AdminUserActivity />} />
          </Route>
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
