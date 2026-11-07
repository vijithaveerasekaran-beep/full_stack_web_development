import { useState } from 'react';
import './App.css';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  function addAssignment(event) {
    event.preventDefault();

    const newAssignment = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      status: 'Pending',
    };

    setAssignments((currentAssignments) => [
      ...currentAssignments,
      newAssignment,
    ]);

    setTitle('');
    setSubject('');
    setDueDate('');
  }

  function deleteAssignment(id) {
    setAssignments((currentAssignments) =>
      currentAssignments.filter((item) => item.id !== id)
    );
  }

  function editAssignment(item) {
    const newTitle = prompt('Enter the assignment title:', item.title);
    if (newTitle === null) return;

    const newSubject = prompt('Enter the subject:', item.subject);
    if (newSubject === null) return;

    const newDueDate = prompt(
      'Enter the due date (YYYY-MM-DD):',
      item.dueDate
    );
    if (newDueDate === null) return;

    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === item.id
          ? {
              ...assignment,
              title: newTitle.trim(),
              subject: newSubject.trim(),
              dueDate: newDueDate.trim(),
            }
          : assignment
      )
    );
  }

  function toggleStatus(id) {
    setAssignments((currentAssignments) =>
      currentAssignments.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Pending' ? 'Completed' : 'Pending',
            }
          : item
      )
    );
  }

  const pending = assignments.filter(
    (item) => item.status === 'Pending'
  ).length;

  const completed = assignments.filter(
    (item) => item.status === 'Completed'
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">◆</h2>

        <nav>
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#add-assignment">Add Assignment</a>
          <a href="#my-assignments">My Assignments</a>
        </nav>
      </aside>

      <main className="dashboard" id="dashboard">
        <header className="dashboard-heading">
          <h1>Dashboard</h1>
          <p>Welcome back, Student!</p>
        </header>

        <section className="stats">
          <div className="card">
            <h3>Total Assignments</h3>
            <p>{assignments.length}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>

          <div className="card">
            <h3>Completion</h3>
            <p>
              {assignments.length === 0
                ? 0
                : Math.round((completed / assignments.length) * 100)}
              %
            </p>
          </div>
        </section>

        <section className="assignments panel" id="add-assignment">
          <h2>Add New Assignment</h2>

          <form onSubmit={addAssignment}>
            <input
              type="text"
              placeholder="Assignment title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Subject name"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
            />

            <label htmlFor="dueDate">Due date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />

            <button type="submit">Add Assignment</button>
          </form>
        </section>

        <section className="assignments panel" id="my-assignments">
          <h2>My Assignments</h2>

          {assignments.length === 0 ? (
            <p>No assignments added yet. Use the form above to add one.</p>
          ) : (
            assignments.map((item) => (
              <div className="assignment-item" key={item.id}>
                <h3>{item.title}</h3>
                <p>Subject: {item.subject}</p>
                <p>Due date: {item.dueDate}</p>
                <p>Status: {item.status}</p>

                <div className="assignment-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => editAssignment(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="status-button"
                    onClick={() => toggleStatus(item.id)}
                  >
                    Mark as{' '}
                    {item.status === 'Pending' ? 'Completed' : 'Pending'}
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteAssignment(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;