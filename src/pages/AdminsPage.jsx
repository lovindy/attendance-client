import React from 'react';
import EntityManagementPage from './EntityManagementPage';

function AdminsPage() {
  return <EntityManagementPage entityName="Admin" roleFilter="admin" />;
}

export default AdminsPage;
