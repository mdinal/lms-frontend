"use client";

import { useState } from 'react';
import styles from './live-classes.module.css';

export default function LiveClasses() {
  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState<any>(null);
  const [error, setError] = useState('');

  const scheduleMeeting = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Point to our new Spring Boot backend endpoint
      // Using relative path if proxy is configured, or absolute URL
      const response = await fetch('https://api.cambridgesuccesscentre.com/api/zoom/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: 'Live Cambridge Success Centre Class',
          duration: 60
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const data = await response.json();
      setMeeting(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Live Classes</h1>
        <p>Schedule and join live Zoom classes directly from the platform.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2>Instructor Dashboard</h2>
          <p>Click below to instantly generate a secure, authenticated Zoom meeting link for your students.</p>
          
          <button 
            className={styles.button} 
            onClick={scheduleMeeting} 
            disabled={loading}
          >
            {loading ? 'Scheduling...' : 'Schedule Live Class'}
          </button>

          {error && <div className={styles.error}>{error}</div>}

          {meeting && (
            <div className={styles.meetingDetails}>
              <h3>Meeting Created Successfully! 🎉</h3>
              <div className={styles.detailRow}>
                <strong>Topic:</strong> <span>{meeting.topic}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Meeting ID:</strong> <span>{meeting.id}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Passcode:</strong> <span>{meeting.password}</span>
              </div>
              
              <div className={styles.links}>
                <div className={styles.linkGroup}>
                  <strong>Host Link (Instructor):</strong>
                  <a href={meeting.start_url} target="_blank" rel="noopener noreferrer" className={styles.startLink}>
                    Start Meeting
                  </a>
                </div>
                <div className={styles.linkGroup}>
                  <strong>Join Link (Students):</strong>
                  <a href={meeting.join_url} target="_blank" rel="noopener noreferrer" className={styles.joinLink}>
                    Join Meeting
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
