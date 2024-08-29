import React from 'react';
import EntityManagementPage from './EntityManagementPage';
import StudentsPage from './students/StudentsPage';

function StudentsPage() {
  return <EntityManagementPage entityName="Student" roleFilter="student" />;
}

export default StudentsPage;
