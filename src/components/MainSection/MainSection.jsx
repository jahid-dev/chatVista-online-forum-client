
import Announcement from "./Announcement/Announcement";
import MapPost from "./Post/MapPost";
import TagSection from "./TagSection";


const MainSection = () => {
    return (
        <div>
            <TagSection></TagSection>

            <Announcement></Announcement>

           <MapPost></MapPost>
           
        </div>
    );
};

export default MainSection;