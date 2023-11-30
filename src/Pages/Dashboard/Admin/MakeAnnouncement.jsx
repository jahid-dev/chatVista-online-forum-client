import { useState, useContext } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [authorImage] = useState(user?.photoURL || "");
  const [authorName] = useState(user?.displayName || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const announcementData = {
        authorImage,
        authorName,
        title,
        description,
      };

      const response = await axiosSecure.post("/announcements", announcementData);

      console.log("Announcement submitted successfully:", response.data);

      Swal.fire({
        icon: 'success',
        title: 'Announcement Submitted!',
        text: 'Your announcement has been submitted successfully.',
      });

      // You may want to redirect or update the UI in your application based on the response
    } catch (error) {
      console.error("Error submitting announcement:", error);

      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: 'There was an error submitting your announcement. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Announcement Form
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Share your announcement by filling out the form below.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Author Image
            </Typography>
            <Input
              size="lg"
              placeholder="URL or upload"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={authorImage}
              readOnly
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Author Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={authorName}
              readOnly
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Title
            </Typography>
            <Input
              size="lg"
              placeholder="Announcement Title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              size="lg"
              placeholder="Announcement Description"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Submit Announcement
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default MakeAnnouncement;
