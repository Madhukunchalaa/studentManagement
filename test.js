const emp = [];

const login = () => {
  const punchIn = new Date();
  emp.push({ punchIn });
};

const logout = () => {
  const punchOut = new Date();
  emp[emp.length - 1].punchOut = punchOut;

  // Calculate difference
  const diffMs = emp[emp.length - 1].punchOut - emp[emp.length - 1].punchIn;
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  console.log(`Total worked: ${hours}h ${minutes}m ${seconds}s`);
};

login(); // simulate login
setTimeout(() => {
  logout(); // simulate logout after 3 seconds
  console.log(emp);
}, 3000);
