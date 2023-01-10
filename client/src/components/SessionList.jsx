import React, {useEffect, useState} from 'react';

function SessionList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch('/api/sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, []);
  return (
      <div className='home'>
        <div className='container'>
          <table>
            <thead>
            <tr>
              <th id={'suid'}>Suid</th>
              <th id={'count'}>Count</th>
            </tr>
            </thead>
            <tbody>
            {sessions.map(session => (
                <tr key={session.suid}>
                  <td><a href={`${window.location.origin}/session/${session.suid}`}>{session.suid}</a></td>
                  <td>{session.cuids.length}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default SessionList;
