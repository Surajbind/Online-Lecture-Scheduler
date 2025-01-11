document.addEventListener('DOMContentLoaded', () => {
  const instructorList = document.getElementById('instructor-list');
  const courseForm = document.getElementById('course-form');
  const lectureForm = document.getElementById('lecture-form');
  const courseSelect = document.getElementById('course-select');
  const instructorSelect = document.getElementById('instructor-select');

  
  async function fetchInstructors() {
    const res = await fetch('/api/instructors');
    const instructors = await res.json();
    instructorList.innerHTML = instructors.map(inst => `<li>${inst.name} (${inst.email})</li>`).join('');
    instructorSelect.innerHTML += instructors.map(inst => `<option value="${inst._id}">${inst.name}</option>`).join('');
  }

  
  async function fetchCourses() {
    const res = await fetch('/api/courses');
    const courses = await res.json();
    courseSelect.innerHTML += courses.map(course => `<option value="${course._id}">${course.name}</option>`).join('');
  }

 
  courseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('course-name').value;
    const level = document.getElementById('course-level').value;
    const description = document.getElementById('course-description').value;
    const image = document.getElementById('course-image').value;

    const res = await fetch('/api/admin/add-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, level, description, image })
    });

    if (res.ok) {
      alert('Course added successfully!');
      fetchCourses();
    }
  });

  
  lectureForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const courseId = courseSelect.value;
    const instructorId = instructorSelect.value;
    const date = document.getElementById('lecture-date').value;

    const res = await fetch('/api/admin/assign-lecture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, instructorId, date })
    });

    if (res.ok) {
      alert('Lecture assigned successfully!');
    } else {
      const error = await res.json();
      alert(error.message);
    }
  });

  fetchInstructors();
  fetchCourses();
});
