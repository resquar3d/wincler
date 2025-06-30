// mockData.js should export data like: const data = [ { firstName, lastName, age, minAge, maxAge, gender, genderInterest, location }, ... ]
import { data as mockData } from './mockData.js';

// Form submit handler
function handleMatchSearch(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const minAge = parseInt(document.getElementById('minAge').value);
  const maxAge = parseInt(document.getElementById('maxAge').value);
  const gender = document.getElementById('gender').value;
  const genderInterest = document.getElementById('genderInterest').value;
  const location = document.getElementById('location').value.toLowerCase();

  // Validation
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert('Name fields must only contain letters and cannot be empty.');
    return;
  }
  if (isNaN(age) || isNaN(minAge) || isNaN(maxAge) || age < 18 || minAge < 18 || maxAge < 18 || maxAge < minAge) {
    alert('Age values must be 18+ and valid, with maxAge > minAge.');
    return;
  }
  if (!['M', 'F', 'X'].includes(gender) || !['M', 'F', 'X'].includes(genderInterest)) {
    alert('Gender and Gender Interest must be M, F, or X.');
    return;
  }
  if (!['rural', 'city', 'bay', 'seaside', 'countryside'].includes(location)) {
    alert('Location must be "rural", "countryside", "seaside", "bay" or "city".');
    return;
  }

  const matches = mockData.filter(person => {
    return (
      person.age >= minAge && person.age <= maxAge &&
      age >= person.minAge && age <= person.maxAge &&
      person.gender === genderInterest &&
      person.genderInterest === gender &&
      person.location.toLowerCase() === location
    );
  });

  displayMatches(matches);
}

function displayMatches(matches) {
  const results = document.getElementById('matchResults');
  results.innerHTML = '';
  if (matches.length === 0) {
    results.innerHTML = '<p>No matches found.</p>';
  } else {
    results.innerHTML = `<p>Found ${matches.length} match(es):</p>`;
    matches.forEach(match => {
      const div = document.createElement('div');
      div.className = 'match';
      div.innerText = `${match.firstName} ${match.lastName}, ${match.age} (${match.location})`;
      results.appendChild(div);
    });
  }
}

document.getElementById('matchForm').addEventListener('submit', handleMatchSearch);
