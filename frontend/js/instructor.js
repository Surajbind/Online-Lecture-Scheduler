document.addEventListener('DOMContentLoaded', () => {
  const lectureList = document.getElementById('lecture-list');
  const instructorId = 'LOGGED_IN_INSTRUCTOR_ID'; 

 
  async function fetchLectures() {
    const res = await fetch(`/api/instructor/${instructorId}/lectures`);
    const data = await res.json();
    lectureList.innerHTML = data.lectures.map(lec => `
      <li>${lec.name} on ${new Date(lec.date).toDateString()}</li>
    `).join('');
  }

  fetchLectures();
});
