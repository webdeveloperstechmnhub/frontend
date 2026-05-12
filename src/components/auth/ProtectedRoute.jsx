import { Navigate, useLocation } from 'react-router-dom';
import { hasInstituteSession, hasStudentSession } from '../../utils/session';

const ACCESS_CHECKS = {
  institute: hasInstituteSession,
  student: hasStudentSession,
};

const ProtectedRoute = ({ role = 'institute', children }) => {
  const location = useLocation();
  const checker = ACCESS_CHECKS[role] || (() => false);

  if (!checker()) {
    if (role === 'student' && hasInstituteSession()) {
      return <Navigate to="/institute/dashboard" replace state={{ from: location.pathname }} />;
    }

    if (role === 'institute' && hasStudentSession()) {
      return <Navigate to="/student/dashboard" replace state={{ from: location.pathname }} />;
    }

    return <Navigate to="/login" replace state={{ from: location.pathname, requiredRole: role }} />;
  }

  return children;
};

export default ProtectedRoute;
