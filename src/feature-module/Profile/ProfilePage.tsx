import React, { useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import './style.css';

const ProfilePage: React.FC = () => {
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDelay = `${Math.random() * 3}s`;

      starsRef.current.appendChild(star);
    }
  }, []);

  return (
    <div className='page-wrapper'>
    <div className="profile-page">
      <div ref={starsRef} className="stars-container"></div>
      <div className="content-wrapper">
        <div className="profile-card-container">
          <ProfileCard />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
