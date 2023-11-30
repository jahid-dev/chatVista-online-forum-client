import  { useState, useContext } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [authorImage] = useState(user?.photoURL || ""); // Set by default and make it read-only
  const [authorName] = useState(user?.displayName || ""); // Set by default and make it read-only
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // You may want to add additional validation here before making the request

      const announcementData = {
        authorImage,
        authorName,
        title,
        description,
      };

      // Send a POST request to your server endpoint
      const response = await axiosSecure.post("/announcements", announcementData);

      // Handle the response as needed
      console.log("Announcement submitted successfully:", response.data);

      
      // You may want to redirect or update the UI in your application based on the response
    } catch (error) {
      console.error("Error submitting announcement:", error);

      // Handle errors and update the UI accordingly
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
