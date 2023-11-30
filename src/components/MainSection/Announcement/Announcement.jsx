import React from 'react';
import useAnnounce from '../../../hooks/useAnnounce';
import { FaSync } from 'react-icons/fa'; // Import the refresh icon

const Announcement = () => {
  const { announcements, totalAnnouncements, loadingAncc, refethcAnnc } = useAnnounce();

  const handleRefresh = () => {
    // Manually trigger a refetch of announcements
    refethcAnnc();
  };

  if (loadingAncc) {
    return <p>Loading announcements...</p>; // or any loading indicator
  }

  return (
    <div className="container mx-auto py-8">
        <h1 className='text-center text-4xl'>Announcement</h1>
      <div className="bg-gray-100 shadow-md rounded-md p-6">
        {totalAnnouncements > 0 ? (
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li key={announcement._id} className="border-b pb-4">
                {announcement.authorImage && announcement.authorName && (
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <img
                      src={announcement.authorImage}
                      alt={announcement.authorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-gray-700">{announcement.authorName}</span>
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 text-center">{announcement.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800 text-center">No announcements available.</p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
