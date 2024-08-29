import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
  useFetchClassesQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from '../../services/classApi';

function ClassPage() {
  const { data, error, isLoading } = useFetchClassesQuery();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [classesData, setClassesData] = useState([]); // Initialize as an array
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      // Check if data and data.data exist and if data.data is an array
      setClassesData(data.data);
    } else {
      setClassesData([]); // If not, set it to an empty array
      console.error('Fetched data is not an array', data?.data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateClass = async (classData) => {
    try {
      await updateClass(classData).unwrap();
    } catch (err) {
      console.error('Failed to update class:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id).unwrap();
      setClassesData((prevData) =>
        prevData.filter((classItem) => classItem.class_id !== id)
      );
    } catch (err) {
      console.error('Failed to delete class:', err);
    }
  };

  const filteredData = classesData?.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <CircularProgress />;

  return (
    <div className="app-component">
      <h1>Class Management</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Back to Class List' : 'Create New Class'}
      </Button>

      {showForm ? (
        <div>
          <h2>Create Class</h2>
          <form>
            <TextField
              label="Class Name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Teacher Name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Create Class
            </Button>
          </form>
        </div>
      ) : (
        <div>
          {error && (
            <div>
              <h2>Error</h2>
              <div>{error.data?.message || 'An unknown error occurred'}</div>
            </div>
          )}

          <TextField
            label="Search by Class Name"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class ID</TableCell>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((classItem) => (
                  <TableRow key={classItem.class_id}>
                    <TableCell>{classItem.class_id}</TableCell>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>{classItem.description}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleUpdateClass(classItem)}
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(classItem.class_id)}
                        title="Delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>No Classes Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ClassPage;
